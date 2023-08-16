import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ProductProps} from '../types/ProductProps';

const Product: React.FC<ProductProps> = ({id, title, images, price}) => {
  const navigation = useNavigation<any>();

  const handleGoToProductPage = () => {
    navigation.navigate('ProductPage', {productId: id});
  };

  return (
    <TouchableOpacity onPress={handleGoToProductPage} style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image source={{uri: images[0]}} style={styles.image} />
        </View>
        <View style={styles.productDetails}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.price}>$ {price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const {width} = Dimensions.get('window');
const itemWidth = (width - 20) / 1 - 10;

const styles = StyleSheet.create({
  container: {
    width: itemWidth,
    backgroundColor: '#fff',
    margin: 5,

    marginLeft: 15,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    margin: 10,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  productDetails: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: '#888',
  },
});

export default Product;
