import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: {}, // key: productId, value: quantity
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    incrementItem: (state, action) => {
      const id = action.payload;
      state.items[id] = (state.items[id] || 0) + 1;
    },
    decrementItem: (state, action) => {
      const id = action.payload;
      if (state.items[id]) {
        state.items[id] -= 1;
        if (state.items[id] <= 0) {
          delete state.items[id];
        }
      }
    },
    clearCart: (state) => {
      state.items = {};
    },
  },
});

export const { incrementItem, decrementItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
