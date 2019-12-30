import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import NavHeader from './NavHeader.js';

export default function FieldsFormInput(props) {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [passwordConfirm, setPasswordConfirm] = useState('');
   const history = useHistory();

    return (
      <div>
        <NavHeader history={history} />
        <div className="containerLogin">
          <form className="generalForm" onSubmit={(e) => { 
            props.postSingup 
            ? props.postSingup(e, username, password, passwordConfirm)
            : props.postLogin(e, username, password)
           }}>
            <h1 className="titleForm">{ props.postSingup ? 'Sing Up' : 'Login' }</h1>
            <div className="inputForm">
              <input className="inputField" type="text" name="username"
                onChange={(e) =>  setUsername(e.target.value) } placeholder=" Username" />
            </div>

            <div className="inputForm">
              <input className="inputField" type="password" name="password"
                onChange={(e) =>  setPassword(e.target.value) }  placeholder=" Password" />
            </div>

            {props.postSingup
              ? <div className="inputForm"><input className="inputField" type="password" name="password"
                onChange={(e) =>  setPasswordConfirm(e.target.value) } placeholder="Confirm password" /></div>
              : null
            }

            <div className="inputForm buttonForm">
              <input className="buttonField" type="submit" value="Enviar" />
            </div>
          </form>
        </div>
      </div>
    )
}


