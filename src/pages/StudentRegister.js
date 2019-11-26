import React, {useState} from 'react';
import './StudentRegister.css';

// import api from '../services/api';

import logo from '../assets/logo.png';

export default function Login({history}) {
    const [nome, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        // const response = await api.post('/devs', {
        //     username,
        // });

        // const { _id } = response.data.dev;
        // history.push(`/dev/${_id}`);
    }

    return (
        <div className="login-container">
            <div>
                <img src={logo} alt="Tindev"></img>
                <h2>Cadastro de Aluno</h2>
                <form onSubmit={handleSubmit}>
                    <label>Nome
                        <input
                            // placeholder="Digite o nome do aluno"
                            value={nome}
                            onChange={e => setUsername(e.target.value)}
                        />
                    </label>
                    <label>Email
                        <input
                            // placeholder="Digite o email do aluno"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </label>
                    <label>Senha
                        <input id="email"
                               // placeholder="Digite a senha do aluno"
                               value={senha}
                               onChange={e => setSenha(e.target.value)}
                        /></label>
                    <button type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}