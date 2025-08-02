import { useSelector } from 'react-redux'
import {type AppDispatch, type RootState } from '../redux/store'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { fetchUserOrders } from '../redux/orderSlice'
import { useDispatch } from 'react-redux'

export const OrderCard = () => {
    const { orders } = useSelector((state: RootState) => state.order)
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        dispatch(fetchUserOrders())
  }, [dispatch])
  
    
  return (
    <ul className="block w-[25%]"> 
        <h1 className='text-center font-bold'>Recent Orders</h1>
        {orders
        .slice()
        .sort((a, b) => new Date(b.paidAt).getTime() - new Date(a.paidAt).getTime())
        .map((order, index) => {
            return (
                <li  key={index} className='shadow-md rounded-md px-4'>
                         <span className="font-bold">{new Date(order.paidAt).toLocaleString()}</span>
                    <Link to={`/order/summary/${order._id}`} className="flex justify-between gap-4 items-center my-3">
                        <span>{order.totalQuantity} items</span>
                         <img src={order.orderItems[0].image} className='h-[40px] w-40px] rounded-[50%]' alt="" /> 
                         <span className="font-bold text-pink-600">${order.totalAmount}</span>
                    </Link>
                </li>
                )
            }
        )}
    </ul>
  )
}
