export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string[];
}

export interface ImagePickerResponse {
  map(arg0: (image: {path: any}) => any): unknown;
  didCancel?: boolean;
  errorMessage?: string;
  assets?: ImagePickerAsset[];
}

export interface ImagePickerAsset {
  uri: string;
  filename?: string;
  width?: number;
  height?: number;
  type?: string;
  fileSize?: number;
}
