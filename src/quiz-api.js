export function getQuiz() {
    return fetch(`/react-quiz.json`)
        .then(res => res.json());
}

export function getResults(questions, answers) {
    const results = questions.reduce((results, question, index) => {
        const answer = answers[index];

        if (question.answer === answer) {
            results.correct += 1;
        } else {
            results.incorrect += 1;
        }

        return results;
    }, { correct: 0, incorrect: 0, total: questions.length });

    return Promise.resolve(results);
}