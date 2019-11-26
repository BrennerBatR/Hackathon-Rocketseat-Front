import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from './pages/Login';
import Main from './pages/Main';
import homePage from './pages/homePage/homePage'

//EXACT = sem o exact ele considera q todas rotas começadas com / serao a login
export default function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" component={homePage} />
      <Route path="/login" exact component={Login} />
      <Route path="/dev/:id" component={Main} />
    </BrowserRouter>
  );
}