import { combineReducers } from 'redux'
import user, { DefaultUserState } from './user.reducer';
import products, { DefaultProductsState } from './products.reducer';
import { UserState } from '../../models/user';
import { ProductsState } from '../../models/products';

export interface AppState {
  user: UserState,
  products: ProductsState
}

export const DefaultAppState: AppState = {
  user: {
    email: null
  },
  products: {
    list: null,
  }
}


export default combineReducers({
  user,
  products,
})