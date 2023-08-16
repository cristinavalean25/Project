import {Product} from '../types/Product';

export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';

export const incrementCounter = () => ({
  type: INCREMENT_COUNTER,
});

//////////////////////////////////

export const ADD_PRODUCT = 'ADD_PRODUCT';

export const addProduct = (product: Product) => {
  return {
    type: ADD_PRODUCT,
    payload: product,
  };
};

/////////////////////////////////

export const DELETE_PRODUCT = 'DELETE_PRODUCT';

export const deleteProduct = (productId: number) => {
  return {
    type: DELETE_PRODUCT,
    payload: productId,
  };
};

//////////////////////////////////

export const ADD_IMAGES = 'ADD_IMAGES';

export const addImages = (imageUrls: string[]) => ({
  type: ADD_IMAGES,
  payload: imageUrls,
});
