const User = require('../models/user');
const mongoose = require('mongoose');
const router = require('express').Router();
const bcrypt = require('bcryptjs');

class LoginController {

    constructor() {

            router.post('/:username', async (req, res) => {
                this.doLogin(req, res);
            });

        }
       
    // doing login
    doLogin(req, res) {
        
        //const id = req.params.username;

        User.findOne({ id: req.params.username }, function (err, doc) {
            if (doc) {
                console.log(id);
                 res.status(200).send('User email already exists');
            } else {
                return res.status(400).send('Username not found');
            }




        // if(User.findOne(id)){
        //     const pass = req.body.password;
        //     console.log('Username');
        //     console.log(id)

        //     if(User.password===pass){
        //         res.status(200).send('Logged IN')
        //     }
        //     else
        //         res.status(400).send('Password Incorrect')
        // }
        // else
        // res.status(400).send('Username not found');
        
        })
    }
    

    getRouter() {
        return router;
    }
}

//Function which returns single object for all methods
let self = module.exports = {
    create: () => {
        if (!(self && self.loginController)) {
            self.loginController = new LoginController();
        }
        return self.loginController;
    }
};