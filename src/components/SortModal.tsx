import React from 'react';

import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSelect: (value: string) => void;
}

export default function SortModal({
  visible,
  onClose,
  onSelect,
}: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide">

      <View style={styles.overlay}>
        <View style={styles.sheet}>

          <Text style={styles.title}>
            Sort By
          </Text>

          <TouchableOpacity
            style={styles.option}
            onPress={() => {
              onSelect('LOW_HIGH');
              onClose();
            }}>
            <Text>
              Price Low To High
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.option}
            onPress={() => {
              onSelect('HIGH_LOW');
              onClose();
            }}>
            <Text>
              Price High To Low
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.option}
            onPress={() => {
              onSelect('RATING');
              onClose();
            }}>
            <Text>
              Rating High To Low
            </Text>
          </TouchableOpacity>

           <TouchableOpacity
            style={styles.option}
            onPress={() => {
              onSelect('BEST_SELLERS');
              onClose();
            }}>
            <Text>
              Best Sellers
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor:
      'rgba(0,0,0,0.3)',
  },

  sheet: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 20,
  },

  option: {
    paddingVertical: 15,
  },
});