import React, { useState, useRef, useEffect, useContext } from "react";
import "../css/CheckoutForm.css"
import emailjs from '@emailjs/browser'
import { observer } from 'mobx-react-lite'
import { createOrder, createOrderedProduct, fetchOrders } from "../http/deviceAPI";
import { Context } from "../index";
import { useNavigate } from "react-router-dom";
import { AFTER_CHECKOUT_ROUTE } from "../utils/consts";

var formName = ''
var formSurname = ''
var formPhone = ''
var formEmail = ''

const CheckoutForm = observer(() => {
  const {product} = useContext(Context)
  const navigate = useNavigate()
  
  const [dataFilled, setDataFilled] = useState("false")
  const [shippingCheck, setShippingCheck] = useState("false")

  var currentOrderId = 0

  const [userName, setUserName] = useState('')
  const [userSurname, setUserSurname] = useState('')
  const [userPhone, setUserPhone] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [toCall, setToCall] = useState(true)
  const [shipment, setShipment] = useState('')
  const [payment, setPayment] = useState('')
  const [comment, setComment] = useState('')


  const addOrderedProducts = (ident) => {
    let productsInCart = []

    if (localStorage.getItem('cart') !== null){
      const productsInStorage = localStorage.getItem('cart')
      productsInCart = JSON.parse(productsInStorage)
    } 

    fetchOrders().then(data => {
      data.map(order => {
        if (+order.identifier === ident){ 
          currentOrderId = order.id
        }
      })

      productsInCart.map(productInCart => {
        const formData = new FormData()

        formData.append('quantity', productInCart.quantity)
        formData.append('orderId', currentOrderId)
        formData.append('productId', productInCart.id)
        createOrderedProduct(formData)
      })
  
      productsInCart = []
      localStorage.setItem("cart", JSON.stringify(productsInCart));
      product.setProductsInCart(0)
      navigate(AFTER_CHECKOUT_ROUTE)
    })
  }


  const makeOrder = () => {
    const formData = new FormData()
    const ident = Date.now()

    formData.append('identifier', ident)
    formData.append('status', 'active')
    formData.append('user_name', userName)
    formData.append('user_surname', userSurname)
    formData.append('user_phone', userPhone)
    formData.append('user_email', userEmail)
    formData.append('to_call', toCall)
    formData.append('shipment', shipment)
    formData.append('payment', payment)
    formData.append('description', comment)

    createOrder(formData)
    addOrderedProducts(ident) 
  }

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault()

    makeOrder()

    emailjs.sendForm('service_vidgug7', 'template_ig3revd', form.current, 'ivPPwgMrN8kPLcml4')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      e.target.reset()
  };
  

  const setName = (name) => {
    formName = name
  }
  const setSurname = (surname) => {
    formSurname = surname
  }
  const setPhone = (phone) => {
    formPhone = phone
  }
  const setEmail = (email) => {
    formEmail = email
  } 

  const isContactDataFilled = () => {
    if (formName.length > 0 && formSurname.length > 0 && formPhone.length > 0 && formEmail.length > 0){
      setDataFilled(true)
    }
    else{ 
      setDataFilled(false)
    }
  }

  return (
    <form className="checkout-form-container" ref={form} onSubmit={sendEmail}>
      <input
        type="text"
        name="type_shop_page_form"
        className="form-type"
        value="сторінки оформлення замовлення"
      ></input>

      <div className="contact-data-container">
        <h3>
          <div className="form-stage-marker">1</div>
          Контактні дані
        </h3>

        <div className="data-body">
          <label>Ім’я*</label>
          <input
            type="text"
            placeholder="Введіть ваше ім’я"
            required
            name="user_name"
            onChange={(e) => {
              setUserName(e.target.value)
              setName(e.target.value)
              isContactDataFilled()
            }}
          ></input>

          <label>Прізвище*</label>
          <input
            type="text"
            placeholder="Введіть ваше прізвище"
            required
            name="user_surname"
            onChange={(e) => {
              setUserSurname(e.target.value)
              setSurname(e.target.value)
              isContactDataFilled()
            }}
          ></input>

          <label>Телефон*</label>
          <input
            type="number"
            placeholder="Введіть ваш номер телефону"
            required
            name="user_phone"
            onChange={(e) => {
              setUserPhone(e.target.value)
              setPhone(e.target.value)
              isContactDataFilled()
            }}
          ></input>

          <p>
            <input
              className="check-box"
              type="checkbox"
              name="checkbox"
              value="Не передзвонювати"
              onChange={e => setToCall(!toCall)}
            ></input>
            Не передзвонювати
          </p>

          <label>E-mail*</label>
          <input
            type="email"
            placeholder="Введіть адресу вашої електронної пошти"
            required
            name="user_mail"
            onChange={(e) => {
              setUserEmail(e.target.value)
              setEmail(e.target.value)
              isContactDataFilled()
            }}
          ></input>
        </div>
      </div>

      <div className="shipping-data-container">
        <h3>
          <div
            className="form-stage-marker"
            style={{backgroundColor: dataFilled === true ? "var(--yellow)" : "var(--lightBlue)"}}
          >
            2
          </div>
          Спосіб доставки
        </h3>

        
        <div 
          className="data-body" 
          style={{display: dataFilled === true ? "flex" : "none"}}
        >
          <p className="shipping-type">
            <img src={require("../img/shipping-np.svg").default} alt=""></img>
            Нова пошта
          </p>
          <p>
            <input
              className="check-box"
              type="radio"
              name="shipping"
              value="Доставка у відділення Нової Пошти"
              required
              onClick={() => setShippingCheck(true)}
              onChange={e => setShipment(e.target.value)}
            ></input>
            Доставка у відділення Нової Пошти
          </p>
          <p>
            <input
              className="check-box"
              type="radio"
              name="shipping"
              value="Доставка кур'єром Нової Пошти на адресу"
              required
              onClick={() => setShippingCheck(true)}
              onChange={e => setShipment(e.target.value)}
            ></input>
            Доставка кур'єром Нової Пошти на адресу
          </p>
          <p>
            <input
              className="check-box"
              type="radio"
              name="shipping"
              value="Доставка у поштомат Нової Пошти"
              required
              onClick={() => setShippingCheck(true)}
              onChange={e => setShipment(e.target.value)}
            ></input>
            Доставка у поштомат Нової Пошти
          </p>

          <p className="shipping-type">
            <img src={require("../img/shipping-sm.svg").default} alt=""></img>
            Самовивіз
          </p>

          <p>
            <input
              className="check-box"
              type="radio"
              name="shipping"
              value="Самовивіз"
              required
              onClick={() => setShippingCheck(true)}
              onChange={e => setShipment(e.target.value)}
            ></input>
            вул. Кишинівська 1, т. Одеса
          </p>
        </div>



        <div 
          className="data-body"
          style={{display: dataFilled === true ? "none" : "flex", opacity: 0.5}}
        >
          <p className="shipping-type">
            <img src={require("../img/shipping-np.svg").default} alt=""></img>
            Нова пошта
          </p>
          <p>
            <input
              className="check-box"
              type="radio"
              name="shipping"
              value="Доставка у відділення Нової Пошти"
              disabled
            ></input>
            Доставка у відділення Нової Пошти
          </p>
          <p>
            <input
              className="check-box"
              type="radio"
              name="shipping"
              value="Доставка кур'єром Нової Пошти на адресу"
              disabled
            ></input>
            Доставка кур'єром Нової Пошти на адресу
          </p>
          <p>
            <input
              className="check-box"
              type="radio"
              name="shipping"
              value="Доставка у поштомат Нової Пошти"
              disabled
            ></input>
            Доставка у поштомат Нової Пошти
          </p>

          <p className="shipping-type">
            <img src={require("../img/shipping-sm.svg").default} alt=""></img>
            Самовивіз
          </p>

          <p>
            <input
              className="check-box"
              type="radio"
              name="shipping"
              value="Самовивіз"
              disabled
            ></input>
            вул. Кишинівська 1, м. Одеса
          </p>
        </div>
      </div>




      <div className="payment-data-container">
        <h3>
          <div 
            className="form-stage-marker"
            style={{backgroundColor: dataFilled === true && shippingCheck === true ? "var(--yellow)" : "var(--lightBlue)"}}
          >
            3
          </div>
          Спосіб оплати
        </h3>

        <div 
          className="data-body"
          style={{display: dataFilled === true && shippingCheck === true ? "flex" : "none"}}
        >
          <p>
            <input
              className="check-box"
              type="radio"
              name="payment"
              value="картою"
              required
              onChange={e => setPayment(e.target.value)}
            ></input>
            Картою при отриманні
          </p>

          <p>
            <input
              className="check-box"
              type="radio"
              name="payment"
              value="готівкою"
              required
              onChange={e => setPayment(e.target.value)}
            ></input>
            Готівкою при отриманні
          </p>

          <label>Коментар (не обов'язково)</label>
          <input
            className="comment"
            type="textarea"
            placeholder="Ваш коментар"
            name="user_comment"
            onChange={e => setComment(e.target.value)}
          ></input>
        </div>



        <div 
          className="data-body"
          style={{display: dataFilled === true && shippingCheck === true ? "none" : "flex", opacity: 0.5}}
        >
          <p>
            <input
              className="check-box"
              type="radio"
              name="payment"
              value="картою"
              disabled
            ></input>
            Картою при отриманні
          </p>

          <p>
            <input
              className="check-box"
              type="radio"
              name="payment"
              value="готівкою"
              disabled
            ></input>
            Готівкою при отриманні
          </p>

          <label>Коментар (не обов'язково)</label>
          <input
            className="comment"
            type="textarea"
            placeholder="Ваш коментар"
            name="user_comment"
            disabled
          ></input>
        </div>
      </div>

      <button className="confirm-order" type="submit">
        Підтвердити замовлення
      </button>
    </form>
  );
})

export default CheckoutForm
