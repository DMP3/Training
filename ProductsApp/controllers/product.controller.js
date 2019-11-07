const Product = require('../models/product.model');

exports.product_create = async(req, res) => {
    let product = new Product({
        name: req.body.name,
        price: req.body.price
    });

    await product.save(async(err) => {
        if (err) {
            return next(err);
        }
        await res.send('Product Created successfully')
        console.log(`Product created: ${req.body.name}.`);
    })
};

exports.product_details = async(req, res) => {
    console.log('into Details');
    await Product.findById(req.params.id, async(err, product) => {
        await res.send(product);
    })
};

exports.product_update = async(req, res) => {
    await Product.findByIdAndUpdate(req.params.id, { $set: req.body }, async(err, product) => {
        if (err) return next(err);
        await res.send('Product udpated.');
    });
};

exports.product_delete = async(req, res) => {
    await Product.findByIdAndRemove(req.params.id, async(err) => {
        if (err) return next(err);
        await res.send('Deleted successfully!');
    })
};

exports.product_all = async(req, res) => {
    console.log('intoFIND!');
    await Product.find({}, async(err, product) => {
        await res.send(product);
    })
};