const Product = require('../models/product.model');

exports.product_create = function(req, res) {
    let product = new Product({
        name: req.body.name,
        price: req.body.price
    });

    product.save(function(err) {
        if (err) {
            return next(err);
        }
        res.send('Product Created successfully')
        console.log(`Product created: ${req.body.name}.`);
    })
};

exports.product_details = function(req, res) {
    console.log('into Details');
    Product.findById(req.params.id, function(err, product) {
        res.send(product);
    })
};

exports.product_update = function(req, res) {
    Product.findByIdAndUpdate(req.params.id, { $set: req.body }, function(err, product) {
        if (err) return next(err);
        res.send('Product udpated.');
    });
};

exports.product_delete = function(req, res) {
    Product.findByIdAndRemove(req.params.id, function(err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};

exports.product_all = function(req, res) {
    console.log('intoFIND!');
    Product.find({}, function(err, product) {
        res.send(product);
    })
};