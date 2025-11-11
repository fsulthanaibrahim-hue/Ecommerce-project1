// import { createSlice } from "@reduxjs/toolkit";

// // const initialState = {
// //     items: JSON.parse(localStorage.getItem("wishlist")) || [],
// // };
 
// const wishlistSlice = createSlice({
//     name: "wishlist",
//     initialState: {
//        items: JSON.parse(localStorage.getItem("wishlist")) || [],
//     },    
//     reducers: {
//         addToWishlist: (state, action) => {
//             const exists = state.items.find((i) => i.id === action.payload.id);
//             if (!exists) {
//                 state.items.push(action.payload);
//                 localStorage.setItem("wishlist", JSON.stringify(state.items));
//             }
//         },
//         removeFromWishlist: (state, action) => {
//             state.items = state.items.filter((i) => i.id !== action.payload);
//             localStorage.setItem("wishlist", JSON.stringify(state.items));
//         },
//         clearWishlist: (state) => {
//             state.items = [];
//             localStorage.removeItem("wishlist");
//         },
//     },
// });
// export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
// export default wishlistSlice.reducer;



// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     items:JSON.parse(localStorage.getItem("wishlistItems")) || [],
// };

// const wishlistSlice = createSlice({
//   name: "wishlist",
//   initialState,
//   reducers: {
//     addToWishlist: (state, action) => {
//       const exists = state.items.find((item) => item.id === action.payload.id);
//       if (!exists) state.items.push(action.payload);
//     },
//     removeFromWishlist: (state, action) => {
//       state.items = state.items.filter(item => item.id !== action.payload);
//     },
//   },
// });

// export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
// export default wishlistSlice.reducer;



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
      if (!state.items.find(i => i.id === product.id)) {
        state.items.push(product);
      }
      localStorage.setItem("wishlistItems", JSON.stringify(state.items));
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload);
      localStorage.setItem("wishlistItems", JSON.stringify(state.items));
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;

