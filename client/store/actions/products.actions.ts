export const GET_PRODUCTS = '[Products] Get Products';
export const SET_PRODUCTS = '[Products] Set Products';

export function getProducts() {
  return { type: GET_PRODUCTS }
}

export function setProducts() {
  return { type: SET_PRODUCTS }
}