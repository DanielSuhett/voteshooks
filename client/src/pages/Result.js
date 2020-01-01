import React, { useState, useEffect } from 'react';
import "../css/App.css";
import Footer from "../components/Footer";
import Title from '../components/Title';
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
        const response = await API.get(`/vote/${props.match.params.id}`);
        setlistOption(response.data.options)
        setQuestion({ ...question, title: response.data.question }) 
      } catch (error) {
        alert(error)
      }
    })();
  }, [])

  return (
    <>
      <Title question={question} />
      <div className="container">
      <ul>
          {listOption.map((vote, index) =>
            <div key={index} className="subcontent">
              <span className="itemResult" style={{ 
                backgroundColor: index == props.match.params.index ? 'rgb(35, 148, 35)' : 'gray' 
              }} key={index}>
                {vote.title}<span>{<> { vote.count_votes }</>}</span>
              </span>
            </div>
          )}
        </ul>
      </div>
      <Footer></Footer>
    </>
  );
}

