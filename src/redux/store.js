import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice";
import wishlistReducer from "./WishlistSlice"; 
import userReducer from "./UserSlice";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        wishlist: wishlistReducer,
        user: userReducer,
    },
});
export default store;

