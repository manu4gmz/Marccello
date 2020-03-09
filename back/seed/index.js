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
	},
	{
		name: "Helado Gris",
		description: "No tenemos idea de que gusto es, pero su color es gris.",
		stock: 100,
		imgURL: "https://s3-media1.fl.yelpcdn.com/bpimgs/MOBs0MgCp8hsWmUyeDSayg/ms.jpg",
		visible: true,
		price: 17
	},
	{
		name: "Una bocha de helado",
		description: "Sólo una bocha de helado. Sin cono. Sin pote. Sólo la bocha",
		stock: 100,
		imgURL: "https://cdn.shopify.com/s/files/1/0092/2815/7033/files/Best_Sellers_Collage_Coffee_5_300x300.jpg?v=1578589575",
		visible: true,
		price: 2
	},
	{
		name: "2 bowls de helado",
		description: "ADVERTENCIA: los bowls se venden por separado",
		stock: 100,
		imgURL: "https://www.nestleusa.com/sites/g/files/pydnoa536/files/dreyers-button-2019.jpg",
		visible: true,
		price: 15
	},
	{
		name: "Tramontana SIN dulce de leche",
		description: "¿Quién fue el sádico que inventó esto?",
		stock: 100,
		imgURL: "https://www.nestleusa.com/sites/g/files/pydnoa536/files/haagen-dazs-button-2019.jpg",
		visible: true,
		price: 20
	},
	{
		name: "Helado con Brownies y dulce de leche",
		description: "No se me ocurre ninguna descripción ingeniosa.",
		stock: 100,
		imgURL: "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/fae3502166724b28bda94bae54b3e1d7/BFV21242_Ice_Cream_4_Ways_FB.jpg",
		visible: true,
		price: 20
	},
	{
		name: "Un bowl gigante de helado de vainilla",
		description: "Para ahogar todas tus penas en él.",
		stock: 100,
		imgURL: "https://www.williams-sonoma.com/wsimgs/ab/images/dp/recipe/201943/0060/img17l.jpg",
		visible: true,
		price: 5.3
	},
	{
		name: "Postre helado de Oreo",
		description: "Armar este seed me esta dando mucha hambre.",
		stock: 100,
		imgURL: "https://pbs.twimg.com/media/Co5z5HyWYAA1eaD.jpg:large",
		visible: true,
		price: 11.11
	},
	{
		name: "Postre helado de Bailey's",
		description: "Para ahogar tus penas en helado Y en alcohol.",
		stock: 100,
		imgURL: "https://content-recetas.lecturas.com/medio/2018/07/20/paso-a-paso-para-realizar-minipostre-de-tres-chocolates-y-vasitos-de-baileys-y-chocolate-resultado-final_2b0d12c5_800x800.jpg",
		visible: true,
		price: 40
	},
])

const userCreate = 
User.destroy({where: {email: "admin@mail.com"}})
.then(_=>
	User.create({
		email: "admin@mail.com",
		username: "Admin",
		password: "123",
		type: "superAdmin"
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
})
/*

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
	)

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