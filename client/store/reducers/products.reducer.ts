import { GET_PRODUCTS, SET_PRODUCTS } from "../actions/products.actions";
import { ProductsState } from "../../models/products";

export const DefaultProductsState: ProductsState = {
  list: null,
}

function reducer(state = DefaultProductsState, action: any) {
  const { products } = action;
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        isLoading: true,
      };
   
    case SET_PRODUCTS:
      return {
        ...state,
        list: {
          ...products.data,
        },
        isLoading: false,
      };
   
    default:
      return state;
  }
}

export default reducer;