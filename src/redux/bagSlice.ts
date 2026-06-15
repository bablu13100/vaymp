import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const bagSlice = createSlice({
  name: 'bag',
  initialState,

  reducers: {
    addToBag: (
      state,
      action,
    ) => {
      const existing =
        state.items.find(
          item =>
            item.id ===
            action.payload.id,
        );

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
        });
      }
    },

    removeFromBag: (
      state,
      action,
    ) => {
      state.items =
        state.items.filter(
          item =>
            item.id !==
            action.payload,
        );
    },

    increaseQuantity: (
      state,
      action,
    ) => {
      const item =
        state.items.find(
          i =>
            i.id ===
            action.payload,
        );

      if (item) {
        item.quantity++;
      }
    },

    decreaseQuantity: (
      state,
      action,
    ) => {
      const item =
        state.items.find(
          i =>
            i.id ===
            action.payload,
        );

      if (
        item &&
        item.quantity > 1
      ) {
        item.quantity--;
      }
    },
  },
});

export const {
  addToBag,
  removeFromBag,
  increaseQuantity,
  decreaseQuantity,
} = bagSlice.actions;

export default bagSlice.reducer;