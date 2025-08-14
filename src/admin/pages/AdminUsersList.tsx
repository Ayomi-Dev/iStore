
import { useUserContext } from "../../contexts/UserContext"
import { PageWrapper } from "../../utils/PageWrapper"
import { FaTrash } from "react-icons/fa6"

export const AdminUsersList = () => {
    const { adminUsers, deleteUser } = useUserContext()
    
  return (
    <PageWrapper>
        {adminUsers.length > 0 ? (
            <ul className="block">
                {adminUsers.map(user => {
                    return(
                        <li key={user._id}>{user.name} <FaTrash onClick={() => deleteUser(user._id)} /> </li>
                    )
                })}
            </ul>
        ):
        (
            <h1>Cannot get users right now</h1>
        )
    }
    </PageWrapper>
    
  )
}
