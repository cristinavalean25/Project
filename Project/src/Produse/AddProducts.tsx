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
import ImagePicker, {
  ImageLibraryOptions,
  ImagePickerResponse,
} from 'react-native-image-picker';

const AddProducts = () => {
  const dispatch = useDispatch();

  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs access to your storage.',
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
        const options: ImageLibraryOptions = {
          mediaType: 'photo',
        };

        ImagePicker.launchImageLibrary(
          options,
          (response: ImagePickerResponse) => {
            if (!response.didCancel) {
              if (response.assets && response.assets.length > 0) {
                const selectedPaths = response.assets
                  .map(image => image.uri)
                  .filter(path => path !== undefined) as string[];
                setSelectedImages(prevSelectedImages => [
                  ...prevSelectedImages,
                  ...selectedPaths,
                ]);
              } else {
                console.log('No images selected.');
              }
            } else {
              console.log('Image selection canceled.');
            }
          },
        );
      } catch (error) {
        console.error('Error selecting images: ', error);
      }
    } else {
      console.log('Storage permission denied');
    }
  };

  const [productData, setProductData] = useState<Product>({
    id: 0,
    title: '',
    price: 0,
    category: '',
    description: '',
    image: [],
  });

  const handleAddProduct = async () => {
    const newProduct: Product = {
      ...productData,
      image: selectedImages,
    };

    dispatch(addProduct(newProduct));
    setProductData({
      id: 0,
      title: '',
      price: 0,
      category: '',
      description: '',
      image: [],
    });
    setSelectedImages([]);
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
