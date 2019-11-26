import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import './Main.css';

import api from '../services/api';

import logo from '../assets/logo.png';
import dislike from '../assets/dislike.svg';
import like from '../assets/like.svg';
import itsamatch from '../assets/itsamatch.png';

export default function Main({ match }) { //dentro do match tenho todos parametros q foram passados para essa rota
    const [users, setUsers] = useState([]);
    const [matchDev, setMatchDev] = useState(null);

    useEffect(() => {
        async function loadUsers() {
            const response = await api.get('/devs', {
                //aqui sao os headers
                headers: {
                    user: match.params.id,
                }
            })

            setUsers(response.data);
        }

        loadUsers();
    }, [match.params.id]) //1 parametro -> qual funcao quero executar e segundo aprametro quando quero executar a funcao (no caso toda vez o id do parametro for alterado eu chamo a funcao novamente)

    useEffect(() => { //esse fica conectado com websocket
        const socket = io('http://localhost:3333', {
            query: { user: match.params.id } //enviando id para o back
        });

        socket.on('match', dev => {
            console.log(dev);
            setMatchDev(dev);
        });

        /*socket.on('world', message=> {
            console.log(message);
        });

        setTimeout(()=> {
            socket.emit("hello" , {
                message:'Hello World!'
            })
        },3000);*/

    }, [match.params.id]);
    async function handleLike(id) { //recebe o id do usuario q vou dar o like
        await api.post(`/devs/${id}/likes`, null, {
            headers: { user: match.params.id },
        }) //post = (url, body , headers)
        setUsers(users.filter(user => user._id !== id)); //agora preciso retirar do map o usuario q dei like ou deslike para ele nao aparecer na tela mais
    }

    async function handleDisLike(id) { //recebe o id do usuario q vou dar o like
        await api.post(`/devs/${id}/dislikes`, null, {
            headers: { user: match.params.id },
        }) //post = (url, body , headers)
        setUsers(users.filter(user => user._id !== id)); //agora preciso retirar do map o usuario q dei like ou deslike para ele nao aparecer na tela mais
    }

    return (
        <div className="main-container">
            <Link to="/">
                <img src={logo} alt="logo" />
            </Link>

            {users.length > 0 ? (
                <ul>
                    {users.map(user => (
                        <li key={user._id}>
                            <img src={user.avatar} alt={user.name} />
                            <footer>
                                <strong>{user.name}</strong>
                                <p>{user.bio}</p>
                            </footer>

                            <div className="buttons">
                                <button type="button" onClick={() => handleDisLike(user._id)}>
                                    <img src={dislike} alt="dislike" />
                                </button>
                                <button type="button" onClick={() => handleLike(user._id)}>

                                    <img src={like} alt="dislike" />
                                </button>

                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                    <div className="empty"> Acabou :( </div>
                )}

            {matchDev && ( /*aqui ficara a div de deu match */
                <div className="match-container">
                    <img src={itsamatch} alt="It's a match" />
                    <img className="avatar" src={matchDev.avatar} alt={matchDev.name} />

                    <strong>{matchDev.name}</strong>
                    <p>{matchDev.bio}</p>
                    <button type="button" onClick={() => setMatchDev(null)}> FECHAR </button>
                </div>
            )}

        </div>
    )
}