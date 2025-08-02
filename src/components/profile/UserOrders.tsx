import React from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../../redux/store'

export const UserOrders = () => {
  const { orders } = useSelector((state:RootState) => state.order)
  return (
    <div className="block text-white bg-yellow-500 rounded-md shadow-md p-3">
      <h1>Orders</h1>
      <p className="text-white">You have made {orders.length} orders so far</p>
    </div>
  )
}
