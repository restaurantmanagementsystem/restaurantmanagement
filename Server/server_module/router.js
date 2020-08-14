const userController = require("./controllers/user.controller").create();
const FoodItemController = require("./controllers/fooditem.controller").create();
const LoginController = require("./controllers/login.controller").create();
class Routes {
    constructor() { }
    initializeRoutes(app) {
        app.use('/api/v1/user', userController.getRouter());
        app.use('/api/v1/fooditem', FoodItemController.getRouter()); 
        app.use('/api/v1/login', LoginController.getRouter());       

    }
}
let self = module.exports = {
    create: () => {
        if (!(self && self.routes)) {
            self.routes = new Routes();
        }
        return self.routes;
    }
};
