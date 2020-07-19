const foodItem = require('../models/foodItem');
const mongoose = require('mongoose');

const router = require('express').Router();

class FoodItemController {
    constructor(){
        router.get('/', (req, res) => {
            this.foodItemGetAllRecords(req, res);
        });

        router.get('/:foodItemId', (req, res) => {
            this.getfoodItemWithId(req, res);
        });

        router.post('/', (req, res) => {
            this.createfoodItem(req, res);
        });

        router.delete('/:foodItemId', (req, res) => {
            this.deletefoodItem(req, res);
        });
    }

    // fetch all food items
     foodItemGetAllRecords(req, res) {
         FoodItem.find().select('name id foodtype rate description category')
            .exec()
            .then(docs => {
                res.status(200).json(
                {
                    count: docs.length,
                    FoodItem: docs.map(doc => {
                        return {
                             name: doc.name,
                            id: doc.id,
                            foodtype: doc.foodtype,
                            rate: doc.rate,
                            description: doc.description,
                            category: doc.category,
                           
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

     // Adding new foodiem to the database
     createfoodItem(req, res) {
         const FoodItem = new FoodItem(
        {
            id: mongoose.Types.ObjectId(),
            name: req.body.name,
            foodtype: req.body.foodtype,
            rate: req.body.rate,
            description: req.body.description,
            category: req.body.category								
			
        });
        fooditem
            .save()
            .then(result => {
                console.log(result);
                res.status(201).json(
                {
                    message: 'fooditem stored',
                    createdfooditem: {
                        name: result.name,
                        id: result.id,
                        foodtype: result.foodtype,
                        rate: result.rate,
                        description: result.description,
                        category: result.category				                    },
                   
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
    getfoodItemWithId(req, res) {
        const id = req.params.foodItemId;
        FoodItem.findById(id)
            .select('name id foodtype rate description category')
            .exec()
            .then(doc => {
                console.log("From database", doc);
                if (doc) {
                    res.status(200).json(
                    {
                        fooditem: doc,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/v1/fooditem/'
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
    deletefoodItem(req, res) {
        FoodItem.remove({ id: req.params.foodItemId })
            .exec()
            .then(result => {
                res.status(200).json(
                {
                    message: 'fooditem  Deleted',
                    request: {
                        type: 'POST',
                        url: 'http://localhost:3000/v1/fooditem/',
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
        if (!(self && self.createfoodItemController)) {
            self.createfoodItemController = new FoodItemController();
        }
        return self.createfoodItemController;
    }
}