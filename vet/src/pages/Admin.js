import React, { useEffect, useState } from 'react'
import CreateBrand from '../components/modals/CreateBrand'
import '../css/Admin.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CreateProduct from '../components/modals/CreateProduct'
import Orders from '../components/Orders'

const Admin = () => {
  const [showBrandModal, setShowBrandModal] = React.useState(false)
  const [showProductModal, setShowProductModal] = React.useState(false)

  


  return (
    <div className='page-container'>
        <Header />

        <div className='admin-form-container'>
            <button className='admin-button' onClick={() => {setShowBrandModal(true)}}>Додати бренд</button>
            <button className='admin-button' onClick={() => {setShowProductModal(true)}}>Додати продукт</button>
            <Orders />
        </div>

        { showBrandModal ? <CreateBrand show={showBrandModal} onHide={() => setShowBrandModal(false)}/> : null }
        { showProductModal ? <CreateProduct show={showProductModal} onHide={() => setShowProductModal(false)}/> : null }
        
        
        <Footer />
    </div>
  )
}

export default Admin