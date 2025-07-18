import { useState, type FC } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"; 
import axios from "axios"; //making HTTP requests to the backend
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { increaseQty, decreaseQty, removeItem, type CartItem, clearCart } from '../redux/cartSlice'

import { useDispatch } from "react-redux";


const serverURL = import.meta.env.VITE_API_URL;
if(!serverURL){
    throw new Error('backend url is not defined')
}





export const Checkout : FC = () => {
    const stripe = useStripe() //hook to access stripe methods
    const elements = useElements() //hook to allow stripe acces form elements and grab the card inputs
    
    const {cartItems, totalAmount, totalQuantity } = useSelector((state: RootState) => state.cart)

    const [clientSecret, setClientSecret] = useState<string>(""); //stores a unique key returned by Stripe to allow payment confirmation
    const [loading, setLoading] = useState<boolean>(false)
    const dispatch = useDispatch()
    const formatedItems = cartItems.map((item) => ({
        product: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        total: item.total
    }))

    

    
    const createPaymentIntent = async () => {//Asks Stripe to create a payment intent through which the client secret key is return
        const total = totalAmount / 100
        //sends a request to the backend server to create a payment intent i.e a clientSecret key
        const { data } = await axios.post(`${serverURL}/orders/create-payment-intent`,  
            {
                total,
                totalQuantity

            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        )
        setClientSecret(data.clientSecret)
    }


    const handlePayment = async () => { //defines the function to confirm payment wuth Stripe
        if(!stripe || !elements) return

        setLoading(true)

        const result =  await stripe.confirmCardPayment(clientSecret, {  //confrims payment with the clientSecret created and card information collected by CardElement
            payment_method: {
                card: elements.getElement(CardElement)!
            }
        })

        if(result.error){
            console.log(result.error);
            alert(result.error.message);
            setLoading(false);
            return;
        }

        if(result.paymentIntent.status === "succeeded"){
            //creates the order and its details in the database
            await axios.post(`${serverURL}/orders/`, 
                {
                    orderItems: formatedItems,
                    totalAmount: result.paymentIntent.amount,
                    paymentIntentId: result.paymentIntent.id
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
            setLoading(false)
            alert('order successfull');

            // const getOrders = await axios.get(`${import.meta.env.VITE_API_URL}/my-orders`, {
            //     headers: {
            //         Authorization: `Bearer ${localStorage.getItem('token')}`
            //     }
            // })

        }
    }

    const handleIncrease = (product: CartItem ) => {
        dispatch(increaseQty(product))
        // dispatch(upDateQuantity(product))
    }
    const handleDecrease = (product: CartItem) => {
        dispatch(decreaseQty(product))
    }
    const handleRemove = (id: string) => {
        dispatch(removeItem(id))
    }

    return(
    <div>
        <h2>Checkout</h2>
        <ul>
          {cartItems.map((item) => (
            <li key={item._id}>
              {item.name} {item.price} x {item.quantity} - ${item.total}
            <div className="flex gap-4">
                <FaMinus className="cursor-pointer" onClick={() => handleDecrease(item)} />
                <FaPlus  className="cursor-pointer" onClick={() => handleIncrease(item)} />
                <FaTrash className="cursor-pointer" onClick={() => handleRemove(item._id)} />
            </div>
            </li>
          ))}
        </ul>

        {!clientSecret ? (
          <button onClick={createPaymentIntent} className="border p-2 cursor-pointer">Create Payment Intent</button>
        ) : (
          <>
            <CardElement />
            <button onClick={handlePayment} disabled={loading}>
              {loading ? "Processing..." : "Pay"}
            </button>
          </>
        )}



        {totalAmount} {totalQuantity}
        {cartItems.length === 0 ? (<p></p>) : <p onClick={()=> dispatch(clearCart())}>Clear cart</p>}
        
    </div>
    )
}