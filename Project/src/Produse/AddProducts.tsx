import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  PermissionsAndroid,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {Product} from '../types/Product';
import {addProduct} from '../redux/action';
import ImagePicker from 'react-native-image-crop-picker';

const AddProducts = () => {
  const dispatch = useDispatch();

  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs access to your storage to select images.',
          buttonPositive: 'OK',
        },
      );

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (error) {
      console.error('Error requesting storage permission:', error);
      return false;
    }
  };

  const handleImagePicker = async () => {
    const permissionGranted = await requestStoragePermission();

    if (permissionGranted) {
      try {
        const images = await ImagePicker.openPicker({
          multiple: true,
          mediaType: 'photo',
        });

        if (images && images.length > 0) {
          const selectedPaths = images.map(image => image.path);
          setSelectedImages([...selectedImages, ...selectedPaths]);
        }
      } catch (error) {
        console.error('Error selecting images: ', error);
      }
    } else {
      console.log('Storage permission denied');
    }
  };

  const [productData, setProductData] = useState<Product>({
    id: '',
    title: '',
    price: 0,
    category: '',
    description: '',
    image: [],
  });

  const handleAddProduct = () => {
    dispatch(
      addProduct({
        ...productData,
        image: selectedImages,
      }),
    );
    setProductData({
      id: '',
      title: '',
      price: 0,
      category: '',
      description: '',
      image: [],
    });
    setSelectedImages([]);
  };

  // const handleAddImage = () => {
  //   const imageUrl = './path/to/your/image.jpg'; // Replace with the actual image URL
  //   dispatch(addImage(imageUrl));
  // };

  return (
    <View>
      <Text>Add Product</Text>
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
