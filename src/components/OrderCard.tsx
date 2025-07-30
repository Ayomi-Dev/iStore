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
        console.log(orders, 'orders here')
  }, [dispatch])
  

    
  return (
    <ul className="block"> 
        {orders.map((order, index) => {
            return (
                <li  key={index}>
                    <Link to={`/order/summary/${order._id}`} className="flex justify-between gap-4 items-center my-3 border">
                         <img src={order.orderItems[0].image} className='h-[40px] w-40px] rounded-[50%]' alt="" /> 
                         <span className="font-bold">{order.totalAmount}</span>
                         <span className="font-bold text-pink-500">{order.paidAt}</span>
                    </Link>
                </li>
                )
            }
        )}
    </ul>
  )
}
