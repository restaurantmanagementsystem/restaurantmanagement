const User = require('../models/user');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const router = require('express').Router();


class LoginController {
    constructor() {   
        router.post('/', async (req, res) => {
            this.doLogin(req, res);
        });
    }
    // Adding new user to the database
        doLogin(req, res){
            try {
                User.findOne({
                    email: req.body.email
                })
                    .exec((err, user) => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }

                        if (!user) {
                            return res.status(404).send({ message: "User Not found." });
                        }

                        if (req.body.password !== user.password) {
                            return res.status(401).send({
                                message: "Invalid Password!"
                            });
                        }
                      
                        res.status(200).send({
                            id: user._id,
                            email: user.email,
                            message: "Login Success!"
                        });
                    });
            } catch (e) {
                console.error('Authenticate => user', e);
                return res.status(400).json({
                    error: e.message ? e.message : e
                });
            }
        }      

        getRouter() {
        return router;
    }
}

//Function which returns single object for all methods
let self = module.exports = {
    create: () => {
        if (!(self && self.createLoginController)) {
            self.createLoginController = new LoginController();
        }
        return self.createLoginController;
    }
};