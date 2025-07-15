import { useEffect, useState, type FC } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"; 
import axios from "axios"; //making HTTP requests to the backend

const serverURL = import.meta.env.VITE_API_URL;
if(!serverURL){
    throw new Error('backend url is not defined')
}


interface CartItem { //describe the shape of item to be stored in a cart
    product: string;  //products MongoDB id
    name: string;
    price: number;
    quantity: number;
}


export const Checkout : FC = () => {
    const stripe = useStripe() //hook to access stripe methods
    const elements = useElements() //hook to allow stripe acces form elements and grab the card inputs
    

    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [clientSecret, setClientSecret] = useState<string>(""); //stores a unique key returned by Stripe to allow payment confirmation
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(()=> { 
        const cart = [{
            product: "686e8ce1b1b6ebe256d46dec",
            name: 'test product',
            price: 5000,
            quantity: 3 
        }
        ]
        console.log(cart)
        setCartItems(cart);
    }, [])

    
    const createPaymentIntent = async () => {//Asks Stripe to create a payment intent through which the client secret key is return
        const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

        //sends a request to the backend server to create a payment intent i.e a clientSecret key
        const { data } = await axios.post(`${serverURL}/orders/create-payment-intent`,  
            {
                amount : totalAmount
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
                    orderItems: cartItems,
                    totalAmount: result.paymentIntent.amount,
                    paymentIntentId: result.paymentIntent.id
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
            alert('order successfull');

            const getOrders = await axios.get(`${import.meta.env.VITE_API_URL}/my-orders`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log(getOrders)
        }
        setLoading(false)
    }

    return(
    <div>
        <h2>Checkout</h2>
        <ul>
          {cartItems.map((item) => (
            <li key={item.product}>
              {item.name} x {item.quantity} - ${(item.price / 100).toFixed(2)}
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
    </div>
    )
}