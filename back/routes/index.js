const express = require('express');
const router = express.Router()

router.use('/product', require('./product'));
router.use('/users', require('./users'));

module.exports = router