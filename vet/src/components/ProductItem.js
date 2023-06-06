import React, { useContext } from 'react'
import '../css/ProductItem.css'
import { useNavigate } from "react-router-dom"
import { PRODUCT_ROUTE } from '../utils/consts'
import { Context } from '../index'


if (localStorage.getItem('cart') !== null){
    const productsInStorage = localStorage.getItem('cart')
    var productsInCart = JSON.parse(productsInStorage)
}
else{
    var productsInCart = []
}

const ProductItem = ({tProduct}) => {
    const navigate = useNavigate()

    const {product} = useContext (Context)
    
    

    const addToCart = (tProduct) => {
        let isNewProduct = 1
        let tempProduct = tProduct
        productsInCart = JSON.parse(localStorage.getItem('cart'))

        productsInCart.map(productInCart => {
            if (productInCart.id === tProduct.id){
                isNewProduct = 0;

                productInCart.quantity++
            }
        })

        if (isNewProduct){
            tempProduct.quantity = 1
            product.setProductsInCart(product.productsInCart + 1)

            productsInCart.push(tempProduct)
        }

        
        localStorage.setItem('cart', JSON.stringify(productsInCart))
    }

    return(
        <div 
            className='product-card'
        >
            <div className='info-container'>
                <img 
                    src={process.env.REACT_APP_API_URL + tProduct.img} alt=''
                    onClick={() => navigate(PRODUCT_ROUTE + '/' + tProduct.id)}
                ></img>
                <p 
                    className='product-name'
                    onClick={() => navigate(PRODUCT_ROUTE + '/' + tProduct.id)}
                >
                 {tProduct.name}
                </p>
            </div>
            <div className='price-container'>
                <p className='price'>
                    {tProduct.price} грн
                </p>
                <button 
                    className='product-card-button'
                    onClick={() => addToCart(tProduct)}
                >До кошику</button>
            </div>
        </div>
    )
}

export default ProductItem