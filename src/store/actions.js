import Axios from "axios";

export const GET_QUESTIONS = 'GET_QUESTIONS';

export function getQuestions() {
    return Axios.get('/api/quiz')
        .then(response => response.data)
        .then(data => ({
            type: GET_QUESTIONS,
            questions: data.quiz
        }));
}

export const COMMIT_ANSWER = 'COMMIT_ANSWER';

export function commitAnswer(answer) {
    return {
        type: COMMIT_ANSWER,
        answer
    };
}

export const END_QUIZ = 'END_QUIZ';

export function endQuiz() {
    return {
        type: END_QUIZ
    };
}

export const GET_RESULTS = 'GET_RESULTS';

export function getResults(answers) {
    return Axios.post('/api/quiz', { answers })
        .then(response => response.data)
        .then(data => ({
            type: GET_RESULTS,
            results: data.results
        }));
}