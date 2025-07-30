import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export interface OrderItem {
    product: string;
    price: number;
    name: string;
    quantity: number;
    total: number;
    image: string
}

export interface Order{
    _id: string;
    orderItems: OrderItem[];
    totalAmount: number;
    paidAt: string;
    paymentIntentId: string
}

interface OrderState {
    orders: Order[];
    loading: boolean;
    error: string | null
}

const initialState: OrderState = {
    orders: [],
    loading: false,
    error: null
}

export const fetchUserOrders = createAsyncThunk(
    `orders/fetchUserOrders`,
    async (_, thunkAPI) => {
        try {
            const { data }= await axios.get(    `${import.meta.env.VITE_API_URL}/orders/my-orders`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            return data
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch orders')
        }
    }
) 

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchUserOrders.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(fetchUserOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload
            })
            .addCase(fetchUserOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string
            });
    },
})

export default orderSlice.reducer