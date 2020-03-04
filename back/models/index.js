const db = require("../config/db")

const User = require('./user');
const Flavor = require('./flavor');
const Product = require('./product');
const Purchase = require('./purchase');
const Review = require('./review');
const Cart = require('./cart')
const Category = require('./category')

Purchase.belongsTo(User);
Review.belongsTo(User);
Review.belongsTo(Product);
Cart.belongsTo(User)

Product.belongsToMany(Category, { through: 'product_category' })
Category.belongsToMany(Product, { through: 'product_category' })

Product.belongsToMany(Purchase, { through: 'product_purchase' });
Purchase.belongsToMany(Product, { through: 'product_purchase' });



module.exports = {
    db,
    Category,
    User,
    Flavor,
    Product,
    Purchase,
    Review,
    Cart
}









