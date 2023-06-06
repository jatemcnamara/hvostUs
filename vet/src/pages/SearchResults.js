import React, { useContext, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../css/SearchResults.css'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import { useLocation, useNavigate } from 'react-router-dom'
import { fetchProducts } from '../http/deviceAPI'
import { PRODUCT_ROUTE, BIRDS_ROUTE, CATS_ROUTE, DOGS_ROUTE, FISHES_ROUTE, REPTILES_ROUTE, RODENTS_ROUTE } from '../utils/consts'
import SearchAndCart from '../components/SearchAndCart'
import Pages from '../components/Pages'


if (localStorage.getItem('cart') !== null){
    const productsInStorage = localStorage.getItem('cart')
    var productsInCart = JSON.parse(productsInStorage)
}
else{
    var productsInCart = []
}



const SearchResults = observer(() => {
    const navigate = useNavigate()
    const {product} = useContext(Context)
    let searchCollection = []
    let pageCollection = []
    const location = useLocation();
    const keyWord = location.pathname.slice(8)
    const LIMIT = 12
    

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


    useEffect( () => {
        fetchProducts(null, null, null, null, 99999).then(data => {
            product.setAllProducts(data.rows)    
        })
        product.setPage(1)
    }, [])

    if (keyWord !== ''){
        product.allProducts.map(productItem => {
            if (productItem.name.includes(keyWord)){
                searchCollection.push(productItem)
            }
        })
    }
    
    const pageCount = Math.ceil(searchCollection.length / LIMIT)
    
    let firstIndex = 0

    if (product.page === 1){
        firstIndex = 0
    }
    else{
        firstIndex = (product.page - 1) * LIMIT
    }


    for (let i = firstIndex; i < firstIndex + LIMIT; i++){
        if (searchCollection[i]){
            pageCollection.push(searchCollection[i])
        }
    }

    

    return (
        <div className='page-container'>
            <Header />

            <div className="content-container">
                <SearchAndCart />

                <div className='search-products-container'>
                    <h1
                        className='search-message'
                        style={{display: searchCollection.length > 0 ? 'block' : 'none'}}
                    >
                        За вашим запросом знайдено:
                    </h1>
                    {pageCollection.map(productItem => (
                        <div className='search-product-item'>
                            <div className='info-container'>
                                <img 
                                    src={process.env.REACT_APP_API_URL + productItem.img} alt=''
                                    onClick={() => navigate(PRODUCT_ROUTE + '/' + productItem.id)}
                                ></img>
                                <p 
                                    className='product-name'
                                    onClick={() => navigate(PRODUCT_ROUTE + '/' + productItem.id)}
                                >
                                {productItem.name}
                                </p>
                            </div>

                            <div className='price-container'>
                                <p className='price'>
                                    {productItem.price} грн
                                </p>
                                <button 
                                    className='product-item-button'
                                    onClick={() => addToCart(productItem)}
                                >До кошику</button>
                            </div>
                        </div>
                    ))}
                </div>

                <Pages limit={LIMIT} pageCount={pageCount} matchesLength={searchCollection.length}/>

                <h2 
                    className='search-message'
                    style={{display: searchCollection.length > 0 ? 'none' : 'block'}}
                >
                    {'За вашим запросом нічого не знайдено :('}
                </h2>

                <p className='back-to-shop'>
                    Повернутися до магазину:
                </p>
                <div className="pets-types-container">
                    <div className="pet-card" onClick={() => navigate(DOGS_ROUTE)}>
                        <p>Все для собак</p>
                        <img src={require("../img/shop-dog-main.svg").default} alt=""></img>
                    </div>

                    <div className="pet-card" onClick={() => navigate(CATS_ROUTE)}>
                        <p>Все для котів</p>
                        <img src={require("../img/shop-cat-main.svg").default} alt=""></img>
                    </div>

                    <div className="pet-card" onClick={() => navigate(BIRDS_ROUTE)}>
                        <p>Все для птахів</p>
                        <img
                        src={require("../img/shop-bird-main.svg").default}
                        alt=""
                        ></img>
                    </div>

                    <div className="pet-card" onClick={() => navigate(RODENTS_ROUTE)}>
                        <p>Все для гризунів</p>
                        <img
                        src={require("../img/shop-rabbit-main.svg").default}
                        alt=""
                        ></img>
                    </div>

                    <div className="pet-card" onClick={() => navigate(FISHES_ROUTE)}>
                        <p>Все для рибок</p>
                        <img
                        src={require("../img/shop-fish-main.svg").default}
                        alt=""
                        ></img>
                    </div>

                    <div className="pet-card" onClick={() => navigate(REPTILES_ROUTE)}>
                        <p>Все для рептилій</p>
                        <img
                        src={require("../img/shop-lizard-main.svg").default}
                        alt=""
                        ></img>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
        
    )
}) 

export default SearchResults