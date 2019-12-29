import React, { useState } from 'react';
import '../css/App.css';
import CreateItem from '../components/CreateItem';
import Footer from "../components/Footer";
import Title from '../components/Title';
import { useHistory } from 'react-router-dom';

export default function () {

  const [listOption, setlistOption] = useState([
    { title: 'Candidato 1', voted: false, countVotes: 0 },
    { title: 'Candidato 2', voted: false, countVotes: 0 },
    { title: 'Candidato 3', voted: false, countVotes: 0 }
  ]);

  const handleVote = (index) => {
    const newlistOption = listOption.map((vote, vindex) => {
      return vindex === index
        ? { ...vote, voted: !vote.voted, countVotes: vote.countVotes++ }
        : vote
    })
    setlistOption(newlistOption)
    
    history.push('/result', newlistOption);
  }

  const createOption = (value, e) => {
    e.preventDefault();
    if (!value)
      alert("Não é possível adicionar um opção vazia!")
    else
      setlistOption(
        listOption.concat({ title: value, voted: false, countVotes: 0 })
      )
  }

  const removeOption = (index) => {
    setlistOption(
      listOption.filter((option, vindex) => { return index !== vindex })
    )
  }
  
  const history = useHistory();

  return (
    <>
      <Title />
      <div className="container">
        <ul>
          <p className="subtitle">choose one</p>
          {listOption.map((vote, index) =>
            <div key={index} className="subcontent">
              <button className="itemVote" onClick={() => { handleVote(index); }} key={index}>
                {vote.title}
              </button>
              <span onClick={() => removeOption(index)} className="voted">
                <img alt="" src="img/delete.png"></img>
              </span>
            </div>
          )}
          <CreateItem submitVote={createOption} />
        </ul>
      </div>
      <Footer></Footer>
    </>
  );
}

