import React, { useEffect, useState } from 'react'
import { fetchOrders } from '../http/deviceAPI'
import { fetchOrderedProducts } from '../http/deviceAPI'
import '../css/Orders.css'
import '../css/Modal.css'
import OrderDetails from './OrderDetails'

const Orders = () => {
    const [orders, setOrders] = useState([])
    const [orderedProducts, setOrderedProducts] = useState([])
    const [selectedOrder, setSelectedOrder] = useState('')
    const [selectedOrderNumber, setSelectedOrderNumber] = useState('')

    const [render, setRender] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            fetchOrders().then(data => setOrders(data))
            fetchOrderedProducts().then(data => setOrderedProducts(data))
        }, 0)
    }, [render])

    const currentOrder = (ident) => {
        orders.map(order => {
            if (order.identifier === ident){
                setSelectedOrder(order)
            }
        })

        setSelectedOrderNumber(ident)
    }

    return (
        <div className='orders-container'>
            <select 
                className='dropdown' 
                value={selectedOrderNumber} 
                onChange={e => currentOrder(e.target.value)}
                required
            >
                <option value="" disabled selected hidden>Виберіть код замовлення</option>

                {orders.map(order => {
                    if (order.status === 'active'){
                        return (
                            <option key={order.id}>
                                {order.identifier}
                            </option>
                        )
                    }
                }
                )}
          </select>

          <OrderDetails currentOrder={selectedOrder} setCurrentOrder={setSelectedOrder} setCurrentOrderNumber={setSelectedOrderNumber} render={render} setRender={setRender}/>
        </div>
    )
}

export default Orders