const express = require("express");
const router = express.Router();

router.use("/products", require("./products"));
router.use("/users", require("./users"));
router.use("/cart", require("./cart"));
router.use("/purchase", require("./purchase"));
router.use("/admin", require("./admin"));

module.exports = router;
