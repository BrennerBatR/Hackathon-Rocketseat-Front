import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Main from './pages/Main/Main';
import Login from './pages/Login/Login';
import StudentRegister from './pages/StudentRegister/StudentRegister';
import QuestionRegister from './pages/QuestionRegister/QuestionRegister';
import Quest from './pages/Quest/Quest';
import ModuleSelect from './pages/ModuleSelect';

export default function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Main}/>
            <Route path="/login" component={Login}/>
            <Route path="/studentsRegister" component={StudentRegister}/>
            <Route path="/questionsRegister" component={QuestionRegister}/>
            <Route path="/quest" component = {Quest} />
            <Route path="/moduleSelect" component = {ModuleSelect} />
        </BrowserRouter>
    );
}