import React, {useState, useEffect} from 'react';
import {
  View,
  Button,
  FlatList,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Alert,
} from 'react-native';
import {getItems, Item} from '../api/itemApi';
import ProductCard from '../components/ProductCard';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import {COLORS} from '../constants/color';

const HomeScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const [products, setproducts] = useState<Item[]>([]);
  const nav = useNavigation<any>();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data: any = await getItems();

      setproducts(data?.products);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    console.log(id, 'delete');
    try {
      const itemArr = products.filter(ele => ele.id !== id);
      setproducts(itemArr);
    } catch (error) {
      console.error(error);
    }
  };

  const onUpdate = (id?: string) => {
    const item = products.find(p => p.id == id);
    nav.navigate('ProductScreen', {item, onSubmit});
  };

  const onSubmit = (data: any, type?: string) => {
    console.log(data, 'data on submit ');
    let productArr = [];
    if (type === 'Update') {
      productArr = products.map(item =>
        item.id === data.id ? Object.assign({}, item, data) : item,
      );
    } else if (type === 'Add') {
      productArr = products;
      productArr.unshift(data);
    }

    setproducts(productArr);
  };

  const handleLogout = () => {
    // Show an alert asking for confirmation
    Alert.alert(
      'Confirm Logout', // Title
      'Are you sure you want to log out?', // Message
      [
        {
          text: 'Cancel',
          style: 'cancel', // Styling this as a cancel button
        },
        {
          text: 'Yes',
          onPress: () => {
            auth()
              .signOut()
              .then(() => console.log('User signed out!'))
              .catch(error => console.log('Error logging out:', error));
          },
        },
      ],
      {cancelable: true},
    );
  };
  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {}} style={{}}>
          <Icon name="menu" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.heading} numberOfLines={1}>
          {'Home'}
        </Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Icon name="exit-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <ProductCard item={item} onDelete={handleDelete} onEdit={onUpdate} />
        )}
      />
      <TouchableOpacity style={styles.actionButton} onPress={() => onUpdate()}>
        <Text style={{fontSize: 30, color: 'white', fontWeight: 'bold'}}>
          {'+'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.secondaryColor,
    // flex: 1,
  },
  actionButton: {
    right: 20,
    bottom: 80,
    position: 'absolute',
    backgroundColor: '#1779ba',
    borderRadius: 50,
    paddingHorizontal: 15,
    paddingVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  logoutButton: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    backgroundColor: 'white',
    padding: 10,
  },
});
