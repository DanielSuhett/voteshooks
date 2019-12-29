import React, { useState } from 'react'

export default function CreateItem(props) {
  
  const [inputValue, setInputValue] = useState('');
  
  return (
    <form className="createItem" onSubmit={(e) => { props.submitVote(inputValue, e); setInputValue(''); } }>
      <input className="inputCreate" onChange={(e) => { setInputValue(e.target.value) }} value={inputValue} placeholder="Add new option"></input>
      <button type="submit" className="buttonCreate">
        <img alt="Adicionar um novo item na votação" src="img/plus.png"></img>
      </button>
    </form>
  )
}



