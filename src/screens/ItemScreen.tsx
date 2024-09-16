import React, {useState} from 'react';
import {View, TextInput, Button} from 'react-native';
import {addItem, updateItem, Item} from '../api/itemApi';

const ItemScreen: React.FC<{route: any; navigation: any}> = ({
  route,
  navigation,
}) => {
  const [itemName, setItemName] = useState<string>(
    route.params?.item?.name || '',
  );

  const handleSubmit = async () => {
    try {
      if (route.params?.item) {
        await updateItem(route.params.item.id, {
          id: route.params.item.id,
          name: itemName,
        });
      } else {
        await addItem({id: Math.random().toString(), name: itemName});
      }
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{padding: 20}}>
      <TextInput
        placeholder="Item Name"
        value={itemName}
        onChangeText={setItemName}
        style={{marginBottom: 10, borderWidth: 1, padding: 8}}
      />
      <Button title="Save" onPress={handleSubmit} />
    </View>
  );
};

export default ItemScreen;
