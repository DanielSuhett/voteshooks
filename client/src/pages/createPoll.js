import React, { useState } from 'react';
import '../css/App.css';
import CreateItem from '../components/CreateItem';
import Footer from "../components/Footer";
import Title from '../components/Title';
import { useHistory } from 'react-router-dom';
import API from "../services/api";
import NavHeader from '../components/NavHeader';

export default function () {

  const [listOption, setlistOption] = useState([]);

  const [question, setEditTitle] = useState({
    title: 'Double tap to edit question',
    editable: false
  });

  const handleEditQuestion = (value) => {
    setEditTitle({ ...question, title: value })
  }

  const toggleEditQuestion = () => {
    setEditTitle({ ...question, editable: !question.editable })
  }

  const postPoll = async () => {
    try {
      if(listOption.length){
        await API.post('/poll/create', { question: question.title, options: listOption })
        setEditTitle({ ...question, title: '' });
        setlistOption([]);
  
        history.push('/polls')
      } else 
        throw new Error('Adicione opções!')

    } catch (error) {
      alert(error)
    } 
  }
  
  const createOption = (value, e) => {
    e.preventDefault();
    if (!value)
      alert("Não é possível adicionar um opção vazia!")
    else
      setlistOption(
        listOption.concat({ title: value, count_votes: 0 })
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
    <NavHeader history={history} />
      <Title handleEditQuestion={handleEditQuestion} toggleEditQuestion={toggleEditQuestion} question={question} />
      <div className="container">
        <ul>
          {listOption.map((vote, index) =>
            <div key={index} className="subcontent">
              <span className="itemVote" key={index}> {vote.title} </span>
              <span onClick={() => removeOption(index)} className="voted">
                <img alt="" src="img/delete.png"></img>
              </span>
            </div>
          )}
          <CreateItem submitVote={createOption} />
          <button className="createPoll" onClick={() => postPoll() }>Create poll</button>

        </ul>
      </div>
      <Footer></Footer>
    </>
  );
}

