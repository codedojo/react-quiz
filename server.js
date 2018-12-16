const express = require('express');

const quiz = require('./quiz.json');

const server = express();

server.use(express.json());

server.get('/api/quiz', (req, res) => {
    res.json({ ok: true, quiz });
});

server.post('/api/quiz', (req, res) => {
    const answers = req.body.answers;

    const results = quiz.reduce((results, question, index) => {
        const answer = answers[index];

        if (question.answer === answer) {
            results.correct += 1;
        } else {
            results.incorrect += 1;
        }

        return results;
    }, { correct: 0, incorrect: 0, total: quiz.length });

    res.json({ ok: true, results });
});

server.listen(3000, () => console.log('Server is listening on port 3000'));