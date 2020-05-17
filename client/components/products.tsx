import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Link from 'next/link';
import { AppState } from '../store/reducers';
import { GET_PRODUCTS } from '../store/actions/products.actions';


export const Products = () => {
  const user = useSelector((state: AppState) => state.products);
  const dispatch = useDispatch();

  (function isSignedIn() {
    useEffect(() => {
      dispatch({type: GET_PRODUCTS})
    }, []);
    return null;
  })();

  return (
    <p>Products</p>
  )
}


