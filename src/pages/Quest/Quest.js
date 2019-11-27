import React, { Component } from "react";
import "./Quest.css";
import api from "../../services/api";

import Menu from "../../components/menu";
import { Container } from "@material-ui/core";

export default class Quest extends Component {
  state = {
    exp: "",
    displayExample: "",
    quests: "",
    load: "",
    i: 0,
    user: "5ddd7a0ca0920b0017c58597",
    questId: "",
    semQuest: false,
    answerColor: "black"
  };

  async componentDidMount() {
    this.loadQuest();
  }
  loadQuest = async () => {
    const response = await api.get("/quests/all");
    const items = response.data;
    this.setState({ quests: items });
  };
  func = async e => {
    e.preventDefault();
    var resp = undefined;
    try {
      const { quests, i } = this.state;
      const evalValue = eval(this.state.exp);
      const answer = `Resposta: ${evalValue} `;
      const correct = evalValue == quests[i].answer ? true : false;

      const answerData = {
        user: this.state.user,
        quest: quests[i]._id,
        correct
      };
      const response = await api.post("/userQuests", answerData);
      if (correct) {
        this.setState({ answerColor: "green" }, () => {
          document.getElementById("answer").innerHTML = answer;
          setTimeout(() => {
            if (quests[i + 1] != undefined) this.setState({ i: i + 1 });
            else {
              this.setState({ semQuest: true });
            }
          }, 2000);
        });
      } else {
        this.setState({ answerColor: "red" }, () => {
          document.getElementById("answer").innerHTML = answer;
        });
      }
    } catch (e) {
      resp = e;
      document.getElementById("answer").innerHTML = resp;
    }
    //  document.getElementById("answer").innerHTML = resp;
  };

  handleChange(event) {
    this.setState({ exp: event.target.value });
  }
  render() {
    var { quests, i, semQuest, answerColor } = this.state;
    return (
      <div>
        <Menu />
        <Container
          style={{
            display: this.state.displayExample
              ? this.state.displayExample
              : "none"
          }}
          id="example"
          className="example-container"
        >
          <div>
            <h3>
              <b>Exemplo 1:</b>Qual a área de uma circunferência de raio 2 ?
            </h3>
            <form>
              <textarea
                disabled
                style={{ resize: "none" }}
                type="text"
                placeholder="Expressao"
                value={`const raio = 2; \nconst pi = 3.14;\nconst area = 2*pi*Math.pow(raio,2)\narea `}
              ></textarea>
            </form>
            <p className="answers" id="ex1">
              Resposta: 25.12
            </p>
            <p id="tutorial1">
              Nesse exemplo, declaramos 3 variáveis: raio, pi , e area. Onde o
              raio recebeu o valor do enunciado, pi consideramos um valor
              aproximado de 3.14 e a área é o resultado esperado na pergunta.
              Note que para imprimir o resultado final, escrevemos a variável
              isolada na última linha da entrada.
            </p>
          </div>
        </Container>
        <Container className="example-container">
          <button
            id="sendQuest"
            style={{ textAlign: "center" }}
            onClick={() =>
              this.state.displayExample && this.state.displayExample !== "none"
                ? this.setState({ displayExample: "none" })
                : this.setState({ displayExample: "grid" })
            }
          >
            {!this.state.displayExample || this.state.displayExample === "none"
              ? "Exibir exemplo"
              : "Ocultar exemplo"}
          </button>
        </Container>

        <Container className="quest-container">
          <div style={{ display: semQuest ? "none" : "block" }}>
            <p></p>
            <h3>
              {quests.length > 0
                ? `Questão ${i + 1}: ` + quests[i].question
                : ""}
            </h3>
            <form onSubmit={this.func}>
              <textarea
                style={{ resize: "none" }}
                type="text"
                placeholder="Escreva o código em javascript:"
                value={this.state.exp}
                onChange={this.handleChange.bind(this)}
              ></textarea>
              <button type="submit">Enviar</button>
            </form>
            <p
              className="answers"
              id="answer"
              style={{ color: answerColor }}
            ></p>
          </div>
          <div style={{ display: !semQuest ? "none" : "block" }}>
            Nenhuma pergunta para essa matéria disponível.
          </div>
        </Container>
      </div>
    );
  }
}
