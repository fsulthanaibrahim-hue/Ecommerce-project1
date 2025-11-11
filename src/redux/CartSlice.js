import { createSlice } from "@reduxjs/toolkit";

const initialState = {  
    items: JSON.parse(localStorage.getItem("cartItems")) || [],
};

// const initialState = {
//     items: [],
// };

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const existing= state.items.find(i => i.id === product.id);

            if(existing) {
                existing.quantity += 1;
            } else {    
                state.items.push({ ...product, quantity: 1 });
            }  
            localStorage.setItem("cartItems", JSON.stringify(state.items));
        },

        removeFromCart: (state, action) => {
            state.items = state.items.filter(i => i.id !== action.payload);
            localStorage.setItem("cartItems", JSON.stringify(state.items));
        },

        increaseQty: (state, action) => {
            const item = state.items.find(i => i.id === action.payload);
            if(item) {
              item.quantity += 1;
            } 
            localStorage.setItem("cartItems", JSON.stringify(state.items));
        },

        decreaseQty: (state, action) => {
            const item = state.items.find(i => i.id === action.payload);
            if (item) {
             if(item.quantity > 1) {
                item.quantity -= 1;
             } else {
                state.items = state.items.filter(i => i.id !== action.payload);
             }
          } 
          localStorage.setItem("cartItems", JSON.stringify(state.items));
        },
        clearCart: (state) => {
            state.items = [];
            localStorage.removeItem("cartItems");
        },
    },
});
export const { addToCart, removeFromCart, increaseQty, decreaseQty, clearCart } =
 cartSlice.actions;
export default cartSlice.reducer;  


