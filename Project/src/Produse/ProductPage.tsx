import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {RouteProp, useRoute, useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';
import Carousel from 'react-native-snap-carousel';
import Navbar from '../components/Navbar';
import {HomeProps} from '../components/Home';

interface Product {
  description: React.ReactNode;
  category: string;
  id: number;
  title: string;
  brand: string;
  price: number;
  images: string[];
  discountPercentage: number;
  isFavorite: boolean;
}

type RootStackParamList = {
  ProductPage: {productId: number};
};

type ProductPageRouteProp = RouteProp<RootStackParamList, 'ProductPage'>;

const ProductPage: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [images, setImages] = useState<string[]>([]);

  const route = useRoute<ProductPageRouteProp>();
  const {productId} = route.params;

  const navigation = useNavigation<HomeProps['navigation']>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.escuelajs.co/api/v1/products/${productId}`,
        );
        setProduct(response.data);
        setImages(response.data.images);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [productId]);

  const renderItem = ({item}: {item: string}) => (
    <View>
      <Image source={{uri: item}} style={styles.imgStyle} />
    </View>
  );

  return (
    <SafeAreaView>
      <ScrollView>
        <Navbar navigation={navigation} />
        <View style={styles.container}>
          <Carousel
            data={images}
            renderItem={renderItem}
            sliderWidth={300}
            itemWidth={300}
            sliderHeight={200}
            itemHeight={200}
            autoplay={true}
          />
          {product && (
            <View style={styles.details}>
              <Text style={styles.title}>{product.title}</Text>
              <View style={styles.separator} />
              <Text style={styles.price}>Price: $ {product.price}</Text>
              <Text style={styles.description}>{product.description}</Text>
              <View style={styles.separator} />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  details: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  imgStyle: {
    width: 350,
    height: 350,
  },
  title: {
    fontSize: 25,
    fontWeight: '600',
    color: '#000',
    padding: 5,
  },
  brand: {
    fontSize: 20,
    fontWeight: '500',
    color: '#555',
  },
  price: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E90FF',
  },
  description: {
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'justify',
    margin: 10,
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    width: '80%',
    alignSelf: 'center',
    marginVertical: 5,
  },
});

export default ProductPage;
