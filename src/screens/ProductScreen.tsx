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
import CameraGallaryComp from '../components/CameraGallaryComp';
import storage from '@react-native-firebase/storage';
import {COLORS} from '../constants/color';

interface CommonFormProps {
  item?: any;
  onSubmit: (item: any, type?: string) => void;
}

const CommonForm: React.FC<CommonFormProps> = props => {
  const {item, onSubmit} = props.route.params;
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
  const [imgResponse, setImgResponse] = useState<any>();
  const reference = storage().ref('gs://arvassigment.appspot.com');
  const navigation = useNavigation();
  console.log(imgResponse?.filePath, 'imgae');
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

  const handleSubmit = async () => {
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
    if (imgResponse?.filePath) {
      const pathToFile = `${imgResponse.filePath}`;
      // uploads file
      await reference.putFile(pathToFile);
    }

    onBack();
  };

  const onBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{paddingBottom: 40}}>
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
      <CameraGallaryComp
        setImgResponse={setImgResponse}
        heading={'Upload Images'}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 20,
    backgroundColor: 'white',
    // marginBottom: 40,
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
    color: COLORS.secondaryColor,
  },
  submitButton: {
    marginLeft: 10,
    justifyContent: 'center',
    backgroundColor: COLORS.blue_chipe,
    padding: 5,
    borderRadius: 5,
    elevation: 1,
  },
  submitText: {
    fontSize: 16,
    color: COLORS.new,
    fontWeight: 'bold',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: COLORS.new,
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: COLORS.secondaryColorLight,
    // marginBottom: 0,
  },
});

export default CommonForm;
