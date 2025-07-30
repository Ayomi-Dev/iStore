import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export interface CartItem {
    _id: string;
    name: string;
    price: number;
    quantity: number;
    total: number;
    images: string[]
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

        addItems: (state, action: PayloadAction<CartItem>) => { //includes or adds a selected item to the cart list
            const cartItem = action.payload  //

            const existingCartItem = state.cartItems.find((item) => item._id === cartItem._id)

            if(!existingCartItem){ //checks if selected item already exists in the cart list
                state.cartItems.push(cartItem);

                //calculating total number of items in the cart selected by a user
                state.totalQuantity = state.cartItems.reduce((sum, item) => sum + item.quantity, 0);

                //calculating total price of all items in the cart
                state.totalAmount = Math.round(state.cartItems.reduce((sum, item) => sum + item.total, 0) * 100) / 100 ;
                toast.success(`${cartItem.name} added to cart`)
            }
            else{
                toast.error(`You already added this item to your cart`);
                return;
            }

        },

        removeItem: (state, action: PayloadAction<string>) => { //removes an item from the cart list
            state.cartItems = state.cartItems.filter(item => item._id !== action.payload);

            // recalculates the total quantity of items in the cart 
            state.totalQuantity = state.cartItems.reduce((sum, item) => sum + item.quantity, 0);

            //recalculates the total amount of prices of all items in the cart
            state.totalAmount = Math.round(state.cartItems.reduce((sum, item) => sum + item.total, 0) * 100) / 100 ;
            toast.warning(`Item removed from cart`)
        },

        increaseQty: (state, action:PayloadAction<CartItem>) => { //increases the quantity of an item as user desires
            //finds the index of individaul item selected by a user
            const itemIndex = state.cartItems.findIndex(item => item._id === action.payload._id)

            //increases the quantity of the an item selected by 1
            state.cartItems[itemIndex].quantity = state.cartItems[itemIndex].quantity + 1

            //calculates the price of the item selected based on the number of quantities
            state.cartItems[itemIndex].total = Math.round((state.cartItems[itemIndex].quantity * state.cartItems[itemIndex].price) * 100 ) / 100;

            //recalculates the total quantities of all items in the cart whenever user increases the quantity of an item
            state.totalQuantity = state.cartItems.reduce((sum, item) => sum + item.quantity, 0)

            //recalculates the total price of all items in the cart whenever user increases the quantity of an item
            state.totalAmount = Math.round((state.cartItems.reduce((sum, item) => sum + item.total, 0))* 100) / 100 ;

           
        },

        decreaseQty: (state, action:PayloadAction<CartItem>) => { //lets user decrease the quantity of an item as often times
            //finding index of individaul item selected by a user
            const itemIndex = state.cartItems.findIndex(item => item._id === action.payload._id)

            //increasing quantity of the individual item selected by 1
            if(state.cartItems[itemIndex].quantity <= 1){
                return;
            }
            state.cartItems[itemIndex].quantity = state.cartItems[itemIndex].quantity - 1

            //calculating the price of the item selected based on the number of quantities
            state.cartItems[itemIndex].total = Math.round((state.cartItems[itemIndex].quantity * state.cartItems[itemIndex].price) * 100 ) / 100;

            //recalculating the total quantities of all items in the cart whenever user increases the quantity of an item
            state.totalQuantity = state.cartItems.reduce((sum, item) => sum + item.quantity, 0)

            //recalculating the total price of all items in the cart whenever user increases the quantity of an item
            state.totalAmount = Math.round((state.cartItems.reduce((sum, item) => sum + item.total, 0))* 100) / 100;

           
        },

       
        clearCart: (state) => { //empties the cart
            state.cartItems = []
            toast.info(`Cart cleared`)
            state.totalAmount = 0;
        },
    }
})

export const {addItems, removeItem, increaseQty, decreaseQty, clearCart} = cartSlice.actions
export default cartSlice.reducer

