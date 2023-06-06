import React, { useContext, useEffect, useState } from 'react'
import {observer} from "mobx-react-lite"
import {Context} from '../index'
import '../css/BrandsContainer.css'
import { fetchUsageBrand, fetchBrands } from '../http/deviceAPI'

const BrandsContainer = observer(() => {
    const {product} = useContext(Context)
    let [brandsOpen, setBrandsOpen] = useState(false);

    useEffect( () => {
        fetchBrands().then(data => product.setBrands(data))
        fetchUsageBrand().then(data => product.setUsageBrandsId(data))
    }, [])

    


    const usagesBrandsId = []

    product.usageBrandsId.map(usageBrandId => {
        if (usageBrandId.typeByUsageId === product.selectedUsage.id){
          usagesBrandsId.push(usageBrandId.brandId)   
        }
    })

    const selectedBrands = []

    

    if (product.selectedUsage.id){
        product.brands.map(brand => {
            for (let i = 0; i < usagesBrandsId.length; i++){
                if (brand.id === usagesBrandsId[i]){
                    selectedBrands.push(brand)
                }
                
            }
        })  
    }
    else{
        product.brands.map(brand => {
            selectedBrands.push(brand)
        })
    }

    if (selectedBrands.length < 6){
      return (
        <div className="brands-container">
          <p>
            Виробник
          </p>
          <ul>
            {selectedBrands.map((brand) => (
              <li
                onClick={() => {
                  brand.id === product.selectedBrand.id
                    ? product.setSelectedBrand("")
                    : product.setSelectedBrand(brand);
                }}
                key={brand.id}
              >
                <div
                  className="brand-radio-button"
                  style={{
                    backgroundColor:
                      brand.id === product.selectedBrand.id
                        ? "var(--blue)"
                        : "white",
                  }}
                ></div>
  
                {brand.name}
              </li>
            ))}
          </ul>
        </div>
      )
    }
    else{
      return (
        <div className="brands-container">
          <p>
            Виробник
            <img
              className={`full-list-opener ${brandsOpen ? "active" : ""}`}
              src={require("../img/brands-container-arrow.svg").default}
              alt=""
              onClick={() => {
                product.setSelectedBrand("")
                setBrandsOpen((!brandsOpen))
              }}
            ></img>
          </p>
          <ul>
            <li
              className={`short-brand-list-item ${brandsOpen ? "active" : ""}`}
              onClick={() => {
                selectedBrands[0].id === product.selectedBrand.id
                  ? product.setSelectedBrand("")
                  : product.setSelectedBrand(selectedBrands[0]);
              }}
            >
              <div
                className="brand-radio-button"
                style={{
                  backgroundColor:
                    selectedBrands[0].id === product.selectedBrand.id
                      ? "var(--blue)"
                      : "white",
                }}
              ></div>

              {selectedBrands[0].name}
            </li>


            <li
              className={`short-brand-list-item ${brandsOpen ? "active" : ""}`}
              onClick={() => {
                selectedBrands[1].id === product.selectedBrand.id
                  ? product.setSelectedBrand("")
                  : product.setSelectedBrand(selectedBrands[1]);
              }}
            >
              <div
                className="brand-radio-button"
                style={{
                  backgroundColor:
                    selectedBrands[1].id === product.selectedBrand.id
                      ? "var(--blue)"
                      : "white",
                }}
              ></div>

              {selectedBrands[1].name}
            </li>


            <li
              className={`short-brand-list-item ${brandsOpen ? "active" : ""}`}
              onClick={() => {
                selectedBrands[2].id === product.selectedBrand.id
                  ? product.setSelectedBrand("")
                  : product.setSelectedBrand(selectedBrands[2]);
              }}
            >
              <div
                className="brand-radio-button"
                style={{
                  backgroundColor:
                    selectedBrands[2].id === product.selectedBrand.id
                      ? "var(--blue)"
                      : "white",
                }}
              ></div>

              {selectedBrands[2].name}
            </li>


            <li
              className={`short-brand-list-item ${brandsOpen ? "active" : ""}`}
              onClick={() => {
                selectedBrands[3].id === product.selectedBrand.id
                  ? product.setSelectedBrand("")
                  : product.setSelectedBrand(selectedBrands[3]);
              }}
            >
              <div
                className="brand-radio-button"
                style={{
                  backgroundColor:
                    selectedBrands[3].id === product.selectedBrand.id
                      ? "var(--blue)"
                      : "white",
                }}
              ></div>

              {selectedBrands[3].name}
            </li>


            <li
              className={`short-brand-list-item ${brandsOpen ? "active" : ""}`}
              onClick={() => {
                selectedBrands[4].id === product.selectedBrand.id
                  ? product.setSelectedBrand("")
                  : product.setSelectedBrand(selectedBrands[4]);
              }}
            >
              <div
                className="brand-radio-button"
                style={{
                  backgroundColor:
                    selectedBrands[4].id === product.selectedBrand.id
                      ? "var(--blue)"
                      : "white",
                }}
              ></div>

              {selectedBrands[4].name}
            </li>


            <li
              className={`short-brand-list-item ${brandsOpen ? "active" : ""}`}
              onClick={() => {
                product.setSelectedBrand("")
                setBrandsOpen((!brandsOpen))
              }}
            >
              . . .
            </li>            




            {selectedBrands.map((brand) => (
              <li
                className={`full-brand-list-item ${brandsOpen ? "" : "active"}`}
                onClick={() => {
                  brand.id === product.selectedBrand.id
                    ? product.setSelectedBrand("")
                    : product.setSelectedBrand(brand);
                }}
                key={brand.id}
              >
                <div
                  className="brand-radio-button"
                  style={{
                    backgroundColor:
                      brand.id === product.selectedBrand.id
                        ? "var(--blue)"
                        : "white",
                  }}
                ></div>

                {brand.name}
              </li>
            ))}
          </ul>
        </div>
      );

    }

    
})

export default BrandsContainer