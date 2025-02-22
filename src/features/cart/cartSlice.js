import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const url = 'https://www.course-api.com/react-useReducer-cart-project';



const initialState = {
    cartItems: [],
    amount: 5,
    total: 0,
    isLoading: true,
}

export const getCartItems = createAsyncThunk('cart/getCartItems', 
async(thunkAPI)=>{
    try {
        const resp = await axios(url);
        return resp.data
    } catch (error) {
        return thunkAPI.rejectWithValue('something went wrong')
    }
})

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state)=>{
            state.cartItems = []
        },
        removeItem: (state, action)=>{
            const itemId = action.payload
            state.cartItems = state.cartItems.filter((item)=> item.id !== itemId) 
        },
        increase: (state, { payload })=>{
            const cartItem = state.cartItems.find((item)=> item.id === payload.id);
            cartItem.amount++
        },
        decrease: (state, { payload })=>{
            const cartItem = state.cartItems.find((item)=> item.id === payload.id);
            cartItem.amount--
        }, calculateTotals: (state) => {
            let amount = 0
            let total = 0 

            state.cartItems.forEach((item)=> {
                amount += item.amount
                total += item.amount * item.price
            })
            state.amount = amount
            state.total = total
        }
        
    },
    extraReducers: (builder)=> {
       builder
       .addCase(getCartItems.pending, (state, ) => {
        state.isLoading = true
         })

        .addCase(getCartItems.fulfilled, (state, action) => {
            state.cartItems = action.payload
            state.isLoading = false
        })

      
        .addCase(getCartItems.rejected, (state, action) => {
            state.isLoading = false
            console.log(action.payload)
        })

    }
})


export const { clearCart, removeItem, increase, decrease, calculateTotals } = cartSlice.actions;

export default cartSlice.reducer