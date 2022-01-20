//Require classes
//===============
const TodoService = require('./Services/TodoService');
const TodoRouter = require('./Routers/TodoRouter');
const AuthRouter = require("./Routers/AuthRouter")

//Configure express server
//========================
const jwt = require("jsonwebtoken");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./config");
const axios = require("axios");

//Configure knex & auth
//=====================
const knexFile = require("./knexfile").development;
const knex = require("knex")(knexFile);
const authClass = require("./auth")(knex)
const auth = authClass
 
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(auth.initialize());

//Set up service and routers
const todoService = new TodoService(knex);
const todoRouter = new TodoRouter(todoService, auth, express, axios, jwt, config)
const authRouter = new AuthRouter(express, axios, jwt, knex, config);
app.use('/todo', todoRouter.router());
app.use('/', authRouter.router());
 
app.get("/", (req, res) => {
    res.send("backend");
});
  
app.listen(8080, () => {
    console.log(`Application listening to port 8080`);
});