import { Route,  Routes, useLocation } from 'react-router-dom'
import { UserProfile } from '../pages/UserProfile'
import { Login } from '../pages/Login'
import { SignUp } from '../pages/SignUp'
import { Products } from '../pages/Products'
import { CartPage } from '../pages/CartPage'
import { Home } from '../pages/Home'
import { Order } from '../pages/Order'
import { AnimatePresence } from 'framer-motion'
import { ProtectedRoute } from './ProtectedRoute'


export const PageRoutes = () => {
  const location = useLocation()
  return (
    <div className="flex-1 m-4">

    <AnimatePresence mode='wait' initial={false}>

      <Routes location={location} key={location.pathname}>

          <Route path='/' element = { <Home />}></Route>
          <Route path='/profile' element = 
          {
            <ProtectedRoute>
              <UserProfile /> 
            </ProtectedRoute>
          }>
          </Route>
          <Route path='/login' element = {<Login />}> </Route>
          <Route path= '/sign-up' element = { <SignUp />}></Route>
          <Route path='/products' element = { <Products />}></Route>
          <Route path='/cart' element = { 
            
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
            
            }>
          </Route>

          
          <Route path='/order' element = { 
            <ProtectedRoute>
              <Order />
            </ProtectedRoute> 
          }>
          </Route>
      </Routes>

    </AnimatePresence>
    </div>
  )
}
