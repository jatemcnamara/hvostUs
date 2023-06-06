import React, { useContext, useEffect, useState } from 'react'
import { observer } from "mobx-react-lite"
import "../css/SearchBar.css"
import { Context } from '../index'
import { fetchProducts } from '../http/deviceAPI'
import {useNavigate} from "react-router-dom"
import { PRODUCT_ROUTE, SEARCH_ROUTE } from '../utils/consts'

var keyWord = ''

const SearchBar = observer(() => {
    const navigate = useNavigate()
    const {product} = useContext (Context)
    let searchCollection = []
    let [fastSearchCollection, setFastSearchCollection] = useState([])
    let [largeSearchCollection, setLargeSearchCollection] = useState(false)
    
    useEffect( () => {
        fetchProducts(null, null, null, null, 99999).then(data => {
            product.setAllProducts(data.rows)
        })
    }, [])
    

    const formSearchCollection = (keyWord) => {
        searchCollection = []
        setFastSearchCollection([])

        product.allProducts.map(productItem => {
            if (productItem.name.includes(keyWord)){
                searchCollection.push(productItem)
            }
        })

        if (keyWord !== ''){
            let tempCollection = []
            if (searchCollection.length > 3){
                for (let i = 0; i < 3; i++){
                    tempCollection.push(searchCollection[i])
                }
                setLargeSearchCollection(true)
                setFastSearchCollection(tempCollection)
            }
            else{
                searchCollection.map(collectionItem => {
                    tempCollection.push(collectionItem)
                })
                setLargeSearchCollection(false)
                setFastSearchCollection(tempCollection)
            }
        }
    }

    const customSubmit = (event) => {
        product.setPage(1)
        navigate(SEARCH_ROUTE + '/' + keyWord)

        event.preventDefault()
        keyWord = ''
        setFastSearchCollection([])
    }
    

    return (
        <form 
            className='search-wrapper'
            onSubmit={customSubmit}
        >
            <input
            type="search"
            className="search-bar"
            placeholder="Шукати товар"
            value={keyWord}
            onChange={(e) => {
                keyWord = e.target.value
                formSearchCollection(keyWord)
            }}
            ></input>
            <button 
                type='submit'
                className='butony' 
            ></button>
            <div 
                className='search-results'
                style={{display: fastSearchCollection.length > 0 ? 'block' : 'none'}}
            >
                {fastSearchCollection.map(productItem => (
                    <div className='search-results-item'>
                        <img 
                            src={process.env.REACT_APP_API_URL + productItem.img} alt=''
                            onClick={() => navigate(PRODUCT_ROUTE + '/' + productItem.id)}
                        ></img>

                        <p
                            onClick={() => navigate(PRODUCT_ROUTE + '/' + productItem.id)}
                        >
                            {productItem.name}
                        </p>
                    </div>
                ))}

                <div 
                    className='search-separator'
                    style={{display: largeSearchCollection ? 'block' : 'none'}}
                ></div>
                <button 
                    className='search-link'
                    style={{display: largeSearchCollection ? 'block' : 'none'}}
                >
                    Більше результатів...
                </button>
            </div>
        </form>
        
    )
})

export default SearchBar
