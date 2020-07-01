// Operations related to the backend
// Express is a module. Provides you a way to implement HTTP server.
const path = require("path");
process.env["NODE_CONFIG_DIR"] = path.join(__dirname, "config");
const express = require("express");
// create a express application object .
const app = express();
// Morgan is used for logging request details.
const morgan = require("morgan");
// import DB connection. so that DB intilizes at application start up
const mongoose = require("mongoose");

// parses request body with desired format. currently we are using JSON.
const bodyParser = require("body-parser");
// import routes
const router = require("./server_modules/router").create();
//Declare Port
const PORT = 3000;
// config to read config from file and env.
const config = require("config");

// A server class which handles all the operations of baackend
class Server {
    constructor() {
            this.dbConnect();
            this.initializeRoutes();
            this.listen();
        }
        // Connect to the MongoDB application
    dbConnect() {
			//for local uri
            let uri =
                "mongodb://" +
                config.get("dbConfig").get("host") +
                ":" +
                config.get("dbConfig").get("port") +
                "/" +
                config.get("dbConfig").get("schemaName");
            // let uri = "mongodb+srv://rest1234:Rest1234@@cluster0-dfqcj.mongodb.net/rest-manage?retryWrites=true&w=majority";
            mongoose
                .connect(uri, { useNewUrlParser: true })
                .then(data => {
                    console.log("Connected to database.....");
                })
                .catch(err => {
                    console.log("Mongo connection failed....", err);
                });
        }
        // use all routers
    initializeRoutes() {
            // use body parser... currently parsing only JSON requests.
            app.use(bodyParser.json());
            app.use(morgan("dev"));
            // TODO : move this out to health.controller.js
            app.get("/health", function(req, res) {
                res.send({ status: "UP!!" });
                // check DB status as well!!
            });

            app.use((req, res, next) => {
                res.header("Access-Control-Allow-Origin", "*");
                res.header(
                    "Access-Control-Allow-Headers",
                    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                );
                if (req.method === "OPTIONS") {
                    res.header(
                        "Access-Control-Allow-Methods",
                        "PUT, POST, PATCH, DELETE, GET"
                    );
                    return res.status(200).json({});
                }
                next();
            });

            router.initializeRoutes(app);

            // app.use((req, res, next) => {
            //     const error = new Error('Not found');
            //     res.status(404);
            //     next(error);
            // })
            // app.use((error, req, res, next) => {
            //     res.status(error.status || 500);
            //     res.json({
            //         error: {
            //             message: error.message
            //         }
            //     });
            // });

            app.use(express.static(path.join(__dirname, "/dist/")));

            app.use("*", function(req, res) {
                res.sendFile(path.join(__dirname, "/dist/index.html"));
            });

            if (process.env.NODE_ENV !== "prd") {}
            console.log(
                "__dirname and index using path....:: ",
                path.join(__dirname, "")
            );
        }
        // check the connection
    listen() {
        console.log(`spinning up server.... on port ${PORT}`);
        app.listen(PORT, function() {
            console.log("Server started on port : ", PORT);
        });
    }
}

// Object for the server class
new Server();