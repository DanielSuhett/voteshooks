import React from 'react'
import '../css/navHeader.css'
import { withRouter } from 'react-router-dom';
import { logout, isAuth } from '../services/auth';

function navHeader(props) {

  function nextPath(path) {
      props.history.push(path);
  }

  return (
    <div className="navbar">
      <span className="navTitle"><h1 className="TitlenavText">Votehooks</h1></span>
      <div className="buttonBlock">


        { isAuth()
          ? <span>
              <button className="buttonHome" onClick={() => nextPath('/polls')}>List Polls</button>
              <button className="buttonHome" onClick={() => nextPath('/create')}>Make Poll</button>
              <button className="buttonLogin" onClick={() => { logout(); return nextPath('/singin') }}>Logout</button>
            </span>
          : <span><button className="buttonHome" onClick={() => nextPath('/singup')}>Sing Up</button>
            <button className="buttonLogin" onClick={() => nextPath('/singin')}>Login</button></span>
        }
      </div>
    </div>
  )
}

export default withRouter(navHeader);