import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import { Routes } from './services/routes'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
<BrowserRouter><Routes /></BrowserRouter>, 
document.getElementById('root'));