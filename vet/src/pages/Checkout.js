import React, { useState, useContext, useEffect } from "react";
import { observer } from 'mobx-react-lite'
import '../css/Checkout.css'
import { Context } from '../index'
import Header from "../components/Header";
import Footer from "../components/Footer";
import CheckoutForm from "../components/CheckoutForm";

const Checkout = observer(() => {
    
    let [render, setRender] = useState(false);
    const {product} = useContext (Context)

    useEffect(() => {
      window.scrollTo(0, 0)
    }, [])
    

    if (localStorage.getItem('cart') !== null){
      const productsInStorage = localStorage.getItem('cart')
      var productsInCart = JSON.parse(productsInStorage)
    } else{
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
        <div className="page-container checkout-container">
          <Header />

          <div className="content-container">
            <h1>Оформлення замовлення</h1>

            <div className="checkout-cart-container">
              <div className="checkout-cart-content">
                <h2>У вашому кошику</h2>

                <div className="checkout-products-container">
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
                              require("../img/cart-modal-decrease-quantity.svg")
                                .default
                            }
                            alt=""
                            onClick={() => decreaseProductQuantity(product)}
                          ></img>

                          <p>{product.quantity}</p>

                          <img
                            className="product-quantity-changer"
                            src={
                              require("../img/cart-modal-increase-quantity.svg")
                                .default
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
              </div>
            </div>

            <CheckoutForm />
          </div>

          <Footer />
        </div>
      );

})

export default Checkout