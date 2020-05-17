require('dotenv').config();

import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from 'cors';
import { ScalablePressClient } from "./controllers/scalable-press";
import * as fileUpload from 'express-fileupload';
// import { corsOptions } from './utils/cors-options';

import { Routes } from './routes';
// import { isDevEnv } from "./controllers/utilities";

class App {

  public app: express.Application;
  public routes: Routes = new Routes();
  public scalablePress = new ScalablePressClient();

  constructor() {
    this.app = express();
    this.config();
    this.routes.routes(this.app);
    this.scalablePress.getProducts();
  }
  
  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cors());
  }
}

export default new App().app;
