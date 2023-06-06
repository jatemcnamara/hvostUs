import React from 'react'
import '../css/Header.css'
import {useNavigate} from "react-router-dom"
import { HOME_ROUTE } from '../utils/consts';

export default function Header() {
  const navigate = useNavigate();

  return (
    <header>
      <div className="header-container">
        <div className="header-logo">
          <img src={require("../img/header-logo.svg").default} alt=""></img>
        </div>

        <div className="header-menu">
          <ul>
            <li>
              <p>Про клініку</p>
            </li>
            <li>
              <p onClick={() => navigate(HOME_ROUTE)}>Аптека</p>
            </li>
            <li>
              <p>Наші послуги</p>
            </li>
            <li>
              <p>Контакти</p>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
  
}
