import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface CommonFormProps {
  item?: any;
  onSubmit: (item: any, type?: string) => void;
}

const CommonForm: React.FC<CommonFormProps> = props => {
  const {item, onSubmit} = props.route.params;
  // console.log(item, 'item in commonform');
  const [title, setTitle] = useState(item?.title || '');
  const [description, setDescription] = useState(item?.description || '');
  const [price, setPrice] = useState(item?.price.toString() || '');
  const [discountPercentage, setDiscountPercentage] = useState(
    item?.discountPercentage.toString() || '',
  );
  const [rating, setRating] = useState(item?.rating.toString() || '');
  const [stock, setStock] = useState(item?.stock.toString() || '');
  const [availabilityStatus, setAvailabilityStatus] = useState(
    item?.availabilityStatus || '',
  );
  const [tags, setTags] = useState(item?.tags.join(', ') || '');
  const navigation = useNavigation();
  useEffect(() => {
    if (item) {
      setTitle(item.title);
      setDescription(item.description);
      setPrice(item.price.toString());
      setDiscountPercentage(item.discountPercentage.toString());
      setRating(item.rating.toString());
      setStock(item.stock.toString());
      setAvailabilityStatus(item.availabilityStatus);
      setTags(item.tags.join(', '));
    }
  }, [item]);

  const handleSubmit = () => {
    if (
      !title ||
      !description ||
      !price ||
      !discountPercentage ||
      !rating ||
      !stock ||
      !availabilityStatus ||
      !tags
    ) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    const newItem = {
      id: item?.id || Date.now().toString(),
      title,
      description,
      price: parseFloat(price),
      discountPercentage: parseFloat(discountPercentage),
      rating: parseFloat(rating),
      stock: parseInt(stock),
      availabilityStatus,
      tags: tags.split(',').map(tag => tag.trim()),
    };

    onSubmit(newItem, item?.id ? 'Update' : 'Add');
    onBack();
  };

  const onBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.heading} numberOfLines={1}>
          {item ? `${item.title}` : 'Add Product'}
        </Text>
        <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Title</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Discount Percentage</Text>
      <TextInput
        style={styles.input}
        value={discountPercentage}
        onChangeText={setDiscountPercentage}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Rating</Text>
      <TextInput
        style={styles.input}
        value={rating}
        onChangeText={setRating}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Stock</Text>
      <TextInput
        style={styles.input}
        value={stock}
        onChangeText={setStock}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Availability Status</Text>
      <TextInput
        style={styles.input}
        value={availabilityStatus}
        onChangeText={setAvailabilityStatus}
      />

      <Text style={styles.label}>Tags (comma-separated)</Text>
      <TextInput style={styles.input} value={tags} onChangeText={setTags} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  submitButton: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  submitText: {
    fontSize: 16,
    color: '#007bff',
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    // marginBottom: 0,
  },
});

export default CommonForm;
