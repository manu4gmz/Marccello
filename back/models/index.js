const User = require('./user');
const Flavor = require('./flavor');
const Product = require('./product');
const Purchase = require('./purchase');
const Review = require('./review');
const Cart = require('./cart')

Product.belongsToMany(Purchase, { through: 'sales', foreignKey: 'purchaseId' });
Purchase.belongsToMany(Product, { through: 'sales', foreignKey: 'productId' });
Purchase.belongsTo(User);
Review.belongsTo(User);
Review.belongsTo(Product);
Cart.belongsTo(User)




module.exports = {
    User,
    Flavor,
    Product,
    Purchase,
    Review
}









