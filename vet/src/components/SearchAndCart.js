import React, { useState, useContext } from "react";
import {observer} from "mobx-react-lite"
import '../css/Cart.css'
import { Context } from '../index'
import {useNavigate} from "react-router-dom"
import { CHECKOUT_ROUTE } from "../utils/consts";
import SearchBar from "./SearchBar";


const SearchAndCart = observer(() => {
  let [cartOpen, setCartOpen] = useState(false);
  let [render, setRender] = useState(false);

  const {product} = useContext (Context)
  const navigate = useNavigate()


  if (localStorage.getItem('cart') !== null){
    const productsInStorage = localStorage.getItem('cart')
    var productsInCart = JSON.parse(productsInStorage)
  }
  else{
    var productsInCart = []
  }

  const deleteProduct = (tProduct) => {
    let tempProductList = []

    productsInCart.map((productInCart) => {
      if (productInCart.id !== tProduct.id) {
        tempProductList.push(productInCart)
      }
    });

    product.setProductsInCart(product.productsInCart - 1)
    productsInCart = tempProductList
    localStorage.setItem("cart", JSON.stringify(productsInCart));
    setRender(render = !render)
  };


  const increaseProductQuantity = (product) => {
    productsInCart.map((productInCart) => {
      if (productInCart.id === product.id) {
        productInCart.quantity++

        setRender(render = !render)
      }
    });

    localStorage.setItem("cart", JSON.stringify(productsInCart));
  };

  const decreaseProductQuantity = (product) => {
    productsInCart.map((productInCart) => {
      if (productInCart.id === product.id) {
        if (productInCart.quantity > 1){
          productInCart.quantity--
          localStorage.setItem("cart", JSON.stringify(productsInCart));
        }
        else{
          deleteProduct(product)
          setRender(render = !render)
        }

        setRender(render = !render)
      }
    });
  }

  
  const countTotalPrice = () => {
    let totalPrice = 0

    productsInCart.map((productInCart) => {
      totalPrice = totalPrice + (productInCart.quantity * productInCart.price)
    });

    return totalPrice
  }

  
  return (
    <div className="cart-container">
      <SearchBar />
      
      <div className="cart-icon-container">
        <img
          src={require("../img/shop-cart-icon.svg").default}
          alt=""
          onClick={() => setCartOpen((cartOpen = !cartOpen))}
          className={`shop-cart-button ${cartOpen ? "active" : ""}`}
        ></img>
        <p className="products-quantity">{product.productsInCart}</p>
      </div>

      <div className={`cart-modal-container ${cartOpen ? "active" : ""}`}>
        <img
          className="cart-modal-close"
          src={require("../img/cart-modal-cross.svg").default}
          alt=""
          onClick={() => setCartOpen((cartOpen = !cartOpen))}
        ></img>

        <h4 className={`rerender ${render ? "active" : ""}`}>
          {productsInCart.length !== 0
            ? "Дякуємо за ваш вибір!"
            : "Тут ще нічого немає :("}
        </h4>

        <div className="cart-products-container">
          {productsInCart.map((product) => (
            <div className="cart-product-item">
              <div className="info-left">
                <img
                  className="cart-delete-product"
                  src={require("../img/cart-modal-cross.svg").default}
                  alt=""
                  onClick={() => deleteProduct(product)}
                ></img>

                <img
                  className="product-img"
                  src={process.env.REACT_APP_API_URL + product.img}
                  alt=""
                ></img>

                <p className="product-name">{product.name}</p>
              </div>

              <div className="info-right">
                <div className="product-quantity">
                  <img
                    className="product-quantity-changer"
                    src={
                      require("../img/cart-modal-decrease-quantity.svg").default
                    }
                    alt=""
                    onClick={() => decreaseProductQuantity(product)}
                  ></img>

                  <p>{product.quantity}</p>

                  <img
                    className="product-quantity-changer"
                    src={
                      require("../img/cart-modal-increase-quantity.svg").default
                    }
                    alt=""
                    onClick={() => increaseProductQuantity(product)}
                  ></img>
                </div>
                <p className="product-price">
                  {product.price * product.quantity} грн
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="separator"></div>

        <div className="total-price-container">
          <p>Всього:</p>
          <p className="total-price">{countTotalPrice()} грн</p>
        </div>

        <div className="cart-buttons-container">
          <button
            className="back-to-shopping"
            onClick={() => setCartOpen((cartOpen = !cartOpen))}
          >
            Продовжити покупки
          </button>

          <button 
            className="complete-order"
            onClick={() => navigate(CHECKOUT_ROUTE)}
          >Оформлення замолення</button>
        </div>
      </div>
    </div>
  );
})

export default SearchAndCart