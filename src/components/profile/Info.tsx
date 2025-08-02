import { FaUserAlt, FaUserEdit } from "react-icons/fa"
import { useUserContext } from "../../contexts/UserContext"


export const Info = () => {
  const { user } = useUserContext()
  return (
    <div className="flex flex-col items-center justify-center bg-green-500 rounded-md shadow-md">
      <FaUserAlt className="text-2xl"/>
      <h1 className="text-white font-bold">Your Info</h1>
      <h1 className="text-white">{user?.name}</h1>
      <h1 className="text-white">{user?.email}</h1>

      <span className="mt-3 flex items-center gap-3">Edit Profile<FaUserEdit /></span>
    </div>
  )
}
 