import React, { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'

import Question from './Question'
import './Quiz.css'

import lowerBlob from '../assets/lowerBlob.png'
import upperBlob from '../assets/upperBlob.png'

function Quiz() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [score, setScore] = useState(null)
  const [finalGame, setFinalGame] = useState(0)
  const [resetQuiz, setResetQuiz] = useState(0)

  useEffect(() => {
    const apiLink = "https://opentdb.com/api.php?amount=5&category=18"

    fetch(apiLink)
      .then(res => res.json())
      .then(data => {
        setData(() => {
          return data.results.map(question => {
            const incorrect = question.incorrect_answers.map(answer => {
              return {
                value: answer,
                id: nanoid(),
                isHeld: false,
                isCorrect: false,
                green: false,
                red: false
              }
            })

            const correct = {
              value: question.correct_answer,
              id: nanoid(),
              isHeld: false,
              isCorrect: true,
              green: false,
              red: false
            }

            let allAnswers = [...incorrect]
            const randomNum = Math.ceil(Math.random() * 3);
            allAnswers.splice(randomNum, 0, correct)

            return {...question, allAnswers: allAnswers, id: nanoid()}
          })
        })
      })
      .catch(error => console.log(error))
      .finally(() => setIsLoading(false));

  }, [resetQuiz])

  function checkAnswers() {
    const newArray = data.map(question => {
      const heldAnswer = question.allAnswers.filter(answer => answer.isHeld === true);
      if(heldAnswer.length > 0)
        return (heldAnswer[0].value === question.correct_answer ? 1 : 0);
      else
        return 0;
    })

    let current_score = 0;
    for(let i = 0; i < newArray.length; i++)
      current_score += (newArray[i] === 1);
    setScore(current_score);
    setFinalGame(1);
  
    data.forEach((question, index) => {
      const heldAnswer = question.allAnswers.filter(answer => answer.isHeld === true);
      const indexOfHeld = question.allAnswers.findIndex(element => element.isHeld === true);
      if(heldAnswer === question.correct_answer)
        data[index].allAnswers[indexOfHeld].green = true;
      else {
        data[index].allAnswers[indexOfHeld].red = true

        const indexOfCorrect = question.allAnswers.findIndex(element => element.isCorrect === true)
        data[index].allAnswers[indexOfCorrect].green = true;
      }
    })
  }

  const questionArray = data.map((question, index) => {
    return <Question key={nanoid()} finalGame={finalGame} data={data} setData={setData} isLoading={isLoading} index={index} />
  })

  function reset() {
    setResetQuiz(prev => prev + 1);
    setFinalGame(0)
    setIsLoading(true)
    setScore(null)
  }

  return (
    <div className="quiz">
      {
        isLoading ?
          <div className="quiz__loading">
            <h1> Wait a moment... </h1>
          </div>
        :
          <div className="quiz__header">
            { questionArray }
            <div className="quiz__footer">
              {finalGame ? <p className='quiz__score'> You scored {score}/5 correct answers </p> : ""}
              <button className="quiz__checkBtn" onClick={finalGame ? reset : checkAnswers}> 
                {finalGame ? "Try again" : "Check Answers"}
              </button>
            </div>
          </div>
      } 

      <img src={lowerBlob} className="lowerBlob" alt="upperBlob" />
      <img src={upperBlob} className="upperBlob" alt="upperBlob" />
    </div>
  )
}

export default Quiz