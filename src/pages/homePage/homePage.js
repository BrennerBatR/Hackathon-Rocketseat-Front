import React, { Component } from 'react';

import backgroud from '../../assets/backgroud'

const homePage = () => (
  <div>
    <ImageBackground source={backgroud} style={{ width: '100%', height: '100%' }}>
      <Text>Inside</Text>
    </ImageBackground>
    <h1>Teste</h1>
  </div>
)

export default homePage;