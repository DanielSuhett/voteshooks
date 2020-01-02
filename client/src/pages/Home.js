import React from 'react'
import Footer from '../components/Footer'
import "../css/Home.css";
import NavHeader from '../components/NavHeader';

export default function Home() {
  return (
    <>
      <NavHeader />
      <div className="containerHome">
        <div className="taskHomeImg">
          <img src="img/clipboard.png" />
        </div>
        <ul className="subtitleHome">
          <li>Crie votações</li>
          <li>Gerencie suas votações criadas</li>
          <li>Obtenha o número de votos sobre cada opção</li>
        </ul>
      </div>
      <Footer />
    </>
  )
}
