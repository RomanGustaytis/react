import React from 'react'
import classes from './FinishedQuiz.css'

const FinishedQuiz = props => {
    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                { props.quiz.map((quizItem, index) => {
                    const cls = [
                        'fa',
                        props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
                        classes[props.results[quizItem.id]]
                    ]
                    return (
                        <li
                            key={index}
                        >
                            <strong>{index + 1}</strong>.&nbsp;
                            {quizItem.question}
                            <i className={cls.join(' ')} />
                        </li>
                    )
                }) }
                {/*<li>*/}
                {/*    <strong>1. </strong>*/}
                {/*    How are you*/}
                {/*    <i className={'fa fa-times ' + classes.success} />*/}
                {/*</li>*/}
                {/*<li>*/}
                {/*    <strong>2. </strong>*/}
                {/*    How are you*/}
                {/*    <i className={'fa fa-check ' + classes.error} />*/}
                {/*</li>*/}
            </ul>
            <p>Правильно 4 из 10</p>
            <div>
                <button>Повторить</button>
            </div>
        </div>
    )
}

export default FinishedQuiz