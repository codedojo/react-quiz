import * as actions from './actions';

export default function reducer(state, action) {
    switch (action.type) {
        case actions.GET_QUESTIONS:
            return {
                ...state,
                questions: action.questions,
                loading: false
            };

        case actions.COMMIT_ANSWER:
            return {
                ...state,
                answers: [...state.answers, action.answer],
                currentQuestionIndex: state.currentQuestionIndex + 1
            };

        case actions.END_QUIZ:
            return {
                ...state,
                loading: true
            };

        case actions.GET_RESULTS:
            return {
                ...state,
                results: action.results,
                loading: false
            };

        default:
            return state;
    }
}