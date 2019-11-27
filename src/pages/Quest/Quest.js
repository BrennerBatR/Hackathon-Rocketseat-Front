import React, { Component } from "react";
import { Container } from "@material-ui/core";
import { Spinner2 } from "styled-icons/evil/Spinner2";

import Menu from "../../components/menu";

import api from "../../services/api";

import "./index.css";

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
    answerColor: "black",
    loading: false,
    moduleID: ""
  };

  async componentDidMount() {
    this.loadQuest();
  }

  loadQuest = async () => {
    const id = this.props.location.pathname;
    const aux = id.split("/");
    const response = await api.get(`/quests/module/${aux[2]}`);
    const items = response.data;
    this.setState({ quests: items });
  };

  func = async e => {
    this.setState({ loading: true });

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
            if (quests[i + 1] !== undefined) this.setState({ i: i + 1 });
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
      document.getElementById("answer").innerHTML = "VALOR INVALIDO";
    }

    this.setState({ loading: false });
  };

  handleChange(event) {
    this.setState({ exp: event.target.value });
  }

  render() {
    var { quests, i, semQuest, answerColor, displayExample } = this.state;
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
            <div className="container-quest">
              <span className="title-quest">Exemplo 1:</span>
              <span className="text-quest">
                Qual a área de uma circunferência de raio 2 ?
              </span>
            </div>

            <form>
              <textarea
                disabled
                type="text"
                placeholder="Expressao"
                style={{ resize: "none" }}
                value={`const raio = 2; \nconst pi = 3.14;\nconst area = 2*pi*Math.pow(raio,2)\narea `}
              />
            </form>

            <div className="container-answers">
              <span>resposta</span>
              <small>25.12</small>
            </div>

            <p className="tutorial">
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
            style={{
              padding: 5,
              height: 35,
              textAlign: "center",
              textTransform: "uppercase",
              background: displayExample && "#adadad"
            }}
            onClick={() =>
              displayExample && displayExample !== "none"
                ? this.setState({ displayExample: "none" })
                : this.setState({ displayExample: "grid" })
            }
          >
            {!displayExample || displayExample === "none"
              ? "Exibir exemplo"
              : "Ocultar exemplo"}
          </button>
        </Container>

        <Container className="quest-container">
          <div style={{ display: semQuest ? "none" : "block" }}>
            <p></p>

            <div className="container-quest">
              <span className="title-quest">
                {quests.length > 0 && `Questão ${i + 1}: `}
              </span>
              <span className="text-quest">
                {quests.length > 0 && quests[i].question}
              </span>
            </div>

            <form onSubmit={this.func}>
              <textarea
                style={{ resize: "none" }}
                type="text"
                placeholder="Escreva o código em javascript:"
                value={this.state.exp}
                onChange={this.handleChange.bind(this)}
              ></textarea>

              <button type="submit">
                {this.state.loading ? (
                  <Spinner2 style={{ color: "#FFF", width: 45 }} />
                ) : (
                  "Enviar"
                )}
              </button>
            </form>
            <div className="box-resp">
              <p
                className="answers"
                id="answer"
                style={{ color: answerColor }}
              />
            </div>
          </div>

          <div style={{ display: !semQuest ? "none" : "block" }}>
            Nenhuma pergunta para essa matéria disponível.
          </div>
        </Container>
      </div>
    );
  }
}
