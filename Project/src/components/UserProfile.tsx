import {View, Text, StyleSheet, Image} from 'react-native';
import Navbar from './Navbar';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../types/RootStackParamList';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux/es/hooks/useSelector';

type UserProfileRouteProp = RouteProp<RootStackParamList, 'UserProfile'>;

type UserProfileProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
  route: UserProfileRouteProp;
};

const UserProfile = ({navigation, route}: UserProfileProps) => {
  const {user} = route.params;

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <>
      <Navbar navigation={navigation} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.profil}>Profile</Text>
          <View style={styles.iconContainer}>
            <Icon name="user" size={25} color="#fff" style={styles.icon} />
          </View>
          <Text style={styles.name}>Welcome {user.name}</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statSection}>
            <Text style={styles.statTitle}>Following</Text>
          </View>
          <View style={styles.statSeparator}></View>
          <View style={styles.statSection}>
            <Text style={styles.statTitle}>History</Text>
          </View>
          <View style={styles.statSeparator}></View>
          <View style={styles.statSection}>
            <TouchableOpacity style={styles.statSection} onPress={handleLogout}>
              <Text style={styles.statTitle}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.content}>
          <Text style={styles.email}>Email: {user.email}</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  header: {
    backgroundColor: '#03045e',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
  },
  profil: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  email: {
    fontSize: 16,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 20,
    color: '#fff',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  statSection: {
    flex: 1,
    alignItems: 'center',
  },
  statTitle: {
    fontSize: 16,
  },
  statSeparator: {
    width: 1,
    height: '70%',
    backgroundColor: '#000',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#03045e',
  },
  icon: {
    fontSize: 40,
    color: '#03045e',
  },
});

export default UserProfile;
