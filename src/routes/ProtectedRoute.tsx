import React, { type ReactNode } from 'react'
import { Navigate } from 'react-router-dom';

export const ProtectedRoute: React.FC<{children : ReactNode}> = ( { children } ) => {
    const token = localStorage.getItem('token');
    
    if(!token){
        return <Navigate to={`/login`} />
    }
  return (
    <>
        { children }
    </>
  )
}
