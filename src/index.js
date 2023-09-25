import React from 'react';
import ReactDOM from 'react-dom';

import { getQuiz, getResults } from './quiz-api';
import App from './components';

import './index.css';

ReactDOM.render(
    <App
        quizId="react"
        getQuiz={getQuiz}
        getResults={getResults}
    />,
    document.getElementById('root')
);