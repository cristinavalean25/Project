export interface ProductProps {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: number;
}

export interface ProductComponentProps {
  id: number;
  title: string;
  images: string[];
  category: string;
  price: number;
}
