import React from 'react';

import Question from './Question';

export default function Quiz({ quiz, onAnswer, onEnd }) {
    const [answer, setAnswer] = React.useState();

    const handleAnswer = answer => setAnswer(answer);

    const handleNextButtonClick = () => {
        onAnswer(answer);
        setAnswer(undefined);
    };

    const handleEndButtonClick = () => {
        onEnd();
        setAnswer(undefined);
    };
    
    return (
        <main id="quiz">
            <header>
                <div>{quiz.title}</div>
                <div>{quiz.hasNextQuestion && `Вопрос ${quiz.currentQuestionIndex + 1} из ${quiz.numberOfQuestions}`}</div>
            </header>

            {quiz.currentQuestion &&
                <Question
                    question={quiz.currentQuestion}
                    answer={answer}
                    onAnswer={handleAnswer}
                />
            }

            <footer>
                {quiz.hasNextQuestion ?
                    <button onClick={handleNextButtonClick}>Далее</button>
                    :
                    <button onClick={handleEndButtonClick}>Завершить</button>
                }
            </footer>
        </main>
    );
}