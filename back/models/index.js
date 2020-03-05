const db = require("../config/db")

const Purchase = require('./purchase');
const User = require('./user');
const Flavor = require('./flavor');
const Product = require('./product');
const Review = require('./review');
const Order = require('./order')
const ProductPurchase = require('./product_purchase')
const Category = require('./category')



Order.belongsTo(User)

Product.belongsToMany(User, { through: "order" });
User.belongsToMany(Product, { through: "order" });



Product.belongsToMany(Category, { through: 'product_category' })
Category.belongsToMany(Product, { through: 'product_category' })



Review.belongsTo(User);
Review.belongsTo(Product);



//console.log(Object.keys(Purchase));

Purchase.belongsTo(User);

Product.belongsToMany(Purchase, { through: "product_purchase" })
Purchase.belongsToMany(Product, { through: "product_purchase" })


module.exports = {
    db,
    Category,
    User,
    Flavor,
    Product,
    Purchase,
    Review,
    Order,
    ProductPurchase
}









