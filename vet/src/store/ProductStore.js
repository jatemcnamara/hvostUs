import {makeAutoObservable} from 'mobx'

const productsInStorage = localStorage.getItem('cart')
var productsCart = JSON.parse(productsInStorage)

export default class ProductStore {
    
    constructor(){
        this._animals = []
        this._usages = []
        this._brands = []
        this._products = []
        this._allProducts = []

        this._page = 1
        this._totalCount = 0
        this._limit = 3
        this._productsInCart = productsCart.length

        this._usageBrandsId = []

        this._productsInOrder = []

        this._selectedBrand = {}
        this._selectedAnimal = {}
        this._selectedUsage = {}
        makeAutoObservable(this)
    }

    setAnimals(animals){
        this._animals = animals
    }
    setUsages(usages){
        this._usages = usages
    }
    setBrands(brands){
        this._brands = brands
    }
    setProducts(products){
        this._products = products
    }
    setAllProducts(allProducts){
        this._allProducts = allProducts
    }
    setPage(page){
        this._page = page
    }
    setTotalCount(count){
        this._totalCount = count
    }
    setUsageBrandsId(usageBrandsId){
        this._usageBrandsId = usageBrandsId
    }
    setProductsInCart(productsInCart){
        this._productsInCart = productsInCart
    }
    
    setProductsInOrder(productsInOrder){
        this._productsInOrder = productsInOrder
    }
    addProductToOrder(productInOrder){
        this._productsInOrder.push(productInOrder)
    }


    setSelectedBrand(brand){
        this.setPage(1)
        this._selectedBrand = brand
    }
    setSelectedAnimal(animal){
        this.setPage(1)
        this._selectedAnimal = animal
    }
    setSelectedUsage(usage){
        this.setPage(1)
        this._selectedUsage = usage
    }


    get animals(){
        return this._animals
    }
    get usages(){
        return this._usages
    }
    get brands(){
        return this._brands
    }
    get products(){
        return this._products
    }
    get allProducts(){
        return this._allProducts
    }
    get page(){
        return this._page
    }
    get totalCount(){
        return this._totalCount
    }
    get limit(){
        return this._limit
    }
    get usageBrandsId(){
        return this._usageBrandsId
    }
    get productsInCart(){
        return this._productsInCart
    }

    get productsInOrder(){
        return this._productsInOrder
    }


    get selectedBrand(){
        return this._selectedBrand
    }
    get selectedAnimal(){
        return this._selectedAnimal
    }
    get selectedUsage(){
        return this._selectedUsage
    }
}