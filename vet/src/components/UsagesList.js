import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import { fetchUsages } from '../http/deviceAPI'
import '../css/UsagesList.css'

const UsagesList = observer( () => {
    const {product} = useContext(Context)

    useEffect( () => {
      fetchUsages().then(data => product.setUsages(data))
    }, [])

    return (
        <div className="categories">
          {product.usages.map(usage => 
            
            <div 
              className="category" 
              onClick={() => {
                usage.id === product.selectedUsage.id ? product.setSelectedUsage('') : product.setSelectedUsage(usage)
                product.setSelectedBrand('')
              }}
              key={usage.id}
              style={{backgroundColor: usage.id === product.selectedUsage.id ? 'var(--yellow)' : 'var(--lightBlue)'}}
            >
              <p>
                {usage.name}
              </p>
              <img src={process.env.REACT_APP_API_URL + usage.img} alt=''></img>
            </div>
          )}

        </div>
    )
})

export default UsagesList