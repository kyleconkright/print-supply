import { AxiosResponse } from "axios";
import { FirebaseClient } from './firebase';

const axios = require("axios");

export class ScalablePressClient {

  public firebase = new FirebaseClient();

  constructor() {
    console.log('get scalable press stuff');
  }

  async getProducts() {
    try {
      const products: AxiosResponse = (await axios('https://api.scalablepress.com/v3/products/american-apparel-unisex-fine-jersey-pocket-t-shirt')).data;
      this.firebase.addProductsToFirebase(products); 
    } catch(err) {
      console.log(err);
    }
  }
}