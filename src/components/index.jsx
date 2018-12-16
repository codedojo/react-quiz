import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
    Layout,
    Spinner,
} from '@codedojo/mdc-react';

import * as actions from '../store/actions';
import Quiz from './Quiz';
import QuizResults from './QuizResults';

class App extends React.Component {
    componentDidMount() {
        this.props.actions.getQuestions();
    }

    handleAnswer = answer => {
        this.props.actions.commitAnswer(answer);
    };

    handleComplete = () => {
        this.props.actions.endQuiz();
        this.props.actions.getResults(this.props.answers);
    };

    render() {
        const { loading, question, questionPosition, numberOfQuestions, hasNextQuestion, quizProgress, results, actions } = this.props;

        if (loading) return <Spinner />;

        return (
            <Layout element="main">
                {results ?
                    <QuizResults
                        results={results}
                    />
                    :
                    <Quiz
                        question={question}
                        questionPosition={questionPosition}
                        numberOfQuestions={numberOfQuestions}
                        hasNextQuestion={hasNextQuestion}
                        progress={quizProgress}
                        onAnswer={this.handleAnswer}
                        onComplete={this.handleComplete}
                    />
                }
            </Layout>
        );
    }
}

export default connect(
    state => {
        const numberOfQuestions = state.questions.length;
        const question = state.questions[state.currentQuestionIndex];
        const questionPosition = state.currentQuestionIndex + 1;
        const hasNextQuestion = state.currentQuestionIndex < state.questions.length;
        const quizProgress = state.currentQuestionIndex / numberOfQuestions * 100;

        return {
            answers: state.answers,
            loading: state.loading,
            results: state.results,
            question,
            questionPosition,
            numberOfQuestions,
            hasNextQuestion,
            quizProgress
        };
    },

    dispatch => ({
        actions: bindActionCreators(actions, dispatch)
    })
)(App);