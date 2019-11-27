import React, { useState } from "react";
import "./Quest.css";

/* import api from "../../services/api";

import logo from "../../assets/logo.png"; */

import Menu from "../../components/menu";
import { Container } from "@material-ui/core";

export default function Login({ history }) {
  //export exporta assim q ele for renderizado
  const [exp, setExp] = useState("");
  const [displayExample, setdisplayExample] = useState("");
  /*   async function handleSubmit(e) {

    const response = await api.post("/devs", {
      //aqu é body
      username
    }); //o inicio da rota foi definida dentro do service api

    const { _id } = response.data.dev;
    history.push(`/dev/${_id}`); //o hisotry é ehrdado do REACT DOM, fazer redirecionamento de paginas é assim
  } */

  async function func(e) {
    e.preventDefault();
    var resp = undefined;
    try {
      resp = "Resposta: " + eval(exp);
    } catch (e) {
      resp = e;
    }
    document.getElementById("answer").innerHTML = resp;
  }
  return (
    <div>
      <Menu />
      <Container
        style={{ display: displayExample }}
        id="example"
        className="example-container"
      >
        <div>
          <h3>
            <b>Exemplo 1:</b>Qual a área de uma circunferência de raio 2 ?
          </h3>
          <form>
            {/*  <input placeholder="X" onChange={e => setX(e.target.value)}></input>
            <input placeholder="Y" onChange={e => setY(e.target.value)}></input> */}
            <textarea
              style={{ resize: "none" }}
              type="text"
              placeholder="Expressao"
              value={`const raio = 2; \nconst pi = 3.14;\nconst area = 2*pi*Math.pow(raio,2)\narea `}
              onChange={e => setExp(e.target.value)}
            ></textarea>
          </form>
          <p className="answers" id="ex1">
            Resposta: 25.12
          </p>
          <p id="tutorial1">
            Nesse exemplo, declaramos 3 variáveis: raio, pi , e area. Onde o
            raio recebeu o valor do enunciado, pi consideramos um valor
            aproximado de 3.14 e a área é o resultado esperado na pergunta. Note
            que para imprimir o resultado final, escrevemos a variável isolada
            na última linha da entrada. A função
          </p>
        </div>
      </Container>
      <Container className="example-container">
        <button
          id="sendQuest"
          style={{ textAlign: "center" }}
          onClick={() => setdisplayExample("none")}
        >
          Ocultar exemplo
        </button>
      </Container>

      <Container className="quest-container">
        <div>
          <h3>Pergunta 1 da API?</h3>
          <form onSubmit={func}>
            {/*  <input placeholder="X" onChange={e => setX(e.target.value)}></input>
            <input placeholder="Y" onChange={e => setY(e.target.value)}></input> */}
            <textarea
              style={{ resize: "none" }}
              type="text"
              placeholder="Escreva o código em javascript:"
              onChange={e => setExp(e.target.value)}
            ></textarea>
            <button type="submit">Enviar</button>
          </form>
          <p className="answers" id="answer"></p>
        </div>
      </Container>
    </div>
  );
}
