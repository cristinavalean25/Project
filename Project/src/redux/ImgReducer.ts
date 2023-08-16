import {ADD_IMAGES} from './action';

interface ImageState {
  imageUrls: string[];
}

const initialState: ImageState = {
  imageUrls: [],
};

const imageReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_IMAGES:
      return {
        ...state,
        imageUrls: [...state.imageUrls, ...action.payload],
      };
    default:
      return state;
  }
};

export default imageReducer;
