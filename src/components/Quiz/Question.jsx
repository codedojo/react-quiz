import React from 'react';

import markdown from '../../markdown';

export default function Question({ question, answer, onAnswer }) {
    return (
        <section>
            <div dangerouslySetInnerHTML={{__html: markdown.render(question.text)}} />
                        
            <ul>
                {question.options.map((option, index) =>
                    <li key={index}>
                        <input
                            id={`answer-${index}`}
                            type="radio"
                            name="answer"
                            value={answer}
                            checked={answer === index}
                            onChange={() => onAnswer(index)}
                        />

                        <label
                            htmlFor={`answer-${index}`}
                            dangerouslySetInnerHTML={{__html: markdown.render(option)}}
                        />
                    </li>    
                )}
            </ul>
        </section>
    );
}