const user = require('../models/user');
const mongoose = require('mongoose');
const router = require('express').Router();

class UserController {

    constructor() {

            router.get('/', (req, res) => {
                this.userGetAllRecords(req, res);
            });

            router.get('/:userId', (req, res) => {
                this.getUserWithId(req, res);
            });

            router.post('/', (req, res) => {
                this.createUser(req, res);
            });

            router.delete('/:userId', (req, res) => {
                this.deleteUser(req, res);
            });

        }
        // Fetching all records from database
    userGetAllRecords(req, res) {
        user.find().select('username firstName lastName email phone password role home')
            .exec()
            .then(docs => {
                res.status(200).json(
                {
                    count: docs.length,
                    user: docs.map(doc => {
                        return {
                            _id: doc._id,
                            username: doc.username,
                            firstName: doc.firstName,
                            lastName: doc.lastName,
                            email: doc.email,
                            phone: doc.phone,
                            password: doc.password,
                            role: doc.role,
                            home: doc.home							
                            request: 
                            {
                                type: 'GET',
                                url: 'http://localhost:3000/v1/user/'
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

    // Adding new user to the database
    createUser(req, res) {
        const user = new user(
        {
            _id: mongoose.Types.ObjectId(),
            username: req.body.username, 
            firstName: req.body.firstName, 
			lastName: req.body.lastName,
			email: req.body.email,
			phone: req.body.phone,
			password: req.body.password,
			role: req.body.role,
			home: req.body.home									
			
        });
        user
            .save()
            .then(result => {
                console.log(result);
                res.status(201).json(
                {
                    message: 'User stored',
                    createduser: {
                        _id: result._id,                 
						username: result.username, 						
						firstName: result.firstName, 						
						lastName: result.lastName,						
						email: result.email,						
						phone: result.phone,						
						password: result.password,						
						role: result.role,						
						home: result.home				                    },
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/v1/user/' + result._id
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
    getUserWithId(req, res) {
        const id = req.params.userId;
        user.findById(id)
            .select(' _id username firstName lastName email phone password role home')
            .exec()
            .then(doc => {
                console.log("From database", doc);
                if (doc) {
                    res.status(200).json(
                    {
                        user: doc,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/v1/user/'
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
    deleteUser(req, res) {
        user.remove({ _id: req.params.userId })
            .exec()
            .then(result => {
                res.status(200).json(
                {
                    message: 'user  Deleted',
                    request: {
                        type: 'POST',
                        url: 'http://localhost:3000/v1/user/',
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
        if (!(self && self.createUserController)) {
            self.createUserController = new UserController();
        }
        return self.createUserController;
    }
};