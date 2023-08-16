import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import Product from './Product';
import {ProductProps} from '../types/ProductProps';

function Products() {
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    axios
      .get('https://api.escuelajs.co/api/v1/products')
      .then(res => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <View>
      {products?.map(product => (
        <Product key={product.id} {...product} />
      ))}
    </View>
  );
}

export default Products;
