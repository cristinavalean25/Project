import {Product} from '../types/Product';
import {
  ADD_IMAGES,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  ProductActionTypes,
} from './action';

interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: [],
};

const productReducer = (state = initialState, action: ProductActionTypes) => {
  switch (action.type) {
    case ADD_PRODUCT:
      const newProduct = action.payload as unknown as Product;
      newProduct.id = state.products.length + 1;
      newProduct.image = [];
      return {
        ...state,
        products: [...state.products, newProduct],
      };
    case DELETE_PRODUCT:
      const updatedProducts = state.products.filter(
        product => product.id !== action.payload,
      );
      const reorderedProducts = updatedProducts.map((product, index) => ({
        ...product,
        id: index + 1,
      }));
      return {
        ...state,
        products: reorderedProducts,
      };
    case ADD_IMAGES:
      return {
        ...state,
        products: state.products.map(product => {
          if (product.id === action.payload.productId) {
            return {
              ...product,
              image: [...product.image, ...action.payload.images],
            };
          }
          return product;
        }),
      };
    default:
      return state;
  }
};

export default productReducer;
