const orderitem = require('../modules/orderItem');
const mongoose = require('mongoose');

const router = require('express').Router();

class OrderItemController {
    constructor(){
        router.get('/', (req, res) => {
            this.orderItemGetAllRecords(req, res);
        });

        router.get('/:orderItemId', (req, res) => {
            this.getOrderItemWithId(req, res);
        });

        router.post('/', (req, res) => {
            this.createOrderItem(req, res);
        });

        router.delete('/:orderItemId', (req, res) => {
            this.deleteOrderItem(req, res);
        });
    }

    // fetch all order items
     orderItemGetAllRecords(req, res) {
        orderitem.find().select('name id foodtype rate description category')
            .exec()
            .then(docs => {
                res.status(200).json(
                {
                    count: docs.length,
                    orderitem: docs.map(doc => {
                        return {
                             name: doc.name,
                            id: doc.id,
                            foodtype: doc.foodtype,
                            rate: doc.rate,
                            description: doc.description,
                            category: doc.category,
                            request: 
                            {
                                type: 'GET',
                                url: 'http://localhost:3000/v1/orderitem/'
                            }
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

     // Adding new orderiem to the database
     createOrderItem(req, res) {
        const orderitem = new orderitem(
        {
            id: mongoose.Types.ObjectId(),
            name: req.body.name,
            foodtype: req.body.foodtype,
            rate: req.body.rate,
            description: req.body.description,
            category: req.body.category								
			
        });
        orderitem
            .save()
            .then(result => {
                console.log(result);
                res.status(201).json(
                {
                    message: 'orderitem stored',
                    createdorderitem: {
                        name: result.name,
                        id: result.id,
                        foodtype: result.foodtype,
                        rate: result.rate,
                        description: result.description,
                        category: result.category				                    },
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/v1/orderitem/' + result.id
                    }
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
    getOrderItemWithId(req, res) {
        const id = req.params.orderItemId;
        user.findById(id)
            .select('name id foodtype rate description category')
            .exec()
            .then(doc => {
                console.log("From database", doc);
                if (doc) {
                    res.status(200).json(
                    {
                        orderitem: doc,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/v1/orderitem/'
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
    deleteOrderItem(req, res) {
        user.remove({ id: req.params.orderItemId })
            .exec()
            .then(result => {
                res.status(200).json(
                {
                    message: 'orderitem  Deleted',
                    request: {
                        type: 'POST',
                        url: 'http://localhost:3000/v1/orderitem/',
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
        if (!(self && self.createOrderItemController)) {
            self.createOrderItemController = new OrderItemController();
        }
        return self.createOrderItemController;
    }
}