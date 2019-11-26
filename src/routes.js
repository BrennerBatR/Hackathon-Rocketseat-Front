import React from 'react';
import { BrowserRouter , Route} from 'react-router-dom';

import Login from './pages/Login';
import Main from './pages/Main';
import CadastroAluno from './pages/StudentRegister';
import CadastroPergunta from './pages/QuestionRegister';
import Quest from './pages/Quest/Quest';

//EXACT = sem o exact ele considera q todas rotas começadas com / serao a login
export default function Routes() {
    return(
        <BrowserRouter>
        <Route path="/" exact component = {Login} /> 
        <Route path="/dev/:id" component = {Main} />
        <Route path="/alunos" component = {CadastroAluno} />
        <Route path="/perguntas" component = {CadastroPergunta} />
        <Route path="/quest" component = {Quest} />
        </BrowserRouter>
    );
}