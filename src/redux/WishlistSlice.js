import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("wishlistItems")) || [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload;

      const itemExists = state.items.some(item => item.id === product.id);
      if (!itemExists) {
        state.items.push(product);
      }
       localStorage.setItem("wishlistItems", JSON.stringify(state.items));
    },

    removeFromWishlist: (state, action) => {
      const id = Number (action.payload);
      state.items = state.items.filter(item => Number(item.id) !== id);
     
      localStorage.setItem("wishlistItems", JSON.stringify(state.items));
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;

