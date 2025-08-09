import { PageWrapper } from "../utils/PageWrapper";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {type Order } from "../redux/orderSlice";
import axios from "axios";


export const OrderSummary = () => {
    const { id } = useParams()
    const [currentOrder, setCurrentOrder] = useState<Order>()
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const getOrder = async () => { 
        setLoading(true)
        setError("");

        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/orders/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setLoading(false);
            setError('');
            setCurrentOrder(data)
        } catch (error) {
            console.log(error);
            setError("Unable to fetch order at this time!")
        }
        finally{
            setError("")
            setLoading(false)
        }
    }
    useEffect(() => {
        getOrder()
    }, [])
  return (
    <PageWrapper >
        {loading && <div className="w-[500px] h-[500px] mx-auto flex items-center justify-center">Loading...</div> }
        {currentOrder && (

        <div className="w-full md:w-[60%] mx-auto px-3 rounded-md bg-white h-[500px] flex flex-col items-center justify-center">
            <div className="mb-4 rounded">
                <p className="my-4 block"><strong>Total Price:</strong> ${currentOrder?.totalAmount}.00</p>
                <p className="my-4 block"><strong>Total Items:</strong> {currentOrder?.totalQuantity}</p>
                <p className="my-4 block"><strong>Payment ID:</strong> {currentOrder?.paymentIntentId}</p>
                <p className="my-4 block"><strong>Date:</strong> {new Date(currentOrder?.paidAt).toLocaleString()}</p>
                <ul className="mt-2">
                    {currentOrder?.orderItems.map((item, index) => (
                        <li className=" my-3" key={index}>
                            <Link to={`/product/${item.product}/details`} className="hover:underline flex justify-between items-center">
                                <img className="h-10 w-10 rounded-[50%] object-cover" src={item.image} alt={item.name} />
                                <span className="font-bold text-sm md:text-xl">{item.name} - {item.quantity} x ${item.price}.00</span>
                                <span className="font-bold text-[10px] md:text-xl ml-1 text-pink-500">${item.total}.00</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex">
                <Link to="/orders/history" className="hover:bg-pink-500 bg-black text-white px-4 py-2 rounded">
                    See All Order
                </Link>
            </div>
        </div>
        )
        }
       {error && <div className="w-[500px] h-[500px] mx-auto flex items-center justify-center">Error: {error}</div> }
    </PageWrapper>
  )
}
