import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const token = localStorage.getItem('token');

// Get cart items from API
export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URI}/cart-items`, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Add item to cart
export const addToCart = createAsyncThunk('cart/addToCart', async ({ productId, quantity }, { rejectWithValue }) => {
    if (!productId) {
        // console.error("❌ Error: Product ID is undefined before API call!");
        return rejectWithValue({ message: "Product ID is missing" });
    }

    const token = localStorage.getItem('token');


    try {
        const { data } = await axios.post(`${process.env.REACT_APP_API_URI}/add-to-cart`, { productId, quantity },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return data.cart;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});


// Remove item from cart
export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (itemId, { rejectWithValue }) => {
    try {
        await axios.delete(`${process.env.REACT_APP_API_URI}/remove-item/${itemId}`, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return itemId;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});




const cartSlice = createSlice({
    name: 'cart',
    initialState: { cartItems: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.cartItems = action.payload;
                state.loading = false;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.cartItems = action.payload.items;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.cartItems = state.cartItems.filter(item => item._id !== action.payload);
            });
    }
});

export default cartSlice.reducer;
