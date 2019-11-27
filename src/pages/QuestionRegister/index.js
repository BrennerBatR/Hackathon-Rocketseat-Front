import React, {Component} from 'react';
import Menu from '../../components/menu';
import Button from "@material-ui/core/Button";
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';

import api from '../../services/api';

import logo from '../../assets/logo.png';

import './index.css';

export default class QuestionRegister extends Component {
  state = {
    question: '',
    answer: '',
    example: false,
    subjects: [],
    modules: [],
    module: {},
  };

  componentDidMount() {
    this.loadSubjects();
  };

  loadSubjects = async () => {
    const response = await api.get(`/subject/all`);
    const items = response.data;

    this.setState({subjects: items});
  };

  loadModules = (e) => {
    const id = e.target.value;

    if (id) {

      const {modules} = this.state.subjects.find((subject) => subject._id === id);

      this.setState({modules});
    } else {
      this.setState({modules: []});
    }
  };

  setModule = (e) => {
    const id = e.target.value;

    if (id) {

      const module = this.state.modules.find((module) => module._id === id);

      this.setState({module});
    } else {
      this.setState({module: {}})
    }
  };

  questionRegister = async (e) => {
    e.preventDefault();

    const {question, answer, module, example} = this.state;

    const json = {
      question,
      answer,
      module: module._id,
      example
    };

    console.log(json);

    const response = await api.post(`/quests`, json);
    const data = response.data;

    if (data._id) {
      window.location.href = "/moduleSelect";
    } else {
      alert('Erro ao cadastrar pergunta.');
    }
  };

  setAnswer = (e) => {
    const answer = e.target.value;

    this.setState({answer});
  };

  setQuestion = (e) => {
    const question = e.target.value;

    this.setState({question});
  };

  setExample = name => event => {
    this.setState({example: event.target.checked});
  };

  render() {
    const {subjects, modules} = this.state;

    return (
      <div>
        <Menu/>
        <div>
          <Menu/>
          <div className="login-container">
            <form onSubmit={this.questionRegister}>
              <img src={logo} alt="Tindev"></img>
              <label>
                Escolha a disciplina
                <select onChange={this.loadModules.bind(this)}>
                  <option></option>
                  {subjects.map(subject => (
                    <option key={subject._id} value={subject._id}>{subject.title}</option>
                  ))}
                </select>
              </label>
              <label>
                Escolha a módulo
                <select onChange={this.setModule.bind(this)}>
                  <option></option>
                  {modules.map(module => (
                    <option key={module._id} value={module._id}>{module.title}</option>
                  ))}
                </select>
              </label>
              <label>Pergunta
                <TextField
                  id="outlined-multiline-static"
                  multiline
                  rows="4"
                  margin="normal"
                  variant="outlined"
                  onChange={this.setQuestion}
                />
              </label>
              <label>Resposta
                <input type='text'
                       onChange={this.setAnswer}/>
              </label>
              <label>
                Exemplo
                <Checkbox
                  checked={this.state.example}
                  onChange={this.setExample('example')}
                  value="example"
                  color="primary"
                  inputProps={{
                    'aria-label': 'secondary checkbox',
                  }}
                />
              </label>
              <Button variant='contained' color='primary' type="submit"
                // disabled={email.length === 0 || password.length === 0}
              >Login</Button>
            </form>
          </div>
        </div>
      </div>
    )
  };
}