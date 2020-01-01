import React from 'react'

export default function Title(props) {
  return (
    <h1 className="title" onDoubleClick={() => { if(props.toggleEditQuestion) return props.toggleEditQuestion() } }>
      {props.question.editable === true
        ? <>
          <input className="inputTitle" onChange={(e) => props.handleEditQuestion(e.target.value)}
            value={
              props.question.title === 'Double tap to edit question'
                ? ''
                : props.question.title
            } placeholder="Edit title"></input>
          <button onClick={() => props.toggleEditQuestion()} className="buttonTitle">
            <img alt="" src="/img/success.png"></img>
          </button>
        </>
        : props.question.title
      }
    </h1>
  )
}

