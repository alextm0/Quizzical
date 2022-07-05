import React from 'react'
import { nanoid } from 'nanoid'

import './Question.css'
import '../App.css'

function Question({ data, setData, index }) {
  function getText(html){
    var divContainer= document.createElement("div");
    divContainer.innerHTML = html;
    return divContainer.textContent || divContainer.innerText || "";
  }

  const allAnswers = data[index].allAnswers;

  function holdAnswer(id) {
    const newArray = allAnswers.map(answer => {
      return id === answer.id ? {...answer, isHeld: !answer.isHeld} : answer;
    })
    
    const arr = [...data];
    arr[index].allAnswers = newArray;
    setData(arr);
  }

  return (
    <div className="question">
      <h1 className="question__title"> {getText(data[index].question)} </h1>
      <div className="question__answer-section">
      {
        allAnswers.map(answer => {
          return (
            <div
              key={nanoid()}
              style={answer.isHeld ? { backgroundColor: '#D6DBF5' } : {}}
              className="question__answer-option"
              onClick={() => holdAnswer(answer.id)}
            >
              {getText(answer.value)}
            </div>
          )
        })
      }
      

      </div>
      <hr className='solid' />
    </div>
  )
}

export default Question