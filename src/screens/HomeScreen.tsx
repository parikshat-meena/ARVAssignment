import React, {useState, useEffect} from 'react';
import {View, Button, FlatList, Text} from 'react-native';
import {getItems, deleteItem, Item} from '../api/itemApi';
import ItemCard from '../components/ItemCard';

const HomeScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const data = await getItems();
      setItems(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteItem(id);
      fetchItems();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Button
        title="Add New Item"
        onPress={() => navigation.navigate('Item')}
      />
      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <ItemCard item={item} onDelete={handleDelete} />
        )}
      />
    </View>
  );
};

export default HomeScreen;
