import React, { useRef } from 'react'
import '../css/ShopPageForm.css'
import emailjs from '@emailjs/browser'

const ShopPageForm = () => {
    
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_vidgug7', 'template_fz95odm', form.current, 'ivPPwgMrN8kPLcml4')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      e.target.reset()
  };

  
  return (
    <div className="shop-page-form-container">
      <h2>
        Якщо у вас з’явилися проблеми з вибором, заповніть, будь ласка, форму
        зворотнього з’вязку та наш оператор з вами з’вяжеться протягом 15 хв.
      </h2>
      <form ref={form} onSubmit={sendEmail}>
        <input
          type="text"
          name="type_shop_page_form"
          className="form-type"
          value="сторінки магазину"
        ></input>

        <input
          type="text"
          placeholder="Введіть ваше ім’я"
          required
          name="user_name"
        ></input>

        <input
          type="text"
          placeholder="Введіть ваш номер телефона"
          required
          name="user_mail"
        ></input>

        <textarea
          type="text"
          placeholder="Коментар"
          required
          name="user_question"
        ></textarea>

        <button type="submit">Надіслати заявку</button>
      </form>
    </div>
  );
}

export default ShopPageForm