import React from 'react'
import { nanoid } from 'nanoid'

import './Question.css'
import '../App.css'

function Question({ data, setData, index, finalGame }) {
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

  const colorArray = allAnswers.map(answer => {
    if(answer.green === true)
      return {
        bgColor: "#94D7A2",
        opacity: 1
      }
    else if(answer.red === true) {
      return {
        bgColor: "#F8BCBC",
        opacity: finalGame ? 0.5 : 1
      }
    }
    else if(answer.isHeld)
      return {
        bgColor: "#D6DBF5",
        opacity: finalGame ? 0.5 : 1
      }
    else 
      return {
        bgColor: "#F5F7FB",
        opacity: finalGame ? 0.5 : 1
      }
  })

  return (
    <div className="question">
      <h1 className="question__title"> {getText(data[index].question)} </h1>
      <div className="question__answer-section">
      {
        allAnswers.map((answer, index) => {
          return (
            <div
              key={nanoid()}
              style={{backgroundColor: `${colorArray[index].bgColor}`, opacity:`${colorArray[index].opacity}`}}
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