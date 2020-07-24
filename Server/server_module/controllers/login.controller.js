const User = require('../models/user');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

class LoginController {
    constructor() {

        router.post('/login', async (req, res) => {
           this.doLogin(req,res);
        });

    }

    doLogin(req,res){
    //check if the username is valid or not.
    const user = await User.findOne({username: req.body.username});
        if (!user)
            return res.status(400).send('User does not exists');
        

    //check if password is valid or not
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass)
    return res.status(400).send('Invalid Password');

        if((req.body.role).equals(admin))
        res.send('logged in Admin');
    
        if((req.body.role).equals(manager))
        res.send('logged in Manager');

        if((req.body.role).equals(waiter))
        res.send('logged in Waiter');

        if((req.body.role).equals(chef))
        res.send('logged in Chef');
    }

}