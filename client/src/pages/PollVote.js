import React, { useState, useEffect } from 'react';
import "../css/App.css";
import Footer from "../components/Footer";
import Title from '../components/Title';
import { useHistory } from 'react-router-dom';
import API from "../services/api";

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
  }, [question, props.match.params.id])

  const handleVote = async (index) => {
    const updateList = listOption.map((option, ondex) => {
      if(index === ondex)
        option = { ...option, count_votes: option.count_votes + 1 };
      return option
    })

    await API.put(`/poll/${props.match.params.id}`, { question: question.title, options: updateList })

    history.push(`/vote/${props.match.params.id}/result/${index}`)
  }

  const history = useHistory();

  return (
    <>
      <Title question={question} />
      <div className="container">
        <ul>
          {listOption.map((vote, index) =>
            <div key={index}  className="subcontent">
              <button onClick={() => { handleVote(index) }} className="itemVote" key={index}> {vote.title} </button>
            </div>
          )}
        </ul>
      </div>
      <Footer></Footer>
    </>
  );
}

