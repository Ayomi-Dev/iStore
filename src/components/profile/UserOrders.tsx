import { useSelector } from 'react-redux'
import type { RootState } from '../../redux/store'
import { FaMoneyBillTransfer } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

export const UserOrders = () => {
  const { orders } = useSelector((state:RootState) => state.order)
  return (
    <div className="flex w-full md:w-[45%] h-[250px] flex-col items-center justify-center bg-yellow-500 rounded-md shadow-md">
      <FaMoneyBillTransfer className='text-2xl' />
      <h1 className="text-white font-bold">Your Orders</h1>
      <p className="text-white">You have made {orders.length} orders so far</p>
      <Link to={`/orders/history`} className='font-bold underline'> Go to orders</Link>
    </div>
  )
}
