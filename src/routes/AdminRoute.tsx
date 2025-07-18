import { useUserContext } from '../contexts/UserContext'
import { Navigate, Outlet } from 'react-router-dom';

export const AdminRoute = () => {
    const { user } = useUserContext();

    if(!user)return <Navigate to={`/login`} />
    if(!user.isAdmin) return <Navigate to={`/`} />
    
    return (
      <Outlet />
  )
}
