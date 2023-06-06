import React, { useContext, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductList from '../components/ProductList'
import BrandsContainer from '../components/BrandsContainer'
import '../css/ShopDogs.css'
import { Context } from '../index'
import { fetchBrands, fetchProducts } from '../http/deviceAPI'
import { observer } from 'mobx-react-lite'


const ShopCats = observer(() => {
  const {product} = useContext (Context)

  useEffect( () => {
    fetchBrands().then(data => product.setBrands(data))
    fetchProducts().then(data => product.setProducts(data.rows))
  }, [])

  return (
    <div className='page-container'>
        <Header />
        <div className='content-container'>
            <div className='cart-container'>
                <input type="search" className='search-bar'></input>
                <img src={require('../img/shop-cart-icon.svg').default} alt=''></img>
            </div>

            <div className='page-path'>
              <p>
                Ветаптека
              </p>
              <img src={require('../img/path-separator.svg').default} alt=''></img>
              <p>
                Все для собак
              </p>
            </div>

            <h1>
              Товари для собак
            </h1>

            <div className='categories'>
              <div className='category'>
                <p>
                  Корм для собак
                </p>
                <img src={require('../img/dogs-category-food.svg').default} alt=''></img>
              </div>
              <div className='category'>
                <p>
                  Здоров'я та ліки
                </p>
                <img src={require('../img/dogs-category-health.svg').default} alt=''></img>
              </div>
              <div className='category'>
                <p>
                  Догляд за собаками
                </p>
                <img src={require('../img/dogs-category-care.svg').default} alt=''></img>
              </div>
              <div className='category'>
                <p>
                  Аксесуари та амуніція
                </p>
                <img src={require('../img/dogs-category-outfit.svg').default} alt=''></img>
              </div>
            </div>
    
            <div className='main-content'>
              <BrandsContainer />

              <ProductList />
                
            </div>
        </div>
        <Footer />
    </div>
    
  )
}) 

export default ShopCats
