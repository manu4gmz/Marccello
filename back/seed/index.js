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
	},
	{
		name: "Cono Abstracto",
		description: "UN MONTÓN DE ABSTRACCIÓN DE SABOR.",
		stock: 100,
		imgURL: "https://www.rocktails.tv/wp-content/uploads/edd/ice-cream-party.jpg",
		visible: true,
		price: 9.99
	},
	{
		name: "Helado rico",
		description: "Esta re rico, te juro",
		stock: 100,
		imgURL: "https://www.hola.com/imagenes/cocina/recetas/2013042264513/helado-vainilla-dulce-leche/0-234-424/helado-vainilla-1-m.jpg",
		visible: true,
		price: 20.3
	},
	{
		name: "Paletas bañadas de Chocolate",
		description: "Paletas bañadas con chocolante blanco y negro.",
		stock: 100,
		imgURL: "https://hungryhappenings.com/wp-content/uploads/2019/09/cakesicles-recipe-cake-pops-popsicles-2.jpg",
		visible: true,
		price: 10
	},
	{
		name: "Sundae de Chocolate",
		description: "Delicioso Sundae de crema americana bañado de chocolate.",
		stock: 100,
		imgURL: "https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/1080/1080/75/dam/disney-springs/dining/vivoli-il-gelato/vivoli-sundae-1x1.jpg?1573230499054",
		visible: true,
		price: 18.2
	},
	{
		name: "Render 3D de un Conogol",
		description: "Saborea las 3 dimensiones con este delicioso render de un helado",
		stock: 100,
		imgURL: "https://netrinoimages.s3.eu-west-2.amazonaws.com/2018/04/04/507221/189987/ice_cream_cone_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_2014745_o.jpg",
		visible: true,
		price: 17
	},
	{
		name: "Conogol que no es un render",
		description: "Como dice su nombre, este helado no es un render.",
		stock: 100,
		imgURL: "https://cdn11.bigcommerce.com/s-p4v5wfxev4/images/stencil/1280x1280/products/859/2564/952745_vanilla_cone_product_packshot-1243141-png__36921.1539108775.png?c=2?imbypass=on",
		visible: true,
		price: 10
	},
	{
		name: "Cucurucho de 3 sabores",
		description: "Viene con chocolate, vainilla y frutilla. Y nada más >:(",
		stock: 100,
		imgURL: "https://dijf55il5e0d1.cloudfront.net/images/na/6/9/2/69287_1000.jpg",
		visible: true,
		price: 11
	},
	{
		name: "Kilo de helado",
		description: "mmmmmmmmmm... helado...",
		stock: 100,
		imgURL: "https://http2.mlstatic.com/helado-artesanal-por-mayor-x-baldes-p-heladerias-y-restos-D_NQ_NP_660132-MLA31412095474_072019-F.jpg",
		visible: true,
		price: 50
	},
	{
		name: "Helado Fancy",
		description: "No es muy rico, pero es caro.",
		stock: 100,
		imgURL: "https://content-recetas.lecturas.com/medio/2018/11/23/copa_de_helado_con_flan_49ae06de_800x800.jpg",
		visible: true,
		price: 200
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