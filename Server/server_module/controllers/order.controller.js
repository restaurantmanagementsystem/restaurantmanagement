const Order = require('../models/order');
const mongoose = require('mongoose');

const router = require('express').Router();

class OrderController {
    constructor(){
        router.get('/', (req, res) => {
            this.orderGetAllRecords(req, res);
        });

        router.get('/:orderId', (req, res) => {
            this.getOrderWithId(req, res);
        });

        router.post('/', (req, res) => {
            this.createOrder(req, res);
        });

        router.delete('/:orderId', (req, res) => {
            this.deleteOrder(req, res);
        });
    }

    // fetch all orders
     orderGetAllRecords(req, res) {
        Order.find().select('orderId status custName custPhno tableNo totalPrice quantity orderItemId')
            .exec()
            .then(docs => {
                res.status(200).json(
                {
                    count: docs.length,
                    Order: docs.map(doc => {
                        return {
                             orderId: doc.orderId,
                            status: doc.status,
                            custName: doc.custName,
                            custPhno: doc.custPhno,
                            tableNo: doc.tableNo,
                            totalPrice: doc.totalPrice,
                            quantity: doc.quantity,
                            orderItemId: doc.orderItemId,
                        }
                    })
                });
            })
            .catch(err => {
                res.status(500).json(
                {
                    error: err
                });
            })
    }

     // Adding new order to the database
     createOrder(req, res) {
        const order = new Order(
        {
            orderId: mongoose.Types.ObjectId(),
            status: req.body.status,
            custName: req.body.custName,
            custPhno: req.body.custPhno,
            tableNo: req.body.tableNo,
            totalPrice: req.body.totalPrice,
            quantity: req.body.quantity,
            orderItemId: req.body.orderItemId						
			
        });
        order
            .save()
            .then(result => {
                console.log(result);
                res.status(201).json(
                {
                    message: 'order stored',
                    createdorder: {
                        orderId: mongoose.Types.ObjectId(),
                        status: result.status,
                        custName: result.custName,
                        custPhno: result.custPhno,
                        tableNo: result.tableNo,
                        totalPrice: result.totalPrice,
                        quantity: result.quantity,
                        orderItemId: result.orderItemId				                    },
    
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(
                {
                    error: err
                });
            });
    }

    // Fetching all records from database with particular ID
    getOrderWithId(req, res) {
        const id = req.params.orderId;
        Order.findById(id)
            .select('orderId status custName custPhno tableNo totalPrice quantity orderItemId')
            .exec()
            .then(doc => {
                console.log("From database", doc);
                if (doc) {
                    res.status(200).json(
                    {
                        order: doc,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/v1/order/'
                        }
                    });
                } else {
                    res.status(404).json({ message: 'No Valid entry found for provided ID' })
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: err })
            });
    }

    // Removing particular data from database
    deleteOrder(req, res) {
        Order.remove({ id: req.params.orderId })
            .exec()
            .then(result => {
                res.status(200).json(
                {
                    message: 'order  Deleted',
                    request: {
                        type: 'POST',
                        url: 'http://localhost:3000/v1/order/',
                        body: { name: 'String', code: 'String' }
                    }
                })
            })
            .catch(err => {
                res.status(500).json(
                {
                    error: err
                });
            });
    }

    getRouter() {
        return router;
    }
}

//Function which returns single object for all methods
let self = module.exports = {
    create: () => {
        if (!(self && self.createOrderController)) {
            self.createOrderController = new OrderController();
        }
        return self.createOrderController;
    }
}