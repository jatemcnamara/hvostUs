const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Product = sequelize.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    description: {type: DataTypes.STRING(2000), allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false}
}); 

const TypeByAnimal = sequelize.define('type_by_animal', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
}); 

const TypeByUsage = sequelize.define('type_by_usage', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false}
}); 

const Brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
}); 

const ProductInfo = sequelize.define('product_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false}
}); 

const Cart = sequelize.define('cart', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
}); 

const CartProduct = sequelize.define('cart_product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
}); 

const TypeAnimalUsage = sequelize.define('type_animal_usage', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
}); 

const TypeUsageBrand = sequelize.define('type_usage_brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
}); 

const Order = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    identifier: {type: DataTypes.STRING, allowNull: false},
    status: {type: DataTypes.STRING, allowNull: false},
    user_name: {type: DataTypes.STRING, allowNull: false},
    user_surname: {type: DataTypes.STRING, allowNull: false},
    user_phone: {type: DataTypes.STRING, allowNull: false},
    user_email: {type: DataTypes.STRING, allowNull: false},
    to_call: {type: DataTypes.BOOLEAN, allowNull: false},
    shipment: {type: DataTypes.STRING, allowNull: false},
    payment: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING(500), allowNull: true}
});

const OrderedProduct = sequelize.define('ordered_product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    quantity: {type: DataTypes.INTEGER, allowNull: false}
}); 



 Product.hasMany(ProductInfo, {as: 'info'})
 ProductInfo.belongsTo(Product)

 Cart.hasMany(CartProduct)
 CartProduct.belongsTo(Cart)

 Product.hasMany(CartProduct)
 CartProduct.belongsTo(Product)

 TypeByAnimal.hasMany(Product)
 Product.belongsTo(TypeByAnimal)

 TypeByUsage.hasMany(Product)
 Product.belongsTo(TypeByUsage)

 Brand.hasMany(Product)
 Product.belongsTo(Brand)


 Brand.belongsToMany(TypeByUsage, {through: TypeUsageBrand})
 TypeByUsage.belongsToMany(Brand, {through: TypeUsageBrand})

 TypeByAnimal.belongsToMany(TypeByUsage, {through: TypeAnimalUsage})
 TypeByUsage.belongsToMany(TypeByAnimal, {through: TypeAnimalUsage})

 Order.belongsToMany(Product, {through: OrderedProduct})
 Product.belongsToMany(Order, {through: OrderedProduct})

 module.exports = {
     Product,
     TypeByAnimal,
     TypeByUsage,
     Brand,
     ProductInfo,
     Cart,
     CartProduct,
     TypeAnimalUsage,
     TypeUsageBrand,
     Order,
     OrderedProduct
 }