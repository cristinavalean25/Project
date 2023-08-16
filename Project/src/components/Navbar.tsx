import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import {RootStackParamList} from '../types/RootStackParamList';

type NavbarProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

function Navbar({navigation}: NavbarProps) {
  const goHome = () => {
    navigation.navigate('Home');
  };

  const goLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.navbarContainer}>
      <TouchableOpacity onPress={goHome} style={styles.navbarButton}>
        <Text style={styles.navbarButtonText}>Fake Store</Text>
      </TouchableOpacity>
      <View style={styles.loginButtonContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={goLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton}>
          <Icon name="opencart" size={20} color="#000" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbarContainer: {
    backgroundColor: '#000873',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  navbarButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  navbarButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginButtonContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    flexDirection: 'row',
  },
  loginButton: {
    backgroundColor: '#000873',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon: {
    color: '#fff',
  },
});

export default Navbar;
