import { useUserContext } from '../contexts/UserContext'
import { Navigate, Outlet } from 'react-router-dom';

export const AdminRoute = () => {
    const { user, isLoading } = useUserContext();
    if(isLoading){
      return <div>Loading...</div>
    }
    if(!user)return <Navigate to={`/login`} />
    if(!user.isAdmin) return <Navigate to={`/`} />
    
    return (
      <Outlet />
  )
}
