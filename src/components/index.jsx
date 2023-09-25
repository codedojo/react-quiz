import React from 'react';

import Home from './Home';
import Quiz from './Quiz';
import Results from './Results';

export default function App({ quizId, getQuiz, getResults }) {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const quiz = selector(state);

    React.useEffect(() => {
        dispatch({ type: 'GET_QUIZ' });

        getQuiz()
            .then(quiz => dispatch({ type: 'SET_QUIZ', quiz }));
    }, [getQuiz]);

    const handleStart = () =>
        dispatch({ type: 'START_QUIZ' });

    const handleAnswer = answer =>
        dispatch({ type: 'SET_ANSWER', answer });

    const handleEnd = () => {
        dispatch({ type: 'GET_RESULTS' });

        getResults(quizId, state.answers)
            .then(results => dispatch({ type: 'SET_RESULTS', results }));
    };

    if (state.loading) return 'Загрузка...';

    if (!state.started) return (
        <Home
            quiz={quiz}
            onStart={handleStart}
        />
    );

    if (state.ended && state.results) return (
        <Results
            quiz={quiz}
            results={state.results}
        />
    );

    if (state.started && quiz) return (
        <Quiz
            quiz={quiz}
            onAnswer={handleAnswer}
            onEnd={handleEnd}
        />
    );
}

const initialState = {
    loading: true,
    started: false,
    ended: false,
    quiz: null,
    currentQuestionIndex: 0,
    answers: [],
    results: null
};

function selector({ quiz, currentQuestionIndex }) {
    if (!quiz) return null;

    const numberOfQuestions = quiz.questions.length;

    return {
        ...quiz,
        numberOfQuestions,
        currentQuestionIndex,
        progress: currentQuestionIndex / numberOfQuestions * 100,
        currentQuestion: quiz.questions[currentQuestionIndex],
        hasNextQuestion: currentQuestionIndex < numberOfQuestions
    };
}

function reducer(state, action) {
    switch (action.type) {
        case 'GET_QUIZ':
            return {
                ...state,
                loading: true
            };

        case 'SET_QUIZ':
            return {
                ...state,
                quiz: action.quiz,
                loading: false
            };

        case 'START_QUIZ':
            return {
                ...state,
                started: true
            };

        case 'SET_ANSWER':
            return {
                ...state,
                answers: [...state.answers, action.answer],
                currentQuestionIndex: state.currentQuestionIndex + 1
            };

        case 'END_QUIZ':
            return {
                ...state,
                ended: true
            };

        case 'GET_RESULTS':
            return {
                ...state,
                loading: true
            };

        case 'SET_RESULTS':
            return {
                ...state,
                results: action.results,
                loading: false
            };

        default:
            return state;
    }
}