import { Navigate, Outlet } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';

export const ProtectedRoute = (  ) => {
    const { user, isLoading } = useUserContext();
  
    if(isLoading){
      return <div>Loading....</div>
    }
    if(!user){
        return <Navigate to={`/login`} />
    }
  return (
    <>
      <Outlet />
    </>
  )
}
