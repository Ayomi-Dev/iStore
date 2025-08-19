import { Link } from "react-router-dom"
import { useUserContext } from "../../contexts/UserContext"
import { PageWrapper } from "../../utils/PageWrapper"
import { FaUserCheck } from "react-icons/fa"
import { useSelector } from "react-redux"
import type{ AppDispatch, RootState } from "../../redux/store"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { getAllOrders } from "../../redux/orderSlice"
import { FaGears, FaMoneyBillTransfer } from "react-icons/fa6"



export const AdminDashboard = () => {
    const { adminUsers, getAdminUsers } = useUserContext()
    const { orderList } = useSelector((state: RootState) => state.order)
    const dispatch = useDispatch<AppDispatch>();
    


    useEffect(() => {
      getAdminUsers();
      dispatch(getAllOrders())
    }, [])

  return (
    <PageWrapper>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full ">
        <Link to={`/admin/users`} className="h-[200px] flex items-center justify-center flex-col bg-green-500 rounded-md shadow-lg">
          <FaUserCheck className='text-3xl text-white' />
          <h1 className="text-white rounded-md font-bold">Users</h1>
          <p className="text-white">{adminUsers.length} in use</p>
        </Link>
        <Link to={`/admin/orders`} className="h-[200px] flex items-center justify-center flex-col bg-blue-500 rounded-md shadow-lg">
          <FaMoneyBillTransfer className='text-3xl text-white' />
          <h1 className="text-white rounded-md font-bold">Orders</h1>
          <p className="text-white">{orderList.length} orders made</p>
        </Link>
        <Link to={`/admin/`} className="h-[200px] flex items-center justify-center flex-col bg-yellow-500 rounded-md shadow-lg">
          <FaGears className='text-3xl text-white' />
          <h1 className="text-white rounded-md font-bold">Settings</h1>
          <p className="text-white">{adminUsers.length}</p>
        </Link>
      </div>
    </PageWrapper>
  )
}
