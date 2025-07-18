import { Navigate, Outlet } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';

export const ProtectedRoute = (  ) => {
    const { user } = useUserContext();
  
    
    if(!user){
        return <Navigate to={`/login`} />
    }
  return (
    <>
      <Outlet />
    </>
  )
}
