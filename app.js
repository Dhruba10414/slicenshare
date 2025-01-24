const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors")
const helmet = require("helmet")
const errorHandler = require("./src/middleWares/error-handler.middleware");
const userRoute = require("./src/routes/user.route");

const app = express();
app.use(express.json())
require("dotenv").config();
app.use(cors())
app.use(helmet());
const connectDB = require('./config/database');
connectDB();

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


//error handlers 
app.use(errorHandler);

//route middlewares
app.use("/api/users", userRoute);




module.exports = app;