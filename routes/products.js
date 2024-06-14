// routes/products.js
const express = require('express');
const Products = require('../models/Products');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const products = await Products.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, price, quantity } = req.body;
        console.log(req.body)
        const existingProduct = await Products.findOne({ name });
        if (existingProduct) {
            return res.status(400).send('Products already exists');
        }
        const product = new Products({ name, price, quantity });
        await product.save();
        res.status(201).send('Products added');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
