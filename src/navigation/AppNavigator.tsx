import React from 'react';

import {
  NavigationContainer,
} from '@react-navigation/native';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import ProductsScreen from '../screens/ProductsScreen';
import BagScreen from '../screens/BagScreen';

const Stack =
  createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen
          name="Products"
          component={ProductsScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Bag"
          component={BagScreen}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}