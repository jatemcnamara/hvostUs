import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import ProductItem from './ProductItem'
import Pages from './Pages'

const ProductList = observer( () => {
    const {product} = useContext(Context)

    return (
        <div className='product-list-container'>
            <div className='products-container'>
                {product.products.map(product =>
                    <ProductItem key={product.id} tProduct={product}/>
                )}
            </div>
            
            <Pages matchesLength={1}/>
        </div>
    )
})

export default ProductList