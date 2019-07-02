import React, {Component} from 'react'
import classes from './Quiz.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'

class Quiz extends Component {
    state = {
        results: {}, //{[id]: success error}
        isFinished: false,
        activeQuestion: 0,
        answerState: null, //{[id]: success error}
        quiz: [
            {
                question: 'Как сделать текст жирным?',
                rightAnswerId: 4,
                id: 1,
                answers: [
                    {text: '<br>жирный</br>', id: 1},
                    {text: '<a>жирный</a>', id: 2},
                    {text: '<p>жирный</p>', id: 3},
                    {text: '<strong>жирный</strong>', id: 4}
                ]
            },
            {
                question: 'Каких тегов в HTML не существует?',
                rightAnswerId: 3,
                id: 2,
                answers: [
                    {text: 'Парных', id: 1},
                    {text: 'Одиночных', id: 2},
                    {text: 'Тройных', id: 3}
                ]
            },
            {
                question: 'Как вставить картинку в HTML?',
                rightAnswerId: 2,
                id: 2,
                answers: [
                    {text: '<img>http://site.com/image.jpg</img>', id: 1},
                    {text: '<img src="http://site.com/image.jpg">', id: 2},
                    {text: '<image>http://site.com/image.jpg</image>', id: 3},
                    {text: '<image source="http://site.com/image.jpg">', id: 4}
                ]
            },
            {
                question: 'С помощью какого тега в HTML создаются ссылки?',
                rightAnswerId: 3,
                id: 2,
                answers: [
                    {text: '<p>', id: 1},
                    {text: '<b>', id: 2},
                    {text: '<a>', id: 3},
                    {text: '<i>', id: 4}
                ]
            },
            {
                question: 'С помощью какого тега создаётся раскрывающийся список в форме?',
                rightAnswerId: 3,
                id: 2,
                answers: [
                    {text: 'multi', id: 1},
                    {text: 'radio', id: 2},
                    {text: 'select', id: 3},
                    {text: 'pad', id: 4}
                ]
            }
        ]
    }

    onAnswerClickHandler = answerId => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === 'success') {
                return
            }
        }

        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results

        if(question.rightAnswerId === answerId) {

            if (!results[question.id]) {
                results[question.id] = 'success'
            }

            this.setState({
                answerState: {[answerId]: 'success'},
                results
            })

            const timeout = window.setTimeout(() => {
                if(this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    })
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }

                window.clearTimeout(timeout)
            }, 1000)
        } else {
            results[question.id] = 'error'
            this.setState({
                answerState: {[answerId]: 'error'},
                results
            })
        }
    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>

                    {
                        this.state.isFinished
                        ? <FinishedQuiz
                                results={this.state.results}
                                quiz={this.state.quiz}
                                onRetry={this.retryHandler}
                            />
                        : <ActiveQuiz
                                answers={this.state.quiz[this.state.activeQuestion].answers}
                                question={this.state.quiz[this.state.activeQuestion].question}
                                onAnswerClick={this.onAnswerClickHandler}
                                quizLength={this.state.quiz.length}
                                answerNumber={this.state.activeQuestion + 1}
                                state={this.state.answerState}
                            />
                    }
                </div>
            </div>
        )
    }
}

export default Quiz