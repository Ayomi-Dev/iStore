import { useUserContext } from "../../contexts/UserContext"


export const Info = () => {
  const { user } = useUserContext()
  return (
    <div className="block text-center bg-green-500 rounded-md shadow-md">
      <h1 className="text-white font-bold">Your Info</h1>
      <h1 className="text-white">{user?.name}</h1>
      <h1 className="text-white">{user?.email}</h1>
    </div>
  )
}
