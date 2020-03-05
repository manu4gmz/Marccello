const {Product, User, Order, Purchase, ProductPurchase} = require("../models");

const Promise = require("bluebird");

const logProduct = (cart) => console.log("Cart: ", { name: cart.name })
const logUser = (user) => console.log("User: ", 
	{ 
		username: user.username, 
		email: user.email,
		products: user.products.map(product => (
			{
				name: product.name,
				amount: product.order.amount
			}
		))
	
	})
const logOrder = (order) => console.log("Order: ", { productId: order.productId, userId: order.userId, amount: order.amount })


const productBulkCreate = Product.bulkCreate([
	{
		name: "Paleta Tricolor",
		description: "Paleta con bocha de colores esta buenisima viene con extra azúcar.",
		stock: 100,
		imgURL: "https://http2.mlstatic.com/colchoneta-inflable-intex-paleta-helado-191x76-cm-pileta-cuo-D_NQ_NP_711234-MLA28773620570_112018-O.webp",
		visible: true,
		price: 8.2
	},
	{
		name: "Palito bombon helado",
		description: "PALITO BONBON HELADDOOOOOOOOOOOOOOOOO PALITO BONBON HELADOOOOOO",
		stock: 100,
		imgURL: "https://comercios.tiendakosher.com//Content/UploadDirectory/Products/23834/c10321bf-0170-422f-8d23-94509443b713.jpg",
		visible: true,
		price: 12.1
	},
	{
		name: "Palitos frutilla",
		description: "Paleta con bocha de colores esta buenisima viene con extra azúcar.",
		stock: 100,
		imgURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRHDAnlafrAwCFIPiWe72iwzYeyps15yHaTqKIh_-PTqFk2qkar",
		visible: true,
		price: 10
	}
])

const userCreate = 
User.destroy({where: {email: "pepe@crack.com"}})
.then(_=>
	User.create({
		email: "pepe@crack.com",
		username: "Pepe Capo",
		password: "ndeah"
	})
)

let _user = null;
let _products = null;

Promise.all([ productBulkCreate, userCreate])
.then(([products, user])=> {
	products.forEach(logProduct)
	//logUser(user)

	_user = user;
	_products = products;

	const ordersMap = [
		{
			userId: user.id,
			productId: 1
		},
		{
			userId: user.id,
			productId: 2
		}
	]

	/*products.map(product => 
		({
			userId: user.id,
			productId: product.id
		})
	)*/

	return Order.bulkCreate(ordersMap);
})
.then(orders => orders.forEach(logOrder))
.then(_=> {
	return _user.getCart();
})
.then(logUser)
.then(_ => {
	return Purchase.create({
		userId: _user.id,
		total: 1000
	})
	.then(purchase => {
		return ProductPurchase.create({
			productId: _products[0].id,
			buyId: purchase.id
		})
		.then(productPurchase => purchase);
	})
})
.then(purchase => {
	_user.getHistory()
	.then(data => console.log(data.map(a => a.products.forEach(logProduct))))
} )

/*
Product.findAll()
.then(p => {
	if (p.length) {
		console.log(`Se crearon ${p.length} productos.`);
	}
	else console.error(new Error("Che creo q se cago el seed"))


})
.catch(err => {
	console.error(new Error("Che creo q se cago el seed"))

}) */


/****************

(con user.getCart())

USER: {
	username: ...
	email: ...
	password: ...
	products: [
		{
			name: ...
			order: {
				amount: ...
				createdAt: ...
			}
		},
		{
			name: ...
			order: {
				amount: ...
				createdAt: ...
			}
		},
		{
			name: ...
			order: {
				amount: ...
				createdAt: ...
			}
		}
	]
}

****************/