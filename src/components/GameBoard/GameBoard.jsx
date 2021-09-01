import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../Header/Header";
import s from "./GameBoard.module.css";
import Card from "./../Card/Card";
const GameBoard = () => {
  //   const dispatch = useDispatch();
  const { cards, isGameStart } = useSelector((state) => state.mainReducer);
  let [times, setTimes] = useState([]);

  useEffect(() => {
    let timers = JSON.parse(localStorage.getItem("times")) || [];
    timers.sort((a, b) => a - b);
    setTimes(timers.slice(0, 5));
  }, [isGameStart]);

  return (
    <div className={s.gameBoard}>
      <Header />
      <div className={`${s.cards} ${!isGameStart && s.hide}`}>
        {cards.map((card) => (
          <Card key={card.id} data={card} />
        ))}
      </div>
      <div className={`${s.times} ${isGameStart && s.hide}`}>
        Я хочу сыграть с тобой в одну игру. Жми старт!
      </div>
    </div>
  );
};

export default GameBoard;
