import React from 'react';

export default function Results({ results }) {
    return (
        <main id="results">
            <p>Тест завершен</p>

            <p>Вы ответили верно на {results.correct} вопросов из {results.total}</p>
        </main>
    );
};