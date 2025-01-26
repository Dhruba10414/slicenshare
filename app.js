const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors")
const helmet = require("helmet")
const swaggerSpec = require("./src/swagger/swagger");
const errorHandler = require("./src/middleWares/error-handler.middleware");
const swaggerUi = require("swagger-ui-express");
const userRoute = require("./src/routes/clients/user.route");
const productRoute = require("./src/routes/admin/product.route")
const adminAuthRoute = require("./src/routes/admin/admin.route")
const userProductRoute = require("./src/routes/clients/product.route")
const app = express();
app.use(express.json())
require("dotenv").config();
app.use(cors())
app.use(helmet());
const connectDB = require('./config/database');
connectDB();

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//error handlers 
app.use(errorHandler);


//admin routes
app.use("/api/products", productRoute)
app.use("/api/admin/auth",adminAuthRoute)


//user routes 
app.use("/api/users", userRoute);
app.use("/api/users", userProductRoute);


module.exports = app;