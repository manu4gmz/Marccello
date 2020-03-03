const {Product} = require("../models");

Product.bulkCreate([
	{
		name: "Paleta Tricolor",
		description: "Paleta con bocha de colores esta buenisima viene con extra azúcar.",
		rating: 1.2,
		stock: 100,
		imgURL: "https://http2.mlstatic.com/colchoneta-inflable-intex-paleta-helado-191x76-cm-pileta-cuo-D_NQ_NP_711234-MLA28773620570_112018-O.webp",
		visible: true
	}
])