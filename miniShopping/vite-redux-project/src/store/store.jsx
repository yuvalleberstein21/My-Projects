import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import productSlice from "./productSlice";


const storedCart = localStorage.getItem('cart');
const initialState = storedCart ? JSON.parse(storedCart) : [];

const store = configureStore({
    reducer: {
        cart: cartSlice,
        products: productSlice
    },
    preloadedState: {
        cart: initialState,
    },
});

export default store;