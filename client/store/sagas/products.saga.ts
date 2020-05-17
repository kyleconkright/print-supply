import axios from 'axios';

import { takeLatest, call, put } from 'redux-saga/effects';
import { GET_PRODUCTS, SET_PRODUCTS } from '../actions/products.actions';


function* setProducts() {
  try {
    const products = yield call(getProducts);
    yield put({ type: SET_PRODUCTS, products });
  } catch (err) { console.error(err) }
}

async function getProducts() {
  try {
    const products = (await axios.get('http://localhost:5001/products'))
    return products ? products : null;
  } catch (err) { console.error(err); }
}



const productsSaga = [
  takeLatest(
    GET_PRODUCTS,
    setProducts
  ),
]

export default productsSaga;