import React from 'react';
import {View, Text, FlatList, Button, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {deleteProduct} from '../redux/action';

const ProductList = () => {
  const products = useSelector((state: RootState) => state.products.products);
  const dispatch = useDispatch();

  const handleDeleteProduct = (productId: number) => {
    dispatch(deleteProduct(productId));
  };

  return (
    <View>
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View>
            <Text>ID: {item.id}</Text>
            <Text>Title: {item.title}</Text>
            <Text>Price: {item.price}</Text>
            <Text>Description: {item.description}</Text>
            {item.image.map(
              (imageUrl: any, index: React.Key | null | undefined) => (
                <Image
                  key={index}
                  source={{uri: imageUrl}}
                  style={{width: 100, height: 100}}
                />
              ),
            )}
            <Button
              title="Delete"
              onPress={() => handleDeleteProduct(item.id)}
            />
          </View>
        )}
      />
    </View>
  );
};

export default ProductList;
