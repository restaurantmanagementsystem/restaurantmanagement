const userController = require("../controllers/user.controller").create();
const orderController = require("../controllers/order.controller").create();
const orderItemController = require("../controllers/orderitem.controller").create();
const loginController = require("../controllers/login.controller").create();

class Routes {
    constructor() { }

    initializeRoutes(app) {
        app.use('/api/v1/user', userController.getRouter());       
        app.use('/api/v1/order', orderController.getRouter());
        app.use('/api/v1/orderitem', orderItemController.getRouter());
        app.use('/api/v1/login', loginController.getRouter());

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
