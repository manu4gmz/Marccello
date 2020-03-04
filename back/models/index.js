const db = require("../config/db")

const User = require('./user');
const Flavor = require('./flavor');
const Product = require('./product');
const Review = require('./review');
const Cart = require('./cart')
const Category = require('./category')
const CartProduct = require('./cartProduct')

Review.belongsTo(User);
Review.belongsTo(Product);



Product.belongsToMany(Cart, { through: CartProduct })
Cart.belongsToMany(Product, { through: CartProduct })

Product.belongsToMany(Category, { through: 'product_category' })
Category.belongsToMany(Product, { through: 'product_category' })





module.exports = {
    db,
    Category,
    User,
    Flavor,
    Product,
    Review,
    Cart,
    CartProduct
}









