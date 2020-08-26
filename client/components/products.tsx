import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Link from 'next/link';
import { AppState } from '../store/reducers';
import { GET_PRODUCTS } from '../store/actions/products.actions';


export const Products = () => {
  const products = useSelector((state: AppState) => state.products.list);
  const dispatch = useDispatch();

  (function isSignedIn() {
    useEffect(() => {
      dispatch({type: GET_PRODUCTS})  
    }, []);
    return null;
  })();

  return (
    <div>
      <p>Products</p>
      { products.description }
      { products.colors.map((product: any) => product.name ) } 
    </div>
  )
}


