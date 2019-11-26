import React, {useState} from 'react';
import './Main.css';
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";

import api from '../../services/api';

import logo from '../../assets/logo.png';

export default function Login({history}) { //export exporta assim q ele for renderizado
    const [username, setUsername] = useState('');

    async function handleSubmit(e) {
        e.preventDefault(); //o padrao de um submit é redirecionar apra outra pagina, com o preventdefault estou prevenindo o padrao q é esse redirecionamento

        const response = await api.post('/devs', { //aqu é body
            username,
        }); //o inicio da rota foi definida dentro do service api

        const {_id} = response.data.dev;
        history.push(`/dev/${_id}`); //o hisotry é ehrdado do REACT DOM, fazer redirecionamento de paginas é assim
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="Tindev"></img>
                <h1>HOME PAGE</h1>
                <Button variant="contained" color="primary" component={Link} to='/login'>Login</Button>
            </form>
        </div>
    );
}