import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../css/ShopMain.css'
import {useNavigate} from "react-router-dom"
import { BIRDS_ROUTE, CATS_ROUTE, DOGS_ROUTE, FISHES_ROUTE, REPTILES_ROUTE, RODENTS_ROUTE } from "../utils/consts";
import SearchAndCart from '../components/SearchAndCart'

export default function ShopMainPage() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <Header />
      <div className="content-container">
        <SearchAndCart />
        
        <div className="pets-types-container">
          <div className="pet-card" onClick={() => navigate(DOGS_ROUTE)}>
            <p>Все для собак</p>
            <img src={require("../img/shop-dog-main.svg").default} alt=""></img>
          </div>

          <div className="pet-card" onClick={() => navigate(CATS_ROUTE)}>
            <p>Все для котів</p>
            <img src={require("../img/shop-cat-main.svg").default} alt=""></img>
          </div>

          <div className="pet-card" onClick={() => navigate(BIRDS_ROUTE)}>
            <p>Все для птахів</p>
            <img
              src={require("../img/shop-bird-main.svg").default}
              alt=""
            ></img>
          </div>

          <div className="pet-card" onClick={() => navigate(RODENTS_ROUTE)}>
            <p>Все для гризунів</p>
            <img
              src={require("../img/shop-rabbit-main.svg").default}
              alt=""
            ></img>
          </div>

          <div className="pet-card" onClick={() => navigate(FISHES_ROUTE)}>
            <p>Все для рибок</p>
            <img
              src={require("../img/shop-fish-main.svg").default}
              alt=""
            ></img>
          </div>

          <div className="pet-card" onClick={() => navigate(REPTILES_ROUTE)}>
            <p>Все для рептилій</p>
            <img
              src={require("../img/shop-lizard-main.svg").default}
              alt=""
            ></img>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
