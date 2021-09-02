import React from 'react';
import { useDispatch } from 'react-redux';

import { startGame } from '../../store/mainReducer';

import jigsaw from '../../static/images/jigsaw.png';
import s from './StartPage.module.css';


const StartPage = () => {
  const dispatch = useDispatch()

  return (
    <div className={s.startPage}>
      <img className={s.imageJigsaw} src={jigsaw} alt="img"/>
      <h1 className={s.title}>Привет!</h1>
      <span className={s.text}>Я хочу сыграть с тобой в одну игру... Сыграй со мной <br/> и получи приз!</span>
      <button
        className={s.buttonStart}
        onClick={() => dispatch(startGame())}
      >
        Начать игру
      </button>
    </div>
  );
};

export default StartPage;
