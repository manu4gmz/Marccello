const express = require("express");
const router = express.Router();
const Promise = require("bluebird");
const { startDrone } = require("../drone");
//const passport = require("passport");

const {
	User,
	Product,
	Purchase,
	ProductPurchase,
	Order
} = require("../models");

function isAdmin(req, res, next) {
	if (req.isAuthenticated() && (req.user.type == "admin" || req.user.type == "superAdmin")) next();
	else res.status(401).send({ msg: "Flasheaste man" })
}

router.use("/", isAdmin);

function isSuperAdmin(req, res, next) {
	if (req.isAuthenticated() && (req.user.type == "superAdmin")) next();
	else res.status(401).send({ msg: "Flasheaste man, solo capos" })
}

router.post("/orders/:id/send", (req, res) => {
	Purchase.findOne({
		where: {
			id: req.params.id,
			status : "preparing"
		}
	})
		.then(purchase => {
			purchase.status = "ongoing";
			purchase.coords = req.body.coords;
			purchase.save()
				.then(() => {
					startDrone(purchase.id, req.body.coords);
					res.send({ msg: "Drone sent" })
				})
		})
})


router.get("/orders/:id", (req, res) => {
	console.log(req.params.id, typeof req.params.id)
	Purchase.findOne({
		where: {
			id: req.params.id,
			status: "preparing"
		},
		include: [
			{
				model: Product
			},
			{
				model: User
			}
		]
	})
		.then(order => res.send(order))
})

router.get("/orders", (req, res) => {
	Purchase.findAll({
		where: {
			status: "preparing"
		},
		include: [
			{
				model: Product
			}
		]
	})
		.then(purchases => {
			res.send(purchases);
		})
})


router.post('/create-product', function (req, res, next) {
	Product.create(req.body)
		.then(nuevoProducto => res.status(201).json(nuevoProducto))
		.catch(next)
});



module.exports = router;