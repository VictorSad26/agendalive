const express = require('express');
const cors = require('cors');
const routes = require('./routes');
require('./config/connection');

//const morgan = require('morgan');


const swaggerUi = require("swagger-ui-express");



class App {
  constructor(){
    this.app = express();
    this.middlewares();
    this.routes();
  }
  middlewares(){
    this.app.use(express.json());
    //this.app.use(morgan('dev'));
    this.app.use((req, res, next)=>{
      res.header("Access-Controll-Allow-Origin", "*");
      res.header("Access-Controll-Allow-Methods", "Get, POST, PUT, DELETE");
      res.header("Access-Controll-Allow-Headers", "Access, Content-type, Authorization, Acept, Origin, X-Requested-With");
      this.app.use(cors());
      next();
    })
    const swaggerFile = require('../swagger_output.json');
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
  }

  routes(){
    this.app.use(routes);
  }
}

module.exports = new App().app;
