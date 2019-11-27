import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { Link } from 'react-router-dom';

import "../homePage/homePage.css";
import logo from "../../assets/logo.png";

const homePage = () => (
  <div id="divHeader">
    <div className="box">
      <img className="logo" src={logo} alt="logo" />
      <h2>
        Saiba como nosso sistema pode ajudar seus alunos a aprenderem
        programação e ainda estudar matérias escolares como Português,
        Matemática entre outras...
      </h2>
      <h2>
        Tenha um diferencial das outras escolas, mostre melhorias de resultados
        e crie pessoal prontas para o futuro…
        <br />
        Se destaquem entre as escolas, mostre resultados aos pais, tenham dados
        de alunos e controle sobre o que eles fazem
      </h2>
      <div className="button">
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={`/login`}
        >
          Conheça a plataforma
        </Button>
      </div>
    </div>
  </div>
);

export default homePage;
