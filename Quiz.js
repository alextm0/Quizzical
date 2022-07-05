import React, { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'

import Question from './Question'
import './Quiz.css'

import lowerBlob from '../assets/lowerBlob.png'
import upperBlob from '../assets/upperBlob.png'

function Quiz() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const apiLink = "https://opentdb.com/api.php?amount=5"

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
                isCorrect: false
              }
            })

            const correct = {
              value: question.correct_answer,
              id: nanoid(),
              isHeld: false,
              isCorrect: true
            }

            let allAnswers = [...incorrect]
            const randomNum = Math.ceil(Math.random() * 3);
            allAnswers.splice(randomNum, 0, correct)

            // TODO : T/F Answer logic

            return {...question, allAnswers: allAnswers, id: nanoid()}
          })
        })
      })
      .catch(error => console.log(error))
      .finally(() => setIsLoading(false));

  }, [])

  function checkAnswers() {
    console.log(data)
    const newArray = data.map(question => {
      const heldAnswer = question.allAnswers.filter(answer => answer.isHeld === true);
      if(heldAnswer.length > 0)
        return (heldAnswer[0].value === question.correct_answer ? 1 : 0);
      else
        return 0;
    })

    let score = 0;
    for(let i = 0; i < newArray.length; i++)
      score += (newArray[i] === 1);
    console.log(score)
  }

  const questionArray = data.map((question, index) => {
    return <Question key={nanoid()} data={data} setData={setData} isLoading={isLoading} index={index} />
  })

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
            <button className="quiz__checkBtn" onClick={checkAnswers}> Check Answers </button>
          </div>
      } 
      <img src={lowerBlob} className="lowerBlob" alt="upperBlob" />
      <img src={upperBlob} className="upperBlob" alt="upperBlob" />
    </div>
  )
}

export default Quiz