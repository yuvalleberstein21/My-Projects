import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add(state, action) {
            const product = action.payload;
            const exist = state.find((x) => x.id === product.id);

            if (exist) {
                // Increase the Quantity
                const updateState = state.map((x) =>
                    x.id === product.id ? { ...x, qty: x.qty + 1 } : x
                );
                localStorage.setItem('cart', JSON.stringify(updateState));
                return updateState;

            } else {
                const updatedState = [
                    ...state,
                    {
                        ...product,
                        qty: 1,
                    }
                ];
                localStorage.setItem('cart', JSON.stringify(updatedState));
                return updatedState;
            }

        },

        remove(state, action) {
            const product = action.payload;
            const exist = state.find((x) => x.id === product.id);

            if (exist.qty === 1) {
                const updatedState = state.filter((x) => x.id !== exist.id);
                localStorage.setItem('cart', JSON.stringify(updatedState));
                return updatedState;

            } else {
                const updatedState = state.map((x) =>
                    x.id === product.id ? { ...x, qty: x.qty - 1 } : x);
                localStorage.setItem('cart', JSON.stringify(updatedState));
                return updatedState;

            }

        }
    }
});



export const { add, remove } = cartSlice.actions;
export default cartSlice.reducer;