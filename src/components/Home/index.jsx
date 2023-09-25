import React from 'react';

export default function Home({ quiz, onStart }) {
    return (
        <main id="home">
            Welcome!
            <button onClick={onStart}>Начать</button>
        </main>
    );
}