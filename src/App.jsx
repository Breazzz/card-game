import React from 'react';

import GameBoard from './components/GameBoard/GameBoard';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import './index.css';


function App() {
  return (
    <div className="app">
      <div className="container">
        <Header />
        <GameBoard />
        <Footer />
      </div>
    </div>
  );
}

export default App;
