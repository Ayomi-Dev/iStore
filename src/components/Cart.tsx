import { useState, type FC } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"; 
import axios from "axios"; //making HTTP requests to the backend
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { FaArrowCircleLeft, FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { increaseQty, decreaseQty, removeItem, type CartItem, clearCart } from '../redux/cartSlice'
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";




export const Cart : FC = () => {
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
        total: item.total,
        image: item.images[0]
    }))
   
    const createPaymentIntent = async () => {//Asks Stripe to create a payment intent through which the client secret key is return
        
        //sends a request to the backend server to create a payment intent i.e a clientSecret key
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/orders/create-payment-intent`,  
            {
              totalAmount
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
            await axios.post(`${import.meta.env.VITE_API_URL}/orders/`, 
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
            toast.success('Your order was successfully placed!');
            dispatch(clearCart())
            setTimeout(() => {
              window.location.href = '/orders/history';
            }, 1000)

        }
    }

    const handleIncrease = (product: CartItem ) => {
        dispatch(increaseQty(product))
    }
    const handleDecrease = (product: CartItem) => {
        dispatch(decreaseQty(product))
    }
    const handleRemove = (id: string) => {
      dispatch(removeItem(id))
    }
    

    return (
      <section className="relative">
  
        {cartItems.length === 0 ? (
          <div className='h-[500px] flex flex-col justify-center items-center '>
  
            <h2 className='text-lg text-gray-400 text-center font-semibold mb-2'>Your Cart is empty</h2>
  
            <button className="bg-[#f31b87] rounded-md px-2 py-2 text-white ">
              <Link to={`/products`}>
                <FaArrowCircleLeft className="inline-block mr-2" />
                Continue Shopping
              </Link>
            </button>
          
          </div>
          
        ) 
        : 
        (

        <div className="w-full block">
          <div className="flex w-full items-center justify-center bg-white shadow-md">
            <h2 className=' text-pink-600 text-center my-5 text-[12px] md:text-xl'>Your items are here</h2>
            <div className="flex items-center justify-center gap-2 md:mx-2  h-full">
              <h2 className='font-bold text-sm md:text-xl mx-3 text-gray-600'>Total items: <span className='font-bold text-pink-600'>{ totalQuantity }</span></h2>
              <h2 className='font-bold mx-3 text-sm md:text-xl text-gray-600'>Total Price: <span className='font-bold text-pink-600'>${ totalAmount }</span> </h2>
            </div>
          </div>
          <div className="">
            <table className='mx-auto w-full shadow-lg rounded-md px-2'>
            <thead className="text-[10px] md:text-[1rem]" >
  
              <tr className='shadow-md h-16 mb-4 '>
                <th>
                  <h1>Image</h1>
                </th>
                <th>
                  <h1>Name</h1>
                </th>
                <th>
                  <h1>Price</h1>
                </th>
                <th>
                  <h1>Qty</h1>
                </th>
                <th>
                  <h1>Total</h1>
                </th>
                <th>
                  <h1 className='text-red-500'>Action</h1>
                </th>
              </tr>
  
            </thead>
  
            <tbody>
  
            {cartItems && cartItems.map((product, index) => {
              return(
  
              <tr className='shadow-md bg-white text-[10px] md:text-[1rem] border-b-1 h-[60px] md:h-[70px]' key={index}>
  
                <td>
                  <Link to={`/product/${product._id}/details`}>
                    <img src={ product.images[0] } className='w-8 h-8 md:w-12 md:h-12 ml-2 rounded-full'/>
                  </Link>
                </td>
  
                <td className='font-bold'>{product.name}</td>
  
                <td className='font-bold'>{product.price}</td>
  
                <td className=''>
                  <div className="flex justify-center items-center">
                    <FaMinus className="cursor-pointer" onClick={() => handleDecrease(product)} />
                    <span className='mx-3'>{product.quantity}</span>
                    <FaPlus className="cursor-pointer" onClick={() => handleIncrease(product)} />
                  </div>
                </td>
  
                <td className='font-bold'>{product.total}</td>
  
                <td>
                  <FaTrash className="text-red-600 m-0 cursor-pointer" onClick={() => handleRemove(product._id)} />
                </td>
              </tr>
              )
              }) 
  
            }
            </tbody>
            </table>


            {cartItems.length !==0 && (
              <div className="flex gap-3 justify-center">
                <div className="w-full flex items-center justify-center py-3">
                  <button className="text-white font-bold mx-auto px-3 py-2 cursor-pointer rounded-md bg-red-300 hover:bg-red-600 transition-[0.7s] ease-in-out" onClick={() => dispatch(clearCart())}>Clear Cart</button>
                </div>
                <div className="w-full flex items-center justify-center  ">
                  {!clientSecret ? (
                      <button onClick={createPaymentIntent} className="py-2 px-4 mx-auto cursor-pointer bg-green-400 hover:bg-green-600 rounded-md text-white">Proceed with order</button>
                    ) : 

                    (
                    <div className="w-[75%] mx-auto">
                      <CardElement className="p-4" />
                      <button onClick={handlePayment} className="py-2 px-4text-sm cursor-pointer bg-green-400 hover:bg-green-600 rounded-md text-white" disabled={loading}>
                        {loading ? "Processing..." : "Pay"}
                      </button>
                    </div>
                    )
                  }
                </div>
              </div>
            )}
          </div>
        </div>
        )}
        
  
      </section>
  
  
      
      )
  
}