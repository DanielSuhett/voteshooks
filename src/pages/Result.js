import React from 'react'

export default function (props) {
  return (
    <div>
      {props.location.state.map((option, index) => { 
      return <div key={index}>{option.title} { option.voted && <>VOTED!</>} </div>
    
    })}
    </div>
  )
}
