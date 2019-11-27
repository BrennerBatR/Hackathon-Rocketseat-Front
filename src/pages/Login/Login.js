import React, {Component} from 'react';
import Menu from '../../components/menu';
import Button from "@material-ui/core/Button";
import {Link, Redirect} from 'react-router-dom';


import api from '../../services/api';

import logo from '../../assets/logo.png';

import './Login.css';

export default class ModuleSelect extends Component {
  state = {
    email: 'brenner.batista.dev@gmail.com',
    password: '123456',
  };

  login = async (e) => {
    e.preventDefault();
    
    const response = await api.post(`/auth/authenticate`, this.state);
    const data = response.data;

    if(data.user._id) {
      localStorage.setItem('id_', data.user._id);
      window.location.href = "/moduleSelect";
    }
  };

  setPassword = (e) => {
    const password = e.target.value;

    this.setState({password});
  };

  setEmail = (e) => {
    const email = e.target.value;

    this.setState({email});
  };

  render() {
    const {email, password} = this.state;

    return (
      <div>
        <Menu/>
        <div>
          <Menu/>
          <div className="login-container">
            <form onSubmit={this.login}>
              <img src={logo} alt="Tindev"></img>
              <label>Email
                <input
                  value={email}
                  onChange={this.setEmail} //pegando o valor digitado
                />
              </label>
              <label>Senha
                <input
                  type='password'
                  value={password}
                  onChange={this.setPassword} //pegando o valor digitado
                />
              </label>
              <Button variant='contained' color='primary' type="submit"
                      disabled={email.length === 0 || password.length === 0}>Login</Button>
            </form>
          </div>
        </div>
      </div>
    )
  };
}