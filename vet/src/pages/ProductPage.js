import React, { useContext, useEffect, useState } from 'react'
import '../css/ProductPage.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {useParams} from 'react-router-dom'
import { fetchOneProduct, fetchUsages, fetchAnimals } from '../http/deviceAPI'
import {useNavigate} from "react-router-dom"
import { BIRDS_ROUTE, CATS_ROUTE, DOGS_ROUTE, FISHES_ROUTE, HOME_ROUTE, REPTILES_ROUTE, RODENTS_ROUTE } from '../utils/consts'
import { Context } from '../index'
import { observer } from 'mobx-react-lite'
import SearchAndCart from '../components/SearchAndCart'
const reactStringReplace = require('react-string-replace');

const ProductPage = observer(({productId}) => {
    const [tProduct, setProduct] = useState({info: []})
    const id = productId
    const navigate = useNavigate()
    const {product} = useContext(Context)
    let usageName = ''
    let animalName = ''
    

    useEffect(() => {
        window.scrollTo(0, 0)
        fetchOneProduct(id).then(data => setProduct(data))
        fetchUsages().then(data => product.setUsages(data))
        fetchAnimals().then(data => product.setAnimals(data))
    }, [])


    return (
        <div className='page-container'>
            <Header />

            <div className='content-container'>
                <SearchAndCart />

                <div className='page-path'>
                <p onClick={() => navigate(HOME_ROUTE)}>
                    Ветаптека
                </p>
                <img src={require('../img/path-separator.svg').default} alt=''></img>

                
                {product.animals.map(animal => {
                    if (animal.id === tProduct.typeByAnimalId){
                        animalName = animal.name
                    }
                })}

                <p onClick={() => {
                    switch(tProduct.typeByAnimalId){
                        case 1: 
                            navigate(DOGS_ROUTE)
                            break
                        case 2: 
                            navigate(CATS_ROUTE)
                            break
                        case 3: 
                            navigate(BIRDS_ROUTE)
                            break
                        case 4: 
                            navigate(RODENTS_ROUTE)
                            break
                        case 5: 
                            navigate(FISHES_ROUTE)
                            break
                        case 6: 
                            navigate(REPTILES_ROUTE)
                            break
                        default:
                            navigate(HOME_ROUTE)
                            break
                    }
                }}>
                    {animalName}
                </p>
                
                <img src={require('../img/path-separator.svg').default} alt=''></img>
                
                {product.usages.map(usage => {
                    if (usage.id === tProduct.typeByUsageId){
                        usageName = usage.name
                    }
                })}

                <p>{usageName}</p>

                <img src={require('../img/path-separator.svg').default} alt=''></img>
                <p>
                    {tProduct.name}
                </p>
                </div>

                <div className='product-main-info-container'>
                    <div className='product-img'>
                        <img src={process.env.REACT_APP_API_URL + tProduct.img} alt=''></img>
                    </div>
                    
                    <div className='product-main-info'>
                        <div className='product-main-info-text'>
                            <h1>
                                {tProduct.name}
                            </h1>
                            <p>
                                <b>Виробник:</b> Вrit Care
                            </p>
                            <p>
                                <b>Вага:</b> 85 г
                            </p>
                        </div>

                        <div className='product-pricing'>
                            <div className='top-transparent-border'></div>
                            <h2>
                                {tProduct.price} грн
                            </h2>
                            <button className='product-pricing-button'>До кошику</button>
                        </div>
                    </div>
                </div>

                <div className='return-rule'>
                    <p>
                        Увага! Товар повернунню та обміну не підлягає
                    </p>
                </div>

                <div className='shipping-info-container'>
                    <div className='shipping-info-card'> 
                        <img src={require('../img/shipping-info-pickup.svg').default} alt=''></img>
                        <h3>
                            Самовивіз
                        </h3>
                        <p>
                            За адесою вул. Кишинівська 1. Україна, м. Одеса
                        </p>
                    </div>

                    <div className='shipping-info-card'> 
                    <img src={require('../img/shipping-info-delivery.svg').default} alt=''></img>
                        <h3>
                            Доставка
                        </h3>
                        <p>
                            Протягом 2-х днів на відділення Нової пошти
                        </p>
                    </div>

                    <div className='shipping-info-card'> 
                    <img src={require('../img/shipping-info-payment.svg').default} alt=''></img>
                        <h3>
                            Оплата
                        </h3>
                        <p>
                            При отриманні чи картою
                        </p>
                    </div>
                </div>

                <div className='product-extended-info-table'>
                    <div className='extended-info-description-container'>
                        <div className='table-header'>
                            <h4>
                                Опис
                            </h4>
                        </div>

                        <div className='text-container'>
                            <p>
                                {reactStringReplace(tProduct.description, '<br>', (match, i) => (
                                    <br/>
                                ))} 
                            </p>
                        </div>
                    </div>

                    <div className='extended-info-characteristics-container'>
                        <div className='table-header'>
                            <h4>
                                Характеристики
                            </h4>
                        </div>
                        
                        <div className='characteristics-container'>
                            {tProduct.info.map((info, index) => 
                                <div className='characteristic' key={info.id}>
                                <p className='key'>
                                    {info.title}
                                </p>
                                <p className='value'>
                                    {info.description}
                                </p>
                            </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
})

export default ProductPage