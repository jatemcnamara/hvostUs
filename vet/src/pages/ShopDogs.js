import React, { useContext, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductList from '../components/ProductList'
import BrandsContainer from '../components/BrandsContainer'
import '../css/ShopDogs.css'
import { Context } from '../index'
import { fetchBrands, fetchProducts, fetchUsages } from '../http/deviceAPI'
import { observer } from 'mobx-react-lite'
import UsagesList from '../components/UsagesList'
import SearchAndCart from '../components/SearchAndCart'
import {useNavigate} from "react-router-dom"
import { HOME_ROUTE } from '../utils/consts'
import ShopPageForm from '../components/ShopPageForm'


const shopDogs = observer(() => {
  const {product} = useContext (Context)
  const navigate = useNavigate()


  useEffect( () => {
    product.setSelectedUsage('')
    window.scrollTo(0, 0)
    fetchBrands().then(data => product.setBrands(data))
    fetchUsages().then(data => product.setUsages(data))
    fetchProducts(null, null, 1, 1, 3).then(data => {
      product.setProducts(data.rows)
      product.setTotalCount(data.count)
    })
  }, [])

  useEffect(() => {
    
    fetchProducts(product.selectedUsage.id, product.selectedBrand.id, 1, product.page, 3).then(data => {
      product.setProducts(data.rows)
      product.setTotalCount(data.count)
    })
    
  }, [product.page, product.selectedUsage, product.selectedBrand])


  return (
    <div className="page-container">
      <Header />
      <div className="content-container">
        <SearchAndCart />

        <div className="page-path">
          <p onClick={() => navigate(HOME_ROUTE)}>Ветаптека</p>
          <img src={require("../img/path-separator.svg").default} alt=""></img>
          <p>Все для собак</p>
        </div>

        <h1>Товари для собак</h1>

        <UsagesList />

        <div className="main-content">
          <BrandsContainer />

          <ProductList />
        </div>
      </div>
      <ShopPageForm />
      
      <Footer />
    </div>
  );
}) 

export default shopDogs