const express = require('express');
const products = express.Router();
const cors = require('cors');

const Product = require('../../models/Product');
const cart = require('../../models/Cart');

products.use(cors());

products.post('/create', (req, resp) => {
    const productData = {
        name: req.body.title,
        price: req.body.price,
        info: req.body.info,
        company: req.body.company,
        inCart: false,
        img: req.body.img
    };
    Product.create (productData).then(
        product => {
            resp.json({status: product.name + 'added Sucessfully.'});
        }
    ).catch(
        err => {
            resp.send('error: ' + err)
        }
    )
})

products.get('/get-products', (req, resp) => {
    Product.findAll().then(
        response => {
            resp.send(response);
        }).catch(
            err => {
                resp.send('error : ' +err);
            }
        )   
})

products.post('/add-cart-item', (req, resp) => {
    const cartData = {
        count: req.body.total,
        pid: req.body.id,
        uid: req.body.uid
    };

    cart.Cart.create(cartData).then(
        cart => {
            resp.json({status: cart.cid + 'Added to Cart Sucessfully.'});
        }
    ).catch(
        err => {
            resp.send('error: ' + err)
        }
    );

    Product.update(
        {inCart: true},
        {where: {id: req.body.id}}
    ).then(res => {
        console.log("In Cart Updated");
    }).catch(err => {
        console.log(err);
    }) 
})

products.get('/get-cart-items', (req, resp) => {
    cart.Cart.findAll(
       { where: {
            uid: req.query.uid,
          },
         include: [
             {
                model: Product,
                where: {inCart: true}
             }
            ]
       }
    ).then(
        result => {
            resp.send(result);
        }
    )
})

products.post('/update-cart', (req, resp) => {
    if (req.body.count === 0 || req.body.remove) {
        Product.update({inCart: false},
            {where: {id: req.body.pid}}
        ).then(
            cart.Cart.destroy({
                where: {
                    pid: req.body.pid
                }
            }).then(
                res => {
                    resp.send(res)
                }
            )
        ).catch(err => {console.log(err)})
    } else {
        cart.Cart.update({count: req.body.count},
            {where: {pid: req.body.pid}}    
        ).then(
            res => {
                resp.send(res)
            }
        )
    }
    
})

products.delete('/remove-cart', (req, resp) => {
        cart.Cart.destroy(
            {where: {},
            truncate: true}
        ).then(
            Product.update({inCart: false},
                {where: {inCart: true}}).then(
                    result => resp.send(result)
                )
        ).catch(
            err => resp.send(err)
        )
    }
)

module.exports = products