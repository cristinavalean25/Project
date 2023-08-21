import React, {useState} from 'react';
import {View, Text, TextInput, Button, Image} from 'react-native';
import {useDispatch} from 'react-redux';
import {ImagePickerResponse, Product} from '../types/Product';
import {addProduct} from '../redux/action';
import ImagePicker from 'react-native-image-crop-picker';
import {PermissionsAndroid} from 'react-native';

const AddProducts = () => {
  const dispatch = useDispatch();
  let [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [productData, setProductData] = useState<Product>({
    id: 0,
    title: '',
    price: 0,
    category: '',
    description: '',
    image: [],
  });

  const handleImagePicker = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Permission to access gallery',
          message: 'App needs access to your gallery to select images.',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const response: ImagePickerResponse = await ImagePicker.openPicker({
          mediaType: 'photo',
          multiple: true,
          maxFiles: 10,
        });

        if (response && response.assets) {
          const imageUris = response.assets.map(asset => asset.uri);
          setSelectedImages([...selectedImages, ...imageUris]);
        }
      } else {
        console.log('Permission denied');
      }
    } catch (error) {
      console.log('Image picker error: ', error);
    }
  };

  const handleAddProduct = () => {
    const newProduct: Product = {
      ...productData,
      image: selectedImages,
    };

    dispatch(addProduct(newProduct));
    setSelectedImages([]);
    setProductData({
      id: 0,
      title: '',
      price: 0,
      category: '',
      description: '',
      image: [],
    });
  };

  return (
    <View>
      <Text>Add Product</Text>
      <TextInput
        placeholder="Product ID"
        value={productData.id.toString()}
        onChangeText={text =>
          setProductData({...productData, id: parseInt(text, 10)})
        }
      />
      <TextInput
        placeholder="Product Title"
        value={productData.title}
        onChangeText={text => setProductData({...productData, title: text})}
      />
      <TextInput
        placeholder="Product Price"
        value={productData.price.toString()}
        onChangeText={text =>
          setProductData({
            ...productData,
            price: parseFloat(text),
          })
        }
      />

      <TextInput
        placeholder="Category"
        value={productData.category}
        onChangeText={text => setProductData({...productData, category: text})}
      />
      <TextInput
        placeholder="Description"
        value={productData.description}
        onChangeText={text =>
          setProductData({...productData, description: text})
        }
        multiline={true}
        numberOfLines={10}
        style={{
          height: 100,
          textAlignVertical: 'top',
          borderColor: 'gray',
          borderWidth: 1,
        }}
      />

      <View>
        {selectedImages.map((imageUrl, index) => (
          <Image
            key={index}
            source={{uri: imageUrl}}
            style={{width: 200, height: 200}}
          />
        ))}
        <Button title="Add Images" onPress={handleImagePicker} />
        <Button title="Add Product" onPress={handleAddProduct} />
      </View>
    </View>
  );
};

export default AddProducts;
