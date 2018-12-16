import React from 'react';

import {
    Card,
    Typography
} from '@codedojo/mdc-react';

export default function QuizResults({ results }) {
    return (
        <Card className="quiz-results">
            <Typography variant="headline4" align="center">Тест завершен</Typography>

            <Typography align="center">Вы ответили верно на {results.correct} вопросов из {results.total}</Typography>
        </Card>
    );
};