const {Product} = require("../models");

Product.bulkCreate([
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

Product.findAll()
.then(p => {
	if (p.length) {
		console.log(`Se crearon ${p.length} productos.`);
	}
	else console.error(new Error("Che creo q se cago el seed"))


})
.catch(err => {
	console.error(new Error("Che creo q se cago el seed"))

}) 