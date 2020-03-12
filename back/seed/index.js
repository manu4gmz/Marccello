const { Product, User, Order, Purchase, ProductPurchase, Review } = require("../models");

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
		name: "Cono Arcoiris",
		description: "Riquísimo cono de helado que le va a encantar a los más chicos.",
		stock: 100,
		imgURL: "https://images2.minutemediacdn.com/image/upload/c_fill,g_auto,h_1248,w_2220/f_auto,q_auto,w_1100/v1555309295/shape/mentalfloss/35kj35lk3j5_2.png",
		visible: true,
		price: 50
	},
	{
		name: "Rollos Helados tailandeces",
		description: "Delicioso postre helado proveniente de Tailandia. ¡Probalos!",
		stock: 100,
		imgURL: "https://www.innaturale.com/es/wp-content/uploads/2018/07/Rollito-helado-tailande%CC%81s-Thai-Rolled-Ice-Cream.jpg",
		visible: true,
		price: 80
	},
	{
		name: "Vaso Chiquito",
		description: "Vaso pequeño que puede tener 1 o 2 sabores.",
		stock: 100,
		imgURL: "https://i2.wp.com/recipes.csrsugar.com.au/wp-content/uploads/2019/01/Icecream-Cone-Cupcakes-1980x1080.jpg?fit=1980%2C1080&ssl=1",
		visible: true,
		price: 65
	},
	{
		name: "Helado de Cookies",
		description: "Delicioso helado de crema americana con galletitas trituradas.",
		stock: 100,
		imgURL: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimg1.southernliving.timeinc.net%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fstory_card_hero%2Fpublic%2Fimage%2F2019%2F05%2Fmain%2Fcookies-and-cream-ice-cream-0419seo_011.jpg%3Fitok%3Dp9mnC74f",
		visible: true,
		price: 100
	},
	{
		name: "Banana Split",
		description: "Riquísimo postre para compartir.",
		stock: 100,
		imgURL: "https://www.cocinayvino.com/wp-content/uploads/2017/01/54713302_l.jpg",
		visible: true,
		price: 200
	},
	{
		name: "Sundae de Frutos Rojos",
		description: "Animate a este delicioso postre frutal.",
		stock: 100,
		imgURL: "https://truffle-assets.imgix.net/pxqrocxwsjcc_48kYShSrZ6ICwMUMeK8SKe_black-forest-sundaes_landscapeThumbnail_en.png",
		visible: true,
		price: 110
	},
	{
		name: "Sundae de Chocolate",
		description: "Delicioso Sundae de crema americana bañado de chocolate.",
		stock: 100,
		imgURL: "https://truffle-assets.imgix.net/1t1bxm43v4e3_6yx7yySB4QyWK2Qm4W8mgS_sundae-de-banana_landscapeThumbnail_es.jpeg",
		visible: true,
		price: 110
	},
	{
		name: "Milkshake",
		description: "Elegí tu sabor y probá un riquísimo Milkshake",
		stock: 100,
		imgURL: "https://i0.wp.com/bmgator.org/wp-content/uploads/2018/02/bigstock-Delicious-milkshakes-on-wooden-161168270.jpg?resize=768%2C512&ssl=1",
		visible: true,
		price: 90
	},
	{
		name: "Postre de Oreo",
		description: "Riquísimo postre de Oreo!",
		stock: 100,
		imgURL: "https://recetastips.com/wp-content/uploads/2019/09/Helado-de-Galleta-Oreo-2.jpg",
		visible: true,
		price: 10
	},
	{
		name: "Postre Helado de Frutilla",
		description: "Riquísimo postre de Helado de Americana, crema y frutillas.",
		stock: 100,
		imgURL: "https://helados.pro/wp-content/uploads/2019/01/Helado_de_fresa_encabezado.jpg",
		visible: true,
		price: 70
	},
	{
		name: "Brownie con helado",
		description: "Clásico postre que no podés dejar de probar",
		stock: 100,
		imgURL: "https://www.johaprato.com/files/styles/flexslider_full/public/brownie_y_helado.jpg?itok=OuwRViML",
		visible: true,
		price: 50
	},
	{
		name: "1/4 de helado",
		description: "Puede tener hasta 4 sabores.",
		stock: 100,
		imgURL: "https://http2.mlstatic.com/potes-para-helado-de-telgopor-12-kg-pack-100-unidades-D_NQ_NP_577905-MLA25091981361_102016-F.jpg",
		visible: true,
		price: 200
	},
	{
		name: "Kilo de helado",
		description: "Puede tener hasta 4 sabores.",
		stock: 100,
		imgURL: "https://www.yoquiero.com.ar/Img_Productos/Prod_481_1.jpg",
		visible: true,
		price: 300
	},
	{
		name: "2 Kilos de Helado",
		description: "Aprovechá esta súper oferta!",
		stock: 100,
		imgURL: "https://www.somosjujuy.com.ar/wp-content/uploads/2018/11/helader%C3%ADa-ok.jpg",
		visible: true,
		price: 500
	},
	{
		name: "Palito Bombon Helado",
		description: "Riquísimo helado de amaricana cubierto de chocolate",
		stock: 100,
		imgURL: "https://www.cocinayvino.com/wp-content/uploads/2018/03/65862718_ml.jpg",
		visible: true,
		price: 35
	},
	{
		name: "Paleta de Frutilla a la Crema",
		description: "Helado de palito ideal para los más chicos.",
		stock: 100,
		imgURL: "https://lh3.googleusercontent.com/proxy/bi-S_RLMlpnXULScDxANlNFb9MrqOCOVyTB1pR0I2XElPg_c7D9u37U-surf5exnizVPr5F8eUXuloPJTMgoOUY-ZP46O5dX5Ko_ryrhxO4QNFX40Wf_sA",
		visible: true,
		price: 40
	},
	{
		name: "Paletas Frutales al agua",
		description: "Riquísimas paletas con todo el sabor de la fruta.",
		stock: 100,
		imgURL: "https://animalgourmet.com/wp-content/uploads/2019/04/paletas_de_hielo2.jpg",
		visible: true,
		price: 25
	},
	{
		name: "Paleta de Mango y Frambuesa",
		description: "Una paleta frutal con una combinación insuperable de sabor.",
		stock: 100,
		imgURL: "https://www.floatingkitchen.net/wp-content/uploads/2015/07/Tequila-Sunrise-Popsicles-3-748x520.jpg",
		visible: true,
		price: 45
	},
	{
		name: "Paleta de Frutilla",
		description: "Disfrutá todo el sabor de la frutilla con esta paleta.",
		stock: 100,
		imgURL: "https://www.thespruceeats.com/thmb/fjrWI5i5btaVI9DvtH1cKx8nbvQ=/5010x2818/smart/filters:no_upscale()/homemade-strawberry-ice-popsicle-562544109-588b46ab3df78caebcfcc765.jpg",
		visible: true,
		price: 40
	},
	{
		name: "Cono de 3 sabores",
		description: "Disfrutá tus 3 sabores favoritos en un mismo cono.",
		stock: 100,
		imgURL: "https://3ncridad6ai1jg5mt30vexk1-wpengine.netdna-ssl.com/wp-content/uploads/2016/09/italy-ice-cream-2500x1667.jpg",
		visible: true,
		price: 60
	},
])

const userCreate =
	User.destroy({ where: { email: "admin@mail.com" } })
		.then(_ =>
			User.create({
				email: "admin@mail.com",
				username: "Admin",
				password: "123",
				type: "superAdmin"
			})
		)


const reviewsBulkCreate = Review.bulkCreate([
	{
		title: 'Muy rico el helado',
		content: 'Alto helado, papaaaa',
		rating: 5,
		productId: 1
	},
	{
		title: 'Rico, pero tampoco para tanto',
		content: 'El helado esta bien',
		rating: 3,
		productId: 1
	},
	{
		title: 'Muy malo',
		content: 'Malisimo',
		rating: 2,
		productId: 1
	},
	{
		title: 'Alta paleta',
		content: 'Muy rico y muy pintoresca la paleta',
		rating: 5,
		productId: 2
	},
	{
		title: 'Muy buena paleta',
		content: "Mira que he probado paletas en mi vida, pero como esta paleta no hay ninguna",
		rating: 5,
		productId: 2
	},
	{
		title: 'mmmmmmmm',
		content: 'Mneeeeeehhhhhhh',
		rating: 3,
		productId: 2
	},
	{
		title: 'Riquisima',
		content: 'Muy rica y llegaron bolando. Je',
		rating: 4,
		productId: 3
	},
	{
		title: 'Muy Bien',
		content: 'Cumplieron con la entrega y llego rapido',
		rating: 4,
		productId: 4
	},
	{
		title: 'El mejor helado que probe en mi vida',
		content: 'Bueno, tampoco para tanto, je',
		rating: 4,
		productId: 4
	},
	{
		title: 'Bien',
		content: 'Bien',
		rating: 3,
		productId: 5
	},
	{
		title: 'Manso helado',
		content: 'Alto helado, man',
		rating: 5,
		productId: 6
	},
	{
		title: 'Nice gellatto, mate',
		content: 'Love it',
		rating: 4,
		productId: 7
	},
	{
		title: 'No me llego',
		content: 'Vivo en Palermo y, hasta donde yo se, el drone se termino perdiendo en Lanus',
		rating: 1,
		productId: 8
	},
	{
		title: 'Gran helado',
		content: 'enorme',
		rating: 4,
		productId: 9
	},
	{
		title: 'Rapido pero mas o menos',
		content: 'La entrega fue rapidisima, me llego a la ventana de mi cuarto, pero el gusto me parecio medio flojo',
		rating: 3,
		productId: 16
	}, {
		title: 'Espectacular',
		content: 'Divino',
		rating: 5,
		productId: 15
	}, {
		title: 'De puta madre',
		content: 'Quiero comer este helado todos los dias de mi vida',
		rating: 5,
		productId: 14
	}, {
		title: 'Terrible, me llego todo derretido',
		content: 'Horrible',
		rating: 1,
		productId: 13
	}, {
		title: 'Piolisimo helado',
		content: 'Muy pero demasiado piola',
		rating: 5,
		productId: 12
	}, {
		title: 'Bien',
		content: 'Bueno',
		rating: 3,
		productId: 11
	}, {
		title: 'Rico',
		content: 'Sin comentarios',
		rating: 3,
		productId: 10
	}

])






let _user = null;
let _products = null;
let _reviews = null;

Promise.all([productBulkCreate, userCreate, reviewsBulkCreate])
	.then(([products, user, reviews]) => {
		products.forEach(logProduct)
		//logUser(user)

		_user = user;
		_products = products;
		_reviews = reviews

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