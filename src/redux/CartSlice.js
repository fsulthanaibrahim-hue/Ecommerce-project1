import { createSlice } from "@reduxjs/toolkit";

const initialState = {  
    items: JSON.parse(localStorage.getItem("cartItems")) || [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.items = action.payload;
            localStorage.setItem("cartItems", JSON.stringify(state.items));
        },

        addToCart: (state, action) => {
            const product = action.payload;

            const existing= state.items.find((i) => i.id === product.id);

            if(existing) {
                existing.quantity += 1;
            } else {    
                state.items.push({ ...product, quantity: 1 });
            } 

            localStorage.setItem("cartItems", JSON.stringify(state.items));
        },

        removeFromCart: (state, action) => {
            state.items = state.items.filter((i) => i.id !== action.payload);
            localStorage.setItem("cartItems", JSON.stringify(state.items));
        },

        increaseQty: (state, action) => {
            const item = state.items.find(i => i.id === action.payload);
            if(item) item.quantity += 1;
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
export const { addToCart, removeFromCart, increaseQty, decreaseQty, clearCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;  

export const syncCartToDB = async (userId, cartItems) => {
    try {
      const formattedProducts = cartItems.map((item) => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      }));

      const res = await fetch(`http://localhost:5000/cart?userId=${userId}`);
      const data = await res.json();

      if(data.length > 0) {
        await fetch(`http://localhost:5000/cart/${data[0].id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                userId, 
                products: formattedProducts 
            }),
        });
      } else {
           await fetch("ttp://localhost:5000/cart", {
             method: "POST",
             headers: { "Content-Type": "application/json" },
             body: JSON.stringify({ 
                userId, 
                products: formattedProducts 
            }),
        });
      }
    } catch (err) {
        console.error("Error syncing cart:", err);
    }
};


