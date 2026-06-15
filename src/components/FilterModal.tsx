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
  categories: string[];
  onApply: (value: string) => void;
  onClose: () => void;
  onClear: () => void;
}

export default function FilterModal({
  visible,
  categories,
  onApply,
  onClose,
  onClear,
}: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide">

      <View style={styles.overlay}>
        <View style={styles.sheet}>

          <Text style={styles.title}>
            Categories
          </Text>

          {categories.map(item => (
            <TouchableOpacity
              key={item}
              style={styles.option}
              onPress={() => {
                onApply(item);
                onClose();
              }}>
              <Text>
                {item}
              </Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={styles.clearBtn}
            onPress={() => {
              onClear();
              onClose();
            }}>
            <Text>
              Clear Filters
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

  clearBtn: {
    alignItems: 'center',
    marginTop: 20,
  },
});