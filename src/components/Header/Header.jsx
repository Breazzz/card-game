import React from 'react';
import { useSelector } from 'react-redux';

import logo from '../../static/images/logo.svg';
import s from './Header.module.css';


const Header = () => {
  const { cardsGuessed } = useSelector(
    (state) => state.mainReducer
  );

  return (
    <div>
      <div className={s.container}>
        <img src={logo} alt="logo"/>
        <div>
          <span className={s.count}>{cardsGuessed}</span>
          <span className={s.totalCount}>/12</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
