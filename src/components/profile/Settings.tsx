import { FaGears } from "react-icons/fa6"

export const Settings = () => {
  return (
    <div className="bg-blue-500 w-full md:w-[45%] h-[250px] flex flex-col items-center justify-center shadow-md rounded-md">
      <h1>Edit your profile</h1>
      <FaGears className="text-4xl text-white mx-auto my-4" />
      <p className="text-white">This feature is under development.</p>
    </div>
  )
}
