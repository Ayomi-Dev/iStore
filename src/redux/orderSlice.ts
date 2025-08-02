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
    totalQuantity: number;
    paidAt: string;
    paymentIntentId: string;
    isPaid: boolean;
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

export const deleteOrder = createAsyncThunk(
    `orders/deleteOrder`,
    async (orderId: string, thunkAPI) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/orders/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            
        } 
        catch (error:any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to delete order')
        }
    }

)

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        clearOrders: (state) => {
            state.orders = [];
            state.loading = false;
            state.error = null;
        }
    },

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
            
        builder
            .addCase(deleteOrder.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = state.orders.filter(order => order._id !== action.payload)
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string
            })
    },
})

export default orderSlice.reducer