import React from 'react';
import {View, Text, Button} from 'react-native';
import {Item} from '../api/itemApi';

interface ItemCardProps {
  item: Item;
  onDelete: (id: string) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({item, onDelete}) => {
  return (
    <View style={{padding: 10, borderBottomWidth: 1}}>
      <Text>{item.name}</Text>
      <Button title="Delete" onPress={() => onDelete(item.id)} />
    </View>
  );
};

export default ItemCard;
