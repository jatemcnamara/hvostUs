import React, { useContext, useEffect, useState } from 'react'
import '../css/Orders.css'
import { fetchOrderedProducts, fetchProducts, updateOrder } from '../http/deviceAPI'
import { Context } from '../index'
import { useNavigate } from 'react-router-dom'

const OrderDetails = ({currentOrder, setCurrentOrder, setCurrentOrderNumber, render, setRender}) => {
    const [order, setOrder] = useState([])
    const [orderedProducts, setOrderedProducts] = useState([])
    

    const {product} = useContext(Context)

    useEffect(() => {
        fetchOrderedProducts().then(data => {
            setOrder(data.filter(orderedProduct => orderedProduct.orderId === currentOrder.id))
        })
        fetchProducts(null, null, null, null, null).then(data => product.setProducts(data.rows))
    }, [currentOrder])

    useEffect(() => {
        if (orderedProducts.length > 0){
            setOrderedProducts(prev => [])
        }

        order.map(curOrder => {
            setOrderedProducts(prev => [...prev, product.products.find(productItem => productItem.id === curOrder.productId)])
        })
    }, [order])

    const completeOrder = () => {
        updateOrder(currentOrder.id)
        setCurrentOrder('')
        setCurrentOrderNumber('')
        setRender(!render)
    }
    
   
    return (
        <div className='order-details'>
            <div className='order-info' style={
                {display: currentOrder ? 'flex' : 'none'}
            }>
                <p>Ідентифікатор: {currentOrder.identifier}</p>
                <p>Ім'я: {currentOrder.user_name}</p>
                <p>Прізвище: {currentOrder.user_surname}</p>
                <p>Телефон: {currentOrder.user_phone}</p>
                <p>Електронна пошта: {currentOrder.user_email}</p>
                <p>Передзвонити: {currentOrder.to_call ? 'так' : 'ні'}</p>
                <p>Доставка: {currentOrder.shipment}</p>
                <p>Оплата: {currentOrder.payment}</p>
                <p style={
                    {display: currentOrder.description ? 'block' : 'none'}
                }>
                    Коментар: {currentOrder.description}
                </p>
            </div>

            <div className='ordered-products'>
                {orderedProducts.map(orderedProduct => {
                    let productQuantity = 0

                    order.map(orderItem => {
                        if (orderItem.productId === orderedProduct.id){
                            productQuantity = orderItem.quantity
                        }
                    })
                
                    return(
                        <div className='order-item'>
                            <div className='order-item-main-info'>
                                <img
                                className="product-img"
                                src={process.env.REACT_APP_API_URL + orderedProduct.img}
                                alt=""
                                ></img>

                                <p className='order-product-name'>{orderedProduct.name}</p>
                            </div>
                            
                            <p>{productQuantity}</p>
                        </div>
                )})}

                <button onClick={completeOrder} style={{display: currentOrder ? 'block' : 'none'}} className='admin-button'>В архів</button>
            </div>
            
            
        </div>
    )
}

export default OrderDetails

// (
//     <div className='ordered-product-item'>
//         <img
//             className="product-img"
//             src={process.env.REACT_APP_API_URL + data.img}
//             alt=""
//         ></img>
//         lalalal
//     </div>
// )})