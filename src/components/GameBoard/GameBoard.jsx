import React from 'react';
import { useSelector } from 'react-redux';

import Card from './../Card/Card';
import StartPage from '../StartPage/StartPage';

import s from './GameBoard.module.css';

const GameBoard = () => {
  const { cards, isGameStart } = useSelector((state) => state.mainReducer);

  return (
    <div className={s.gameBoard}>

      {isGameStart ?
        <div className={`${s.cards} ${!isGameStart && s.hide}`}>
          {cards.map((card) => (
            <Card key={card.id} data={card} />
          ))}
        </div>
        :
        <StartPage />
      }
    </div>
  );
};

export default GameBoard;
