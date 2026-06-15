import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

interface Props {
  quantity: number;
  onPlus: () => void;
  onMinus: () => void;
}

export default function QuantitySelector({
  quantity,
  onPlus,
  onMinus,
}: Props) {
  return (
    <View style={styles.container}>

      <TouchableOpacity
        style={styles.btn}
        onPress={onMinus}>
        <Text>-</Text>
      </TouchableOpacity>

      <Text style={styles.qty}>
        {quantity}
      </Text>

      <TouchableOpacity
        style={styles.btn}
        onPress={onPlus}>
        <Text>+</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  btn: {
    width: 35,
    height: 35,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },

  qty: {
    marginHorizontal: 15,
    fontWeight: '700',
  },
});