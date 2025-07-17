import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
    _id: string;
    name: string;
    price: number;
    quantity: number;
    total: number;
}


interface CartState {
    cartItems: CartItem[];
    totalAmount: number;
    totalQuantity: number
}

const initialState: CartState = {
    cartItems: [],
    totalAmount: 0,
    totalQuantity: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,

    reducers: {
        addItems: (state, action: PayloadAction<CartItem>) => {
            const cartItem = action.payload
            const existingCartItem = state.cartItems.find((item) => item._id === cartItem._id)
            if(!existingCartItem){
                state.cartItems.push(cartItem);

                //calculating total number of items in the cart selected by a user
                state.totalQuantity = state.cartItems.reduce((sum, item) => sum + item.quantity, 0);

                //calculating total price of all items in the cart
                state.totalAmount = Math.ceil(state.cartItems.reduce((sum, item) => sum + item.total, 0) * 100) ;

            }
            else{
                console.log('item already in cart');
                return;
            }

        },

        removeItems: (state, action: PayloadAction<string>) => {
            state.cartItems = state.cartItems.filter(item => item._id !== action.payload);

            // recalculates the total quantity of items in the cart 
            state.totalQuantity = state.cartItems.reduce((sum, item) => sum + item.quantity, 0);

            //recalculates the total amount of prices of all items in the cart
            state.totalAmount = Math.ceil(state.cartItems.reduce((sum, item) => sum + item.total, 0) * 100) ;

        },
        increaseQty: (state, action:PayloadAction<CartItem>) => {
            //finding index of individaul item selected by a user
            const itemIndex = state.cartItems.findIndex(item => item._id === action.payload._id)

            //increasing quantity of the individual item selected by 1
            state.cartItems[itemIndex].quantity = state.cartItems[itemIndex].quantity + 1

            //calculating the price of the item selected based on the number of quantities
            state.cartItems[itemIndex].total = Math.round((state.cartItems[itemIndex].quantity * state.cartItems[itemIndex].price) * 100 ) / 100;

            

            //recalculating the total quantities of all items in the cart whenever user increases the quantity of an item
            state.totalQuantity = state.cartItems.reduce((sum, item) => sum + item.quantity, 0)

            //recalculating the total price of all items in the cart whenever user increases the quantity of an item
            state.totalAmount = Math.round((state.cartItems.reduce((sum, item) => sum + item.total, 0))* 100) / 100;

           
        },

        upDateQuantity: (state, action: PayloadAction<{id: string, quantity: number}>) => {
            const item = state.cartItems.find(item => item._id === action.payload.id)
            if(item){
                item.quantity = action.payload.quantity
            }
        },
        clearCart: (state) => {
            state.cartItems = []
        },
    }
})

export const {addItems, removeItems, increaseQty, upDateQuantity, clearCart} = cartSlice.actions
export default cartSlice.reducer

