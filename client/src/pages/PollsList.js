import React, { useState, useEffect } from 'react';
import Footer from "../components/Footer";
import { useHistory } from 'react-router-dom';
import API from "../services/api";
import NavHeader from '../components/NavHeader';

export default function () {

  const [listPoll, setlistPoll] = useState([]);
  const history = useHistory();

  useEffect( () => {
    const get = async () => {
      try {
        const response = await API.get('/poll')
        setlistPoll(response.data)
      } catch (error) {
        alert(error)
      }
    }

    get()
  }, [])


  const removePoll = async (index) => {
    await API.delete(`poll/${listPoll[index]._id}`)
    setlistPoll(
      listPoll.filter((option, vindex) => { return index !== vindex })
    )
  }

  const linkToPoll = (index) => {
    history.push(`polls/${listPoll[index]._id}`)
  }
  

  return (
    <>
      <NavHeader history={history} />
      <div className="container">
        <ul>
          {listPoll.map((poll, index) =>
            <div key={index} className="subcontent">
              <button className="itemVote" onClick={() => { linkToPoll(index) }} key={index}>
                {poll.question}
              </button>
              <span onClick={() => removePoll(index)} className="voted">
                <img alt="" src="img/delete.png"></img>
              </span>
            </div>
          )}
        </ul>
      </div>
      <Footer></Footer>
    </>
  );
}

