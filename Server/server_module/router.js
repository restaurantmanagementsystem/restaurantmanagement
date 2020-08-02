const userController = require("./controllers/user.controller").create();
const FoodItemController = require("./controllers/fooditem.controller").create();
class Routes {
    constructor() { }
    initializeRoutes(app) {
        app.use('/api/v1/user', userController.getRouter());
        app.use('/api/v1/fooditem', FoodItemController.getRouter());       
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
