import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Image,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import {
  fetchProducts,
} from '../redux/productsSlice';

import {
  addToBag,
} from '../redux/bagSlice';

import ProductCard from '../components/ProductCard';
import SortModal from '../components/SortModal';
import FilterModal from '../components/FilterModal';

import {
  RootState,
  AppDispatch,
} from '../redux/store';

export default function ProductsScreen({
  navigation,
}: any) {

  const dispatch =
    useDispatch<AppDispatch>();

  const {
    products,
    loading,
  } = useSelector(
    (state: RootState) =>
      state.products,
  );

  const bagItems = useSelector(
    (state: RootState) =>
      state.bag.items,
  );

  const [displayProducts,
    setDisplayProducts] =
    useState<any[]>([]);

  const [sortVisible,
    setSortVisible] =
    useState(false);

  const [filterVisible,
    setFilterVisible] =
    useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  useEffect(() => {
    setDisplayProducts(products);
  }, [products]);

  const categories =
    useMemo(() => {
      return [
        ...new Set(
          products.map(
            (p: any) =>
              p.category,
          ),
        ),
      ];
    }, [products]);

  const sortProducts =
    (type: string) => {

      let sorted =
        [...displayProducts];

      if (
        type === 'LOW_HIGH'
      ) {
        sorted.sort(
          (a, b) =>
            a.price -
            b.price,
        );
      }

      if (
        type === 'HIGH_LOW'
      ) {
        sorted.sort(
          (a, b) =>
            b.price -
            a.price,
        );
      }

      if (
        type === 'RATING'
      ) {
        sorted.sort(
          (a, b) =>
            b.rating.rate -
            a.rating.rate,
        );
      }

       if (
        type === 'BEST_SELLERS'
      ) {
        console.log('Sorting by best sellers');
        sorted.sort(
          (a, b) =>
            b.rating.count -
            a.rating.count,
        );
      }

      setDisplayProducts(
        sorted,
      );
    };

  const applyFilter =
    (category: string) => {

      const filtered =
        products.filter(
          (item: any) =>
            item.category ===
            category,
        );

      setDisplayProducts(
        filtered,
      );
    };

  const clearFilter =
    () => {
      setDisplayProducts(
        products,
      );
    };

  const bagCount =
    bagItems.reduce(
      (sum: number,
       item: any) =>
        sum +
        item.quantity,
      0,
    );

  if (loading) {
    return (
      <View
        style={styles.loader}>
        <ActivityIndicator
          size="large"
        />
      </View>
    );
  }

  return (
    <View
      style={styles.container}>

      <View
        style={styles.header}>
       <View style={{flexDirection:'row',alignItems:'center',left:20}}>
        <Image
              style={
                styles.logo
              }
              source={require('../assets/icons/logo.png')}
        />
        <Text
          style={styles.heading}>
          T-Shirts 
        </Text>
        </View>   
      
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(
              'Bag',
            )
          }>

          <View>
            <Image
              style={
                {width:20,height:20}
              }
              source={require('../assets/icons/cart.png')}
            />

            {bagCount > 0 && (
              <View
                style={
                  styles.badge
                }>
                <Text
                  style={
                    styles.badgeText
                  }>
                  {bagCount}
                </Text>
              </View>
            )}
          </View>

        </TouchableOpacity>

      </View>

      <Text
        style={styles.count}>
        {displayProducts.length}
        {' '}Items
      </Text>

      <FlatList
        data={
          displayProducts
        }
        numColumns={2}
        keyExtractor={
          item =>
            item.id.toString()
        }
        columnWrapperStyle={{
          justifyContent:
            'space-between',
        }}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        renderItem={({
          item,
        }) => (
          <ProductCard
            item={item}
            onAddToBag={() =>
              dispatch(
                addToBag({
                  id: item.id,
                  title:
                    item.title,
                  image:
                    item.image,
                  price:
                    item.price,
                }),
              )
            }
          />
        )}
      />

      <View
        style={
          styles.bottomBar
        }>

        <TouchableOpacity
          style={
            styles.actionBtn
          }
          onPress={() =>
            setSortVisible(
              true,
            )
          }>
          <Text>
            Sort By
          </Text>
        </TouchableOpacity>

        <View
          style={
            styles.divider
          }
        />

        <TouchableOpacity
          style={
            styles.actionBtn
          }
          onPress={() =>
            setFilterVisible(
              true,
            )
          }>
          <Text>
            Filters
          </Text>
        </TouchableOpacity>

      </View>

      <SortModal
        visible={
          sortVisible
        }
        onClose={() =>
          setSortVisible(
            false,
          )
        }
        onSelect={
          sortProducts
        }
      />

      <FilterModal
        visible={
          filterVisible
        }
        categories={
          categories
        }
        onClose={() =>
          setFilterVisible(
            false,
          )
        }
        onApply={
          applyFilter
        }
        onClear={
          clearFilter
        }
      />

    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        '#F7F7F7',
      padding: 10,
    },

    loader: {
      flex: 1,
      justifyContent:
        'center',
    },

    header: {
      flexDirection:
        'row',
      justifyContent:
        'space-between',
      alignItems:
        'center',
      marginTop: 10,
    },

    heading: {
      fontSize: 24,
      fontWeight: '700',
    },

    logo:{
      width:30,height:30,right:10,resizeMode:'contain'
    },
    count: {
      marginTop: 10,
      color: '#666',
    },

    bagIcon: {
      fontSize: 25,
    },

    badge: {
      position:
        'absolute',
      right: -8,
      top: -5,
      backgroundColor:
        'red',
      borderRadius: 10,
      minWidth: 18,
      alignItems:
        'center',
    },

    badgeText: {
      color: '#fff',
      fontSize: 12,
    },

    bottomBar: {
      position:
        'absolute',
      bottom: 20,
      left: 20,
      right: 20,
      backgroundColor:
        '#fff',
      borderRadius: 30,
      flexDirection:
        'row',
      justifyContent:
        'space-around',
      alignItems:
        'center',
      padding: 15,
      elevation: 6,
    },

    divider: {
      width: 1,
      height: 25,
      backgroundColor:
        '#ddd',
    },

    actionBtn: {
      flex: 1,
      alignItems:
        'center',
    },
  });