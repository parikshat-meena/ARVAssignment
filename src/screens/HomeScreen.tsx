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
import Icon from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';

const HomeScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const [products, setproducts] = useState<Item[]>([]);
  const nav = useNavigation<any>();
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data: any = await getItems();
      // console.log(data.products[0], 'data in fetchitemes');
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
      // const val = await deleteItem(id);
      // console.log(val, 'val');
      // fetchProducts();
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
        <Text style={styles.heading} numberOfLines={1}>
          {'Home'}
        </Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Icon name="exit-to-app" size={24} color="#000" />
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
    // flex: 1,
  },
  actionButton: {
    right: 10,
    bottom: 50,
    position: 'absolute',
    backgroundColor: '#1779ba',
    borderRadius: 50,
    // margin: 20,
    paddingHorizontal: 15,
    paddingVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButton: {
    marginLeft: 10,
    justifyContent: 'center',
    right: 5,
    position: 'absolute',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
});
