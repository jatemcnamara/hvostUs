import {$host} from './index'

export const createBrand = async (brand) => {
    const {data} = await $host.post('api/brand', brand)
    return data
}

export const fetchBrands = async () => {
    const {data} = await $host.get('api/brand')
    return data
}



export const fetchAnimals = async () => {
    const {data} = await $host.get('api/type-by-animal')
    return data
}



export const fetchUsages = async () => {
    const {data} = await $host.get('api/type-by-usage')
    return data
}



export const createUsageBrand = async (usageBrand) => {
    const {data} = await $host.post('api/type-usage-brand', usageBrand)
    return data
}

export const fetchUsageBrand = async () => {
    const {data} = await $host.get('api/type-usage-brand')
    return data
}



export const createProduct = async (product) => {
    const {data} = await $host.post('api/product', product)
    return data
}

export const fetchProducts = async (typeByUsageId, brandId, typeByAnimalId, page, limit = 3) => {
    const {data} = await $host.get('api/product', {params: {
        typeByUsageId, brandId, typeByAnimalId, page, limit
    }})
    return data
}

export const fetchOneProduct = async (id) => {
    const {data} = await $host.get('api/product/' + id)
    return data
}



export const createOrder = async (order) => {
    const {data} = await $host.post('api/orders', order)
    return data
}

export const fetchOrders = async () => {
    const {data} = await $host.get('api/orders')
    return data
}

export const updateOrder = async (id) => {
    const {data} = await $host.put(`api/orders/${id}`, id)
    return data
}


export const createOrderedProduct = async (orderedProduct) => {
    const {data} = await $host.post('api/ordered-products', orderedProduct)
    return data
}

export const fetchOrderedProducts = async () => {
    const {data} = await $host.get('api/ordered-products')
    return data
}