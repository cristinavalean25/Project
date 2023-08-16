import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import Navbar from './Navbar';
import {RootStackParamList} from '../types/RootStackParamList';
import {StackNavigationProp} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {User, authenticate} from '../redux/AuthSlice';

type LoginProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

function Login({navigation}: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const storedUsersJSON = await AsyncStorage.getItem('users');
      if (storedUsersJSON) {
        const storedUsers = JSON.parse(storedUsersJSON);
        const storedUser = storedUsers.find(
          (user: User) => user.email === email && user.password === password,
        );
        if (storedUser) {
          console.log('Logged in successfully.');
          dispatch(authenticate(storedUser));
          navigation.navigate('UserProfile', {user: storedUser});
          return;
        } else {
          setLoginError('Invalid email or password.');
        }
      } else {
        setLoginError('No registered user found.');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const goRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <LinearGradient colors={['#03045e', '#FFFFFF']} style={{flex: 1}}>
      <Navbar navigation={navigation} />
      <View style={styles.welcomeBack}>
        <Text style={styles.welcomeBackText}>Welcome back</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Icon name="user" size={40} color="#FFF" />
          </View>
        </View>
        <View style={styles.loginBox}>
          {loginError ? (
            <Text style={styles.errorText}>{loginError}</Text>
          ) : null}
          <View style={styles.inputContainer}>
            <Icon
              name="user"
              size={25}
              color="#03045e"
              style={styles.inputIcon}
            />
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon
              name="lock"
              size={25}
              color="#03045e"
              style={styles.inputIcon}
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              style={styles.input}
            />
            <Icon
              name={showPassword ? 'eye' : 'eye-slash'}
              size={25}
              color="#03045e"
              style={styles.showIcon}
              onPress={() => setShowPassword(!showPassword)}
            />
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <View style={styles.separatorContainer}>
            <View style={styles.separatorLine}></View>
          </View>
          <View style={styles.forgotRegisterContainer}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            <TouchableOpacity onPress={goRegister}>
              <Text style={styles.registerText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -70,
  },
  welcomeBack: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  welcomeBackText: {
    textAlign: 'center',
    fontSize: 30,
    color: '#FFF',
  },
  loginBox: {
    backgroundColor: '#03045e',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  input: {
    backgroundColor: '#FFF',
    padding: 5,
    marginBottom: 10,
    borderRadius: 5,
  },
  avatarContainer: {
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: '#03045e',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#03045e',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 5,
    marginBottom: 20,
    borderRadius: 5,
  },
  inputIcon: {
    marginRight: 10,
  },
  showIcon: {
    position: 'absolute',
    right: 10,
  },
  separatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
    paddingHorizontal: 20,
  },
  separatorLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#FFF',
  },
  forgotRegisterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    paddingHorizontal: 20,
  },
  forgotPasswordText: {
    color: '#FFF',
  },
  registerText: {
    color: '#FFF',
    marginLeft: 10,
  },
  errorText: {
    color: 'red',
    margin: 10,
    textAlign: 'center',
  },
});

export default Login;
function state(state: unknown): unknown {
  throw new Error('Function not implemented.');
}

function RootState(a: unknown, b: unknown): boolean {
  throw new Error('Function not implemented.');
}
function dispatch(arg0: {
  payload: import('../redux/AuthSlice').LoginData;
  type: 'auth/authenticate';
}) {
  throw new Error('Function not implemented.');
}
