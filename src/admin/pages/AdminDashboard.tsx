import { Link } from "react-router-dom"
import { useUserContext } from "../../contexts/UserContext"
import { PageWrapper } from "../../utils/PageWrapper"


export const AdminDashboard = () => {
    const { user } = useUserContext()
  return (
    <PageWrapper>
        <div>Welcome Admin, {user?.name}</div>
    </PageWrapper>
  )
}
