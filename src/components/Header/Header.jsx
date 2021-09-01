import React from "react";
import { useSelector } from "react-redux";
import s from "./Header.module.css";
import { startGame } from "../../store/mainReducer";
import { useDispatch } from "react-redux";
const Header = () => {
  const { cardsGuessed, isGameStart } = useSelector(
    (state) => state.mainReducer
  );
  const dispatch = useDispatch();
  return (
    <div className={s.header}>
      {/*<div className={s.timer}>{formatSeconds(gameTimer)}</div>*/}
      <button
        disabled={isGameStart}
        className={`${s.button} ${isGameStart && s.hide}`}
        onClick={() => dispatch(startGame())}
      >
        старт
      </button>
      <div className={s.counter}>
        {cardsGuessed}
        <span>/12</span>
      </div>
    </div>
  );
};

export default Header;
