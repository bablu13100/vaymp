import React from 'react';

import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  RootState,
} from '../redux/store';

import {
  removeFromBag,
  increaseQuantity,
  decreaseQuantity,
} from '../redux/bagSlice';

import QuantitySelector
from '../components/QuantitySelector';

export default function BagScreen({navigation}: any) {

  const dispatch =
    useDispatch();

  const items =
    useSelector(
      (state: RootState) =>
        state.bag.items,
    );

  const totalItems =
    items.reduce(
      (
        sum: number,
        item: any,
      ) =>
        sum +
        item.quantity,
      0,
    );

  const grandTotal =
    items.reduce(
      (
        sum: number,
        item: any,
      ) =>
        sum +
        item.price *
          item.quantity,
      0,
    );

  if (
    items.length === 0
  ) {
    function goToHome(): void {
      navigation.replace('Products');
    }

    return (
      <View
        style={
          styles.empty
        }>
          <View style={{flexDirection:'row'}}>
             <Text
          style={
            styles.emptyText
          }>
          OOPS
          
        </Text>
            <Image style={{alignSelf:'center',justifyContent:'center',alignItems:'center'}}
            source={require('../assets/icons/opps.png')}
          />
          </View>
         <Text
          style={
            styles.emptyText2
          }>
          Your bag is empty.
        </Text>
        <Image
          source={require('../assets/icons/empty.png')}
          style={{width: 200, height: 200, marginTop: 20,tintColor:'gray'}}
        />
         <Text
          style={
            styles.emptyText2
          }>
          Add items To your bag now.
        </Text>
         <TouchableOpacity
                style={styles.addBtn}
                 onPress={goToHome}
                >
                <Text style={styles.btnText}>
                  Start Shopping
                </Text>
              </TouchableOpacity>
      </View>
    );
  }

  return (
    <View
      style={
        styles.container
      }>

      <FlatList
        data={items}
        keyExtractor={
          item =>
            item.id.toString()
        }
        renderItem={({
          item,
        }) => (
          <View
            style={
              styles.card
            }>

            <Image
              source={{
                uri:
                  item.image,
              }}
              style={
                styles.image
              }
            />

            <View
              style={{
                flex: 1,
              }}>

              <Text
                numberOfLines={
                  2
                }>
                {
                  item.title
                }
              </Text>

              <Text
                style={
                  styles.price
                }>
                ₹
                {Math.round(
                  item.price *
                    83,
                )}
              </Text>

              <QuantitySelector
                quantity={
                  item.quantity
                }
                onPlus={() =>
                  dispatch(
                    increaseQuantity(
                      item.id,
                    ),
                  )
                }
                onMinus={() =>
                  dispatch(
                    decreaseQuantity(
                      item.id,
                    ),
                  )
                }
              />

              <TouchableOpacity
                onPress={() =>
                  dispatch(
                    removeFromBag(
                      item.id,
                    ),
                  )
                }>
                <Text
                  style={
                    styles.remove
                  }>
                  Remove
                </Text>
              </TouchableOpacity>

            </View>

          </View>
        )}
      />

      <View
        style={
          styles.footer
        }>

        <Text>
          Items:
          {' '}
          {totalItems}
        </Text>

        <Text
          style={
            styles.total
          }>
          ₹
          {Math.round(
            grandTotal *
              83,
          )}
        </Text>

      </View>

    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        '#fff',
    },

    empty: {
      flex: 1,
      justifyContent:
        'center',
      alignItems:
        'center',
        backgroundColor:'white'
    },

    emptyText: {
      fontSize: 20,
      fontWeight: '700',
    },

     emptyText2: {
      fontSize: 15,
      // fontWeight: '700',
    },

    card: {
      flexDirection:
        'row',
      padding: 15,
      borderBottomWidth:
        1,
      borderBottomColor:
        '#eee',
    },

    image: {
      width: 100,
      height: 100,
      marginRight: 15,
    },

    price: {
      fontSize: 18,
      fontWeight: '700',
      marginVertical: 10,
    },

    remove: {
      color: 'red',
      marginTop: 10,
    },

    footer: {
      padding: 20,
      borderTopWidth: 1,
      borderColor:
        '#ddd',
      flexDirection:
        'row',
      justifyContent:
        'space-between',
    },

    total: {
      fontWeight: '700',
      fontSize: 18,
    },
    addBtn: {
    backgroundColor: '#4342FF',
    margin: 10,
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    width:200,
  },

  btnText: {
    color: '#fff',
    fontWeight: '700',
  },
  });