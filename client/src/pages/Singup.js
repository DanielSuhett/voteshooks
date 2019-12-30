import React from 'react';
import '../css/login.css';
import API from '../services/api';
import { setAuth, isAuth } from '../services/auth'
import { Redirect } from 'react-router-dom';
import FieldsFormInput from '../components/FieldsFormInput';

export default function Login(props) {
  const postSingup = async (e, username, password, passwordConfirm) => {
    e.preventDefault();
    try {
      if (!username && !password)
        alert('Insira dados de login e senha!');
      else {
        if (password && !passwordConfirm)
          alert('Confirme sua senha!');
        else {
          try {
            await API.post("/singup", { username, password, passwordConfirm })
            const res = await API.post('/singin', { username, password })

            setAuth(res.data.userToken);

            props.history.push("/home");
          } catch (error) {
            alert(error)
          }

        }
      }
    } catch (error) {
      alert(error);
    }
  }

  return (
    !isAuth()
    ? <FieldsFormInput postSingup={postSingup} />
    : <Redirect to='/polls'></Redirect>
  )
}