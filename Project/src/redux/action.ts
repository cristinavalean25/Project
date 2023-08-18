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

export interface AddProductAction {
  type: typeof ADD_PRODUCT;
  payload: Product;
}

/////////////////////////////////

export const DELETE_PRODUCT = 'DELETE_PRODUCT';

export interface DeleteProductAction {
  type: typeof DELETE_PRODUCT;
  payload: number;
}

// export type ProductActionTypes = AddProductAction | DeleteProductAction;
export type ProductActionTypes =
  | AddProductAction
  | DeleteProductAction
  | {type: typeof ADD_IMAGES; payload: {productId: number; images: string[]}};

export const deleteProduct = (productId: number): DeleteProductAction => ({
  type: DELETE_PRODUCT,
  payload: productId,
});

//////////////////////////////////

export const ADD_IMAGES = 'ADD_IMAGES';

export const addImages = (productId: number, imageUrls: string[]) => ({
  type: ADD_IMAGES,
  payload: {productId, images: imageUrls},
});
