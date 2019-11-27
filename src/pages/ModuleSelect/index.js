import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import Menu from "../../components/menu";

import api from "../../services/api";

import logo from "../../assets/logo.png";

import "./index.css";

const useStyles = makeStyles(theme => ({
  button: {
    background: "#0098d7",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  }
}));

export default class ModuleSelect extends Component {
  state = {
    subjects: [],
    modules: [],
    module: {}
  };

  componentDidMount() {
    this.loadSubjects();
  }

  loadSubjects = async () => {
    const response = await api.get(`/subject/all`);
    const items = response.data;

    this.setState({ subjects: items });
  };

  loadModules = e => {
    const id = e.target.value;

    if (id) {
      const { modules } = this.state.subjects.find(
        subject => subject._id === id
      );

      this.setState({ modules });
    } else {
      this.setState({ modules: [] });
    }
  };

  setModule = e => {
    const id = e.target.value;

    if (id) {
      const module = this.state.modules.find(module => module._id === id);

      this.setState({ module });
    } else {
      this.setState({ module: {} });
    }
  };

  render() {
    const { subjects, modules, module } = this.state;

    return (
      <>
        <Menu />
        <div className="login-container">
          <div>
            <img src={logo} alt="Tindev" />

            <h2>Selecione</h2>

            <form>
              <label>
                Disciplina:
                <select onChange={this.loadModules.bind(this)}>
                  <option></option>
                  {subjects.map(subject => (
                    <option key={subject._id} value={subject._id}>
                      {subject.title}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Módulo:
                <select onChange={this.setModule.bind(this)}>
                  <option></option>
                  {modules.map(module => (
                    <option key={module._id} value={module._id}>
                      {module.title}
                    </option>
                  ))}
                </select>
              </label>

              <Button
                variant="contained"
                color="primary"
                component={Link}
                to={`/quest/${module._id}`}
                type="submit"
                disabled={!module._id}
              >
                Próximo
              </Button>
            </form>
          </div>
        </div>
      </>
    );
  }
}
