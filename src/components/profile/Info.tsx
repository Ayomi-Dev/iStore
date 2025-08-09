import { FaUserAlt, FaUserEdit } from "react-icons/fa"
import { useUserContext } from "../../contexts/UserContext"
import { Link } from "react-router-dom"


export const Info = () => {
  const { user } = useUserContext()
  
  return (
    <div className="flex flex-col w-full md:w-[45%] h-[250px] items-center justify-center bg-green-500 rounded-md shadow-md">
      <FaUserAlt className="text-2xl"/>
      <h1 className="text-white font-bold">Your Info</h1>
      <h1 className="text-white"><span className="font-bold mr-4">Username: </span>{user?.name}</h1>
      <h1 className="text-white"><span className="font-bold mr-4">Email: </span>{user?.email}</h1>
      <h1 className="text-white"><span className="font-bold mr-4">Address: </span>{user?.address}</h1>
      <h1 className="text-white"><span className="font-bold mr-4">Phone:</span> +234{user?.phone}</h1>

      <Link to={`/profile/edit/${user?._id}`} className="mt-3 flex items-center font-bold underline gap-3">Edit Profile<FaUserEdit /></Link>
    </div>
  )
}
 