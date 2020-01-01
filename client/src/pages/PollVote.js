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
        const response = await API.get(`/vote/${props.match.params.id}`)
        setlistOption(response.data.options)

        setQuestion({ ...question, title: response.data.question })
      } catch (error) {
        alert(error)
      }
    })()
  }, [])

  const handleVote = async (index) => {
    const updateList = listOption.map((option, ondex) => {
      if (index === ondex)
        option = { ...option, count_votes: option.count_votes + 1 };
      return option
    })

    await API.put(`/vote/${props.match.params.id}`, { question: question.title, options: updateList })

    history.push(`/vote/${props.match.params.id}/result/${index}`)
  }

  const history = useHistory();

  return (
    <>
      <span style={{ marginLeft: 50 }}><Title question={question} /></span>
      <div className="container">
        <ul>
          {listOption.map((vote, index) =>
            <div key={index} style={{ justifyContent: "center" }} className="subcontent">
              <button onClick={() => { handleVote(index) }} className="itemVote" key={index}> {vote.title} </button>
            </div>
          )}
        </ul>

      </div>
      <span style={{ display: "flex", justifyContent: "center" }} onClick={() => {
        navigator.clipboard.writeText(`${process.env.url || 'http://localhost:3000/vote/'}${props.match.params.id}`)
        alert("Link to poll copied!")
      }
      } className="voted">
        <img alt="" src="/img/share.png"></img>
      </span>
      <Footer></Footer>
    </>
  );
}

