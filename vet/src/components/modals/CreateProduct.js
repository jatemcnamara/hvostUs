import React, { useContext, useEffect, useState } from 'react'
import '../../css/Modal.css'
import {Context} from '../../index'
import {fetchAnimals, fetchBrands, fetchUsages, fetchUsageBrand} from '../../http/deviceAPI'
import { observer } from 'mobx-react-lite'
import { createProduct, createUsageBrand } from '../../http/deviceAPI'


const CreateProduct = observer(({show, onHide}) => {

  const {product} = useContext(Context)

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState(null)
  const [brandName, setBrandName] = useState(null)
  const [animalName, setAnimalName] = useState(null)
  const [usageName, setUsageName] = useState(null)
  const [info, setInfo] = useState([])

  useEffect( () => {
    fetchBrands().then(data => product.setBrands(data))
    fetchAnimals().then(data => product.setAnimals(data))
    fetchUsages().then(data => product.setUsages(data))
    fetchUsageBrand().then(data => product.setUsageBrandsId(data))
  }, [])


  const addInfo = () => {
    setInfo([...info, {title: '', description: '', number: Date.now()}])
  }
  const deleteInfo = (number) => {
    setInfo(info.filter(i => i.number !== number))
  }
  const changeInfo = (key, value, number) => {
    setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
  }


  const selectFile = e => {
    setFile(e.target.files[0])
  }

  const checkBrandName = (nameToCheck, brandName, brandId) => {
    if (nameToCheck === brandName){
      product.setSelectedBrand(brandId)
    }
  }

  const checkAnimalName = (nameToCheck, animalName, animalId) => {
    if (nameToCheck === animalName){
      product.setSelectedAnimal(animalId)
    }
  }

  const checkUsageName = (nameToCheck, usageName, animalId) => {
    if (nameToCheck === usageName){
      product.setSelectedUsage(animalId)
    }
  }
  

  const addProduct = () => {
    
    const formData = new FormData()
    const usageBrandData = new FormData()
    let flag = 1;

    formData.append('name', name)
    formData.append('price', `${price}`)
    formData.append('description', description)
    formData.append('img', file)
    formData.append('typeByAnimalId', product.selectedAnimal)
    formData.append('typeByUsageId', product.selectedUsage)
    formData.append('brandId', product.selectedBrand)
    formData.append('info', JSON.stringify(info))

    usageBrandData.append('brandId', product.selectedBrand)
    usageBrandData.append('typeByUsageId', product.selectedUsage)
    

    product.usageBrandsId.map(usageBrandId => {
      if (usageBrandId.brandId === product.selectedBrand && usageBrandId.typeByUsageId === product.selectedUsage){
        flag = 0  
      }
    })

    if (flag){
      createUsageBrand(usageBrandData)
    }
    createProduct(formData).then(data => onHide())
  }


  
  return (
    <div className='modal-container' show={show} onHide={onHide}>
        <img src={require('../../img/form-cross.svg').default} alt='' onClick={onHide} className='form-close'></img>
        
        <form onSubmit={addProduct}>
          <input 
            type='text' 
            placeholder='Назва товару' 
            className='text-input' 
            value={name}
            onChange={e => setName(e.target.value)}
            required
          ></input>

          <input 
            type='number' 
            placeholder='Ціна товару' 
            className='text-input' 
            value={price}
            onChange={e => setPrice(Number(e.target.value))}
            required
          ></input>

          <input 
            type='text' 
            placeholder='Опис' 
            className='text-input'
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          ></input>



          <select className='dropdown' value={brandName} onChange={e => setBrandName(e.target.value)} required>
            <option value="" disabled selected hidden>Виберіть бренд</option>
            {product.brands.map(brand => 
              <option key={brand.id}>
                {brand.name}
              </option>
            )}
          </select>
          {product.brands.map(brand => 
              checkBrandName(brand.name, brandName, brand.id)
          )}

          

          <select className='dropdown' value={animalName} onChange={e => setAnimalName(e.target.value)} required>
            <option value="" disabled selected hidden>Виберіть тип тварини</option>
            {product.animals.map(animal => 
              <option key={animal.id}>
                {animal.name}
              </option>
            )}
          </select>
          {product.animals.map(animal => 
              checkAnimalName(animal.name, animalName, animal.id)
          )}

          <select className='dropdown' value={usageName} onChange={e => setUsageName(e.target.value)} required>
            <option value="" disabled selected hidden>Виберіть категорію товару</option>
            {product.usages.map(usage => 
              <option key={usage.id}>
                {usage.name}
              </option>
            )}
          </select>
          {product.usages.map(usage => 
              checkUsageName(usage.name, usageName, usage.id)
          )}

          <div className='file-and-submit-container'>
            <input type='file' placeholder='Оберіть файл' className='file-input' onChange={selectFile} required></input>
            <button type='submit' className='modal-button'>Зберегти</button>
          </div>

          <div className='modal-button' onClick={addInfo}>Додати властивість</div>
          <div className='properties'>
            {
              info.map(i => 
                <div className='property-container' key={i.number}>
                  <input 
                    type='text' 
                    placeholder='Назва' 
                    className='text-input property' 
                    value={i.title} 
                    onChange={(e) => changeInfo('title', e.target.value, i.number)}
                    required
                  ></input>

                  <input 
                    type='text' 
                    placeholder='Значення' 
                    className='text-input property' 
                    value={i.description} 
                    onChange={(e) => changeInfo('description', e.target.value, i.number)}
                    required
                  ></input>

                  <button className='modal-button' onClick={() => deleteInfo(i.number)}>х</button>
                </div>
              )
            }
          </div>
        </form>
    </div>
  )
})

export default CreateProduct
