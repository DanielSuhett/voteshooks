
import React from 'react';
import '../css/login.css';
import API from '../services/api';
import { setAuth, isAuth } from '../services/auth'
import { Redirect } from 'react-router-dom';
import FieldsFormInput from '../components/FieldsFormInput';

export default function Login(props) {
  const postLogin = async (e, username, password) => {
    e.preventDefault();
    try {
      if (!username && !password)
        alert('Insira dados de login e senha!');

      const response = await API.post("/singin", { username, password })

      setAuth(response.data.userToken);

      props.history.push("/polls");

    } catch (error) {
      alert(error);
    }
  }

  if (!isAuth())
    return (
      <FieldsFormInput postLogin={postLogin} />
    );
  else
    return (<Redirect to='/polls'></Redirect>)

}