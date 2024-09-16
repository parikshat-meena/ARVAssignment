import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface ItemCardProps {
  item: any;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const ProductCard: React.FC<ItemCardProps> = ({item, onDelete, onEdit}) => {
  const handleDelete = () => {
    Alert.alert(
      'Delete Item',
      'Are you sure you want to delete this item?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Delete', onPress: () => onDelete(item.id)},
      ],
      {cancelable: true},
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          style={{backgroundColor: '#F2F2F2'}}
          onPress={() => onEdit(item.id)}>
          <Icon name="edit" size={24} color="#000" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete}>
          <Icon name="delete" size={24} color="#e60000" style={styles.icon} />
        </TouchableOpacity>
      </View>
      <Image
        source={{
          uri:
            item.thumbnail ??
            'https://www.shutterstock.com/shutterstock/photos/2421574099/display_1500/stock-vector-attention-icon-set-danger-caution-or-alert-risk-warning-vector-symbol-in-a-black-filled-and-2421574099.jpg',
        }}
        style={styles.thumbnail}
        resizeMode="contain"
      />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      <View style={styles.row}>
        <Text style={styles.discount}>
          Discount: {item.discountPercentage}%
        </Text>
        <Text style={styles.rating}>Rating: {item.rating}⭐</Text>
      </View>
      <Text style={styles.stock}>
        Stock: {item.stock} ({item.availabilityStatus})
      </Text>
      <ScrollView horizontal>
        {item.tags.map((tag, index) => (
          <Text key={index} style={styles.tag}>
            {tag}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    position: 'relative', // Added to position icons
  },
  iconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 10,
  },
  thumbnail: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginVertical: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e60000',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  discount: {
    fontSize: 14,
    color: '#28a745',
  },
  rating: {
    fontSize: 14,
    color: '#f39c12',
  },
  stock: {
    fontSize: 14,
    color: '#e60000',
  },
  tag: {
    backgroundColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginRight: 5,
    fontSize: 12,
    color: '#555',
  },
});

export default ProductCard;
