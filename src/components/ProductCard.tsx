import React from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

interface Props {
  item: any;
  onAddToBag: () => void;
}

export default function ProductCard({
  item,
  onAddToBag,
}: Props) {
  const price = Math.round(item.price * 83);

  const originalPrice = Math.round(
    price * 1.6,
  );

  const discount = Math.round(
    ((originalPrice - price) /
      originalPrice) *
      100,
  );

  return (
    <View style={styles.card}>
      <Image
        source={{uri: item.image}}
        style={styles.image}
        resizeMode="contain"
      />

      <TouchableOpacity
        style={styles.wishlist}>
        <Text>♡</Text>
      </TouchableOpacity>

      <Text
        numberOfLines={1}
        style={styles.brand}>
        {item.category}
      </Text>

      <Text
        numberOfLines={2}
        style={styles.title}>
        {item.title}
      </Text>

      <Text style={styles.price}>
        ₹{price}
      </Text>

      <View style={styles.offerRow}>
        <Text style={styles.oldPrice}>
          ₹{originalPrice}
        </Text>

        <Text style={styles.discount}>
          {discount}% OFF
        </Text>
      </View>

      <TouchableOpacity
        style={styles.addBtn}
        onPress={onAddToBag}>
        <Text style={styles.btnText}>
          ADD TO BAG
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
  },

  image: {
    width: '100%',
    height: 200,
  },

  wishlist: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },

  brand: {
    fontWeight: '700',
    marginHorizontal: 10,
    marginTop: 10,
    textTransform: 'capitalize',
  },

  title: {
    fontSize: 12,
    color: '#666',
    marginHorizontal: 10,
    marginTop: 5,
  },

  price: {
    fontSize: 18,
    fontWeight: '700',
    marginHorizontal: 10,
    marginTop: 8,
  },

  offerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },

  oldPrice: {
    textDecorationLine: 'line-through',
    color: '#999',
    marginRight: 10,
  },

  discount: {
    color: 'green',
    fontWeight: '600',
  },

  addBtn: {
    backgroundColor: '#000',
    margin: 10,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },

  btnText: {
    color: '#fff',
    fontWeight: '700',
  },
});