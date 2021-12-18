const express = require('express');
const app = express();

const productRoute = express.Router();
let ProductsCollection = require('../collections/product.model');

// Add Product
productRoute.route('/add-product').post((req, res, next) => {
    ProductsCollection.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// Get all Product
productRoute.route('/').get((req, res) => {
    ProductsCollection.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Get Product
productRoute.route('/read-product/:id').get((req, res) => {
    ProductsCollection.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})


// Update Product
productRoute.route('/update-product/:id').put((req, res, next) => {
    ProductsCollection.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('Product updated successfully!')
        }
    })
})

// Delete Product
productRoute.route('/delete-product/:id').delete((req, res, next) => {
    ProductsCollection.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

// Find Product
productRoute.route('/find-product/:id').get((req, res, next) => {
    if (req.params.id !== 'all') {
        ProductsCollection.find({ firstName: req.params.id }, (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.status(200).json({
                    msg: data
                })
            }
        })
    } else {
        ProductsCollection.find({ }, (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.status(200).json({
                    msg: data
                })
            }
        })
    }
})

module.exports = productRoute;