import { useEffect, useState, type FC } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const serverURL = import.meta.env.VITE_API_URL;
console.log(import.meta.env.VITE_API_URL);
if(!serverURL){
    throw new Error('backend url is not defined')
}




interface CartItem {
    product: string;
    name: string;
    price: number;
    quantity: number;
}


export const Checkout : FC = () => {
    const stripe = useStripe()
    const elements = useElements()
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NzBmNDE2MTA5ZmNmMWUxY2ViZjNlMCIsImlhdCI6MTc1MjIzMzA2NiwiZXhwIjoxNzU0ODI1MDY2fQ.c7enLLKy295om0UuwAxjwICMBweq3fjuSPg6VZMUmAA'

    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [clientSecret, setClientSecret] = useState<string>("");
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

    const createPaymentIntent = async () => {
        const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
        const { data } = await axios.post(`${serverURL}/orders/create-payment-intent`, 
            {
                amount : totalAmount
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        setClientSecret(data.clientSecret)
    }


    const handlePayment = async () => {
        if(!stripe || !elements) return

        setLoading(true)

        const result =  await stripe.confirmCardPayment(clientSecret, {
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
            await axios.post(`${serverURL}/orders/`, 
                {
                    orderItems: cartItems,
                    totalAmount: result.paymentIntent.amount,
                    paymentIntentId: result.paymentIntent.id
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            alert('order successfull');
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
        <button onClick={createPaymentIntent}>Create Payment Intent</button>
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