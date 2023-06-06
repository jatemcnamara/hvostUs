import React from 'react'
import { Link } from 'react-router-dom'

const AfterCheckout = () => {

  return (
    <div className='page-container'>
        Дякуємо за замовлення

        <Link to='/'>На головну</Link>
    </div>
  )
}

export default AfterCheckout