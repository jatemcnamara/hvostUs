import React, { useContext, useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { fetchProducts, fetchUsages, fetchBrands } from '../http/deviceAPI'
import { Context } from '../index'
import { observer } from 'mobx-react-lite'
import ProductError from './ProductError'
import ProductPage from './ProductPage'



const ProductPageLayout = observer(() => {
    const {id} = useParams()
    const {product} = useContext(Context)
    let isProductExists = false
    
    useEffect( () => {
        window.scrollTo(0, 0)
        fetchBrands().then(data => product.setBrands(data))
        fetchUsages().then(data => product.setUsages(data))
        fetchProducts(null, null, null, null, 99999).then(data => {
          product.setProducts(data.rows)
          product.setTotalCount(data.count)
        })
      }, [])

    product.products.map(product => {

        if (product.id === Number(id)){
            isProductExists = true
        }
    })




    return (
        <div className='page-container'>
            {isProductExists ? <ProductPage productId={id}/> : <ProductError />}
        </div>
    )
})

export default ProductPageLayout