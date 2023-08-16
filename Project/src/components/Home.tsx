import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import Navbar from './Navbar';
import SearchBar from './SearchBar';
import Products from '../Produse/Products';
import {RootStackParamList} from '../types/RootStackParamList';
import AddProducts from '../Produse/AddProducts';
import ProductList from '../Produse/ProductList';

export type HomeProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

function Home({navigation}: HomeProps) {
  const backgroundStyle = {
    backgroundColor: '#fff',
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <View>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <Navbar navigation={navigation} />
          <SearchBar />
          <AddProducts />
          <ProductList />
          <Products />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default Home;
