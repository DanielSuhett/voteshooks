import React, { useState, useEffect } from 'react';
import "../css/App.css";
import CreateItem from '../components/CreateItem';
import Footer from "../components/Footer";
import Title from '../components/Title';
import { useHistory } from 'react-router-dom';
import API from "../services/api";
// import NavHeader from '../components/NavHeader';

export default function (props) {

  const [listOption, setlistOption] = useState([]);

  const [question, setQuestion] = useState({
    title: 'Double tap to edit question',
    editable: false
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await API.get(`/poll/${props.match.params.id}`)
        setlistOption(response.data.options)
        setQuestion({ ...question, title: response.data.question }) 
      } catch (error) {
        alert(error)
      }
    })()
  }, [props.match.params.id, question])

  const handleEditQuestion = (value) => {
    setQuestion({ ...question, title: value })
  }

  const toggleEditQuestion = () => {
    setQuestion({ ...question, editable: !question.editable })
  }

  const updatePoll = async () => {
    API.put(`/poll/${props.match.params.id}`, { question: question.title, options: listOption })
    history.push('/polls')
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
      <Title handleEditQuestion={handleEditQuestion} toggleEditQuestion={toggleEditQuestion} question={question} />
      <div className="container">
        <ul>
          {listOption.map((vote, index) =>
            <div key={index} className="subcontent">
              <span className="itemVote" key={index}> {vote.title} </span>
              <span onClick={() => removeOption(index)} className="voted">
                <img alt="" src="/img/delete.png"></img>
              </span>
            </div>
          )}
          <CreateItem submitVote={createOption} />
          <button className="createPoll" onClick={() => updatePoll() }>Update</button>

        </ul>
      </div>
      <Footer></Footer>
    </>
  );
}

