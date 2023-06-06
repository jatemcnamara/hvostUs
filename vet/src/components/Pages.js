import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Context } from "../index"
import '../css/Pages.css'

const Pages = observer((props) => {

    const {product} = useContext(Context)

    if (props.pageCount){
      var pageCount = props.pageCount
    }
    else{
      var pageCount = Math.ceil(product.totalCount / product.limit)
    }
    
    const pages = []

    for (let i = 0; i < pageCount; i++){
        pages.push(i + 1)
    }

    if (props.matchesLength > 0){
      if(pages.length < 7){
        return (
            <div className='pages-container'>
                {pages.map(page =>
                    <div 
                        className='page-number'
                        key={page}
                        style={{backgroundColor: product.page === page ? 'var(--yellow)' : 'white'}}
                        onClick={() => {
                          window.scrollTo(0, 200)
                          product.setPage(page)
                        }}
                    >
                        {page}
                    </div>    
                )}
            </div>
        )
    }
    else{
        if(product.page === 1){
            return (
              <div className="pages-container">
                <div
                  className="page-number"
                  style={{
                    backgroundColor:
                      product.page === 1 ? "var(--yellow)" : "white",
                  }}
                  onClick={() => {
                    window.scrollTo(0, 200)
                    product.setPage(1)
                  }}
                >
                  {pages[0]}
                </div>
                
                <div
                  className="page-number"
                  style={{
                    backgroundColor: "white"
                  }}
                  onClick={() => {
                    window.scrollTo(0, 200)
                    product.setPage(2)
                  }}
                >
                  {pages[1]}
                </div>
    
                <div
                  className="page-number"
                  style={{
                    backgroundColor: "white"
                  }}
                  onClick={() => {
                    window.scrollTo(0, 200)
                    product.setPage(3)
                  }}
                >
                  {pages[2]}
                </div>
    
                <p>. . .</p>
    
    
                <div
                  className="page-number"
                  style={{
                    backgroundColor: "white"
                  }}
                  onClick={() => {
                    window.scrollTo(0, 200)
                    product.setPage(pages.length)
                  }}
                >
                  {pages[pages.length - 1]}
                </div>
              </div>
            );
        }

        else if(product.page === 2){
            return (
              <div className="pages-container">
                <div
                  className="page-number"
                  style={{
                    backgroundColor: "white"
                  }}
                  onClick={() => {
                    window.scrollTo(0, 200)
                    product.setPage(1)
                  }}
                >
                  {pages[0]}
                </div>
                
                <div
                  className="page-number"
                  style={{
                    backgroundColor: product.page === 2 ? "var(--yellow)" : "white"
                  }}
                  onClick={() => {
                    window.scrollTo(0, 200)
                    product.setPage(2)
                  }}
                >
                  {pages[1]}
                </div>
    
                <div
                  className="page-number"
                  style={{
                    backgroundColor: "white"
                  }}
                  onClick={() => {
                    window.scrollTo(0, 200)
                    product.setPage(3)
                  }}
                >
                  {pages[2]}
                </div>
    
                <p>. . .</p>
    
    
                <div
                  className="page-number"
                  style={{
                    backgroundColor: "white"
                  }}
                  onClick={() => {
                    window.scrollTo(0, 200)
                    product.setPage(pages.length)
                  }}
                >
                  {pages[pages.length - 1]}
                </div>
              </div>
            );
        }

        else if(product.page === 3){
            return (
              <div className="pages-container">
                <div
                  className="page-number"
                  style={{
                    backgroundColor: "white"
                  }}
                  onClick={() => {
                    window.scrollTo(0, 200)
                    product.setPage(1)
                  }}
                >
                  {pages[0]}
                </div>
                
                <div
                  className="page-number"
                  style={{
                    backgroundColor: "white"
                  }}
                  onClick={() => {
                    window.scrollTo(0, 200)
                    product.setPage(2)
                  }}
                >
                  {pages[1]}
                </div>
    
                <div
                  className="page-number"
                  style={{
                    backgroundColor: product.page === 3 ? "var(--yellow)" : "white"
                  }}
                  onClick={() => {
                    window.scrollTo(0, 200)
                    product.setPage(3)
                  }}
                >
                  {pages[2]}
                </div>

                <div
                  className="page-number"
                  style={{
                    backgroundColor: "white"
                  }}
                  onClick={() => {
                    window.scrollTo(0, 200)
                    product.setPage(4)
                  }}
                >
                  {pages[3]}
                </div>
    
                <p>. . .</p>
    
    
                <div
                  className="page-number"
                  style={{
                    backgroundColor: "white"
                  }}
                  onClick={() => {
                    window.scrollTo(0, 200)
                    product.setPage(pages.length)
                  }}
                >
                  {pages[pages.length - 1]}
                </div>
              </div>
            );
        }
    
        else if (product.page === pages.length){
            return (
              <div className="pages-container">
                <div
                  className="page-number"
                  style={{
                    backgroundColor: "white"
                  }}
                  onClick={() => {
                    window.scrollTo(0, 200)
                    product.setPage(1)
                  }}
                >
                  {pages[0]}
                </div>
    
                <p>. . .</p>
    
                <div
                  className="page-number"
                  style={{
                    backgroundColor: "white",
                  }}
                  onClick={() => {
                    window.scrollTo(0, 200)
                    product.setPage(pages.length - 2)
                  }}
                >
                  {pages[pages.length - 3]}
                </div>
    
                <div
                  className="page-number"
                  style={{
                    backgroundColor: "white",
                  }}
                  onClick={() => {
                    window.scrollTo(0, 200)
                    product.setPage(pages.length - 1)
                  }}
                >
                  {pages[pages.length - 2]}
                </div>
    
                <div
                  className="page-number"
                  style={{
                    backgroundColor: product.page === pages.length ? "var(--yellow)" : "white"
                  }}
                  onClick={() => {
                    window.scrollTo(0, 200)
                    product.setPage(pages.length)
                  }}
                >
                  {pages[pages.length - 1]}
                </div>
              </div>
            );
        }
    
        else if (product.page === pages.length - 1){
            return (
              <div className="pages-container">
                <div
                  className="page-number"
                  style={{
                    backgroundColor: "white",
                  }}
                  onClick={() => {
                    window.scrollTo(0, 200)
                    product.setPage(1)
                  }}
                >
                  {pages[0]}
                </div>
    
                <p>. . .</p>
    
                <div
                  className="page-number"
                  style={{
                    backgroundColor: "white",
                  }}
                  onClick={() => {
                    window.scrollTo(0, 200)
                    product.setPage(pages.length - 2)
                  }}
                >
                  {pages[pages.length - 3]}
                </div>
    
                <div
                  className="page-number"
                  style={{
                    backgroundColor:
                      product.page === pages.length - 1 ? "var(--yellow)" : "white",
                  }}
                  onClick={() => {
                    window.scrollTo(0, 200)
                    product.setPage(pages.length - 1)
                  }}
                >
                  {pages[pages.length - 2]}
                </div>
    
                <div
                  className="page-number"
                  style={{
                    backgroundColor: "white",
                  }}
                  onClick={() => {
                    window.scrollTo(0, 200)
                    product.setPage(pages.length)
                  }}
                >
                  {pages[pages.length - 1]}
                </div>
              </div>
            );
        }
    
        else if (product.page === pages.length - 2){
            return (
              <div className="pages-container">
                <div
                  className="page-number"
                  style={{
                    backgroundColor: "white",
                  }}
                  onClick={() => {
                    window.scrollTo(0, 200)
                    product.setPage(1)
                  }}
                >
                  {pages[0]}
                </div>
    
                <p>. . .</p>
    
                <div
                  className="page-number"
                  style={{
                    backgroundColor: "white",
                  }}
                  onClick={() => {
                    window.scrollTo(0, 200)
                    product.setPage(pages.length - 3)
                  }}
                >
                  {pages[pages.length - 4]}
                </div>
    
                <div
                  className="page-number"
                  style={{
                    backgroundColor:
                      product.page === pages.length - 2 ? "var(--yellow)" : "white",
                  }}
                  onClick={() => {
                    window.scrollTo(0, 200)
                    product.setPage(pages.length - 2)
                  }}
                >
                  {pages[pages.length - 3]}
                </div>
    
                <div
                  className="page-number"
                  style={{
                    backgroundColor: "white",
                  }}
                  onClick={() => {
                    window.scrollTo(0, 200)
                    product.setPage(pages.length - 1)
                  }}
                >
                  {pages[pages.length - 2]}
                </div>
    
                <div
                  className="page-number"
                  style={{
                    backgroundColor: "white",
                  }}
                  onClick={() => {
                    window.scrollTo(0, 200)
                    product.setPage(pages.length)
                  }}
                >
                  {pages[pages.length - 1]}
                </div>
              </div>
            )
        }
    
        else {
            return (
              <div className="pages-container">
                <div
                  className="page-number"
                  style={{
                    backgroundColor: "white",
                  }}
                  onClick={() => {
                    window.scrollTo(0, 200)
                    product.setPage(1)
                  }}
                >
                  {pages[0]}
                </div>

                <p>. . .</p>

                <div
                  className="page-number"
                  style={{
                    backgroundColor: "white",
                  }}
                  onClick={() => {
                    window.scrollTo(0, 200)
                    product.setPage(pages[product.page - 2])
                  }}
                >
                  {pages[product.page - 2]}
                </div>

                <div
                  className="page-number"
                  style={{
                    backgroundColor: product.page === pages[product.page - 1] ? "var(--yellow)" : "white"
                  }}
                  onClick={() => {
                    window.scrollTo(0, 200)
                    product.setPage(pages[product.page - 1])
                  }}
                >
                  {pages[product.page - 1]}
                </div>

                <div
                  className="page-number"
                  style={{
                    backgroundColor: "white",
                  }}
                  onClick={() => {
                    window.scrollTo(0, 200)
                    product.setPage(pages[product.page])
                  }}
                >
                  {pages[product.page]}
                </div>


                <p>. . .</p>
    
                <div
                  className="page-number"
                  style={{
                    backgroundColor: "white"
                  }}
                  onClick={() => {
                    window.scrollTo(0, 200)
                    product.setPage(pages.length)
                  }}
                >
                  {pages[pages.length - 1]}
                </div>
              </div>
            );
        }
      }
    }
})

export default Pages