const userController = require("./controllers/user.controller").create();

class Routes {
    constructor() { }

    initializeRoutes(app) {
        app.use('/api/v1/user', userController.getRouter());       
    }
}

//Function which returns single object for all methods
let self = module.exports = {
    create: () => {
        if (!(self && self.routes)) {
            self.routes = new Routes();
        }
        return self.routes;
    }
};
