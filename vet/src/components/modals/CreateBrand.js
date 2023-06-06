import React, { useState } from 'react'
import '../../css/Modal.css'
import { createBrand } from '../../http/deviceAPI'

export default function CreateBrand({show, onHide}) {
  const [value, setValue] = useState('')

  const addBrand = () => {
    createBrand({name: value}).then(data => {
      setValue('')
      onHide()
    })
  }

  return (
    <div className='modal-container' show={show} onHide={onHide}>
        <img src={require('../../img/form-cross.svg').default} alt='' onClick={onHide} className='form-close'></img>

        <form onSubmit={addBrand}>
          <input 
            type='text' 
            placeholder='Назва бренду' 
            className='text-input' 
            value={value}
            onChange={e => setValue(e.target.value)}
            required
          >
              
          </input>
          <button type='submit' className='modal-button'>Зберегти</button>
        </form>
    </div>
  )
}
