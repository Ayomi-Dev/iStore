import { Link } from "react-router-dom"
import { useUserContext } from "../../contexts/UserContext"
import { PageWrapper } from "../../utils/PageWrapper"
import { FaUserAltSlash } from "react-icons/fa"


export const AdminDashboard = () => {
    const { adminUsers } = useUserContext()

  return (
    <PageWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full rounded-md shadow-md">
          <Link to={`/admin/users`} className="h-[200px] flex items-center justify-center flex-col bg-green-500 rounded-md shadow-lg">
            <h1 className="text-white rounded-md font-bold">Users</h1>
            <p className="text-white">{adminUsers.length}</p>
            <FaUserAltSlash className='text-2xl' />
          </Link>
          <Link to={`/admin/orders`} className="h-[200px] flex items-center justify-center flex-col bg-green-500 rounded-md shadow-lg">
            <h1 className="text-white rounded-md font-bold">Users</h1>
            <p className="text-white">{adminUsers.length}</p>
            <FaUserAltSlash className='text-2xl' />
          </Link>
          <Link to={`/admin/`} className="h-[200px] flex items-center justify-center flex-col bg-green-500 rounded-md shadow-lg">
            <h1 className="text-white rounded-md font-bold">Users</h1>
            <p className="text-white">{adminUsers.length}</p>
            <FaUserAltSlash className='text-2xl' />
          </Link>
        </div>
    </PageWrapper>
  )
}
