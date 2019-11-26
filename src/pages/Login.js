import React, { useState } from 'react';
import './Login.css';

import api from '../services/api';

import logo from '../assets/logo.png';

import Menu from '../components/menu';

export default function Login({ history }) { //export exporta assim q ele for renderizado
    const [username, setUsername] = useState('');

    async function handleSubmit(e) {
        e.preventDefault(); //o padrao de um submit é redirecionar apra outra pagina, com o preventdefault estou prevenindo o padrao q é esse redirecionamento

        const response = await api.post('/devs', { //aqu é body
            username,
        }); //o inicio da rota foi definida dentro do service api

        const { _id } = response.data.dev;
        history.push(`/dev/${_id}`); //o hisotry é ehrdado do REACT DOM, fazer redirecionamento de paginas é assim
    }

    return (
        <div>
            <Menu />
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="Tindev"></img>
                <input
                    placeholder="Digite seu usuário do Github"
                    value={username}
                    onChange={e => setUsername(e.target.value)} //pegando o valor digitado
                />
                <button type="submit">Enviar</button>
            </form>
        </div>
        </div>
    );
}