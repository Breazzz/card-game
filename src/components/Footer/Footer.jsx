import React from 'react';

import iconIn from '../../static/images/iconin.svg';
import iconVk from '../../static/images/iconvk.svg';
import iconInst from '../../static/images/iconinst.svg';
import s from './Footer.module.css';


const Footer = () => {

  return (
    <div className={s.footer}>
      <div className={s.container}>
        <span className={s.text}>
          © 2021 Justice-team. All rights reserved.
        </span>
        <div className={s.iconsContainer}>
          <img src={iconIn} alt="icon-in"/>
          <img src={iconVk} alt="icon-vk"/>
          <img src={iconInst} alt="icon-inst"/>
        </div>
      </div>
    </div>
  );
};

export default Footer;
