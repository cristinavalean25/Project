import {Product} from '../types/Product';
import {ADD_PRODUCT, DELETE_PRODUCT} from './action';

interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: [],
};

const productReducer = (
  state = initialState,
  action: {type: string; payload: Product | string},
) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload as Product],
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          product => product.id !== action.payload,
        ),
      };
    default:
      return state;
  }
};

export default productReducer;
