const { User, Cart, Product, CartProduct } = require("./models");

// User.findOrCreate({ where: { username: "Pepe", password: "tuvieja", email: "paratdemanos@gato.com", address: 'esta' } })
//     .then(data => console.log(data))

// Product.bulkCreate([
//     {
//         name: "Paleta Tricolor",
//         description: "Paleta con bocha de colores esta buenisima viene con extra azúcar.",
//         stock: 100,
//         imgURL: "https://http2.mlstatic.com/colchoneta-inflable-intex-paleta-helado-191x76-cm-pileta-cuo-D_NQ_NP_711234-MLA28773620570_112018-O.webp",
//         visible: true,
//         price: 8
//     },
//     {
//         name: "Palito bombon helado",
//         description: "PALITO BONBON HELADDOOOOOOOOOOOOOOOOO PALITO BONBON HELADOOOOOO",
//         stock: 100,
//         imgURL: "https://comercios.tiendakosher.com//Content/UploadDirectory/Products/23834/c10321bf-0170-422f-8d23-94509443b713.jpg",
//         visible: true,
//         price: 12
//     },
//     {
//         name: "Palitos frutilla",
//         description: "Paleta con bocha de colores esta buenisima viene con extra azúcar.",
//         stock: 100,
//         imgURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRHDAnlafrAwCFIPiWe72iwzYeyps15yHaTqKIh_-PTqFk2qkar",
//         visible: true,
//         price: 10
//     }
// ])

// Product.findAll()
//     .then(data => console.log('los helados', data))

Cart.create({})
    .then(cart => {
        const cp = CartProduct.build({
            cartId: cart.id,
            productId: 1
        })
        cp.save();
        cart.userId = 1;
        cart.save()
        let hola = cart.increment()
        console.log(hola)
    })