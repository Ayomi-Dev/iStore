import { Route,  Routes, useLocation } from 'react-router-dom'
import { UserProfile } from '../pages/UserProfile'
import { Login } from '../pages/Login'
import { SignUp } from '../pages/SignUp'
import { ProductsList } from '../pages/Products'
import { CartPage } from '../pages/CartPage'
import { Home } from '../pages/Home'
import { Order } from '../pages/Order'
import { AnimatePresence } from 'framer-motion'
import { ProtectedRoute } from './ProtectedRoute'
import { ProductDetails } from '../pages/ProductDetails'
import { AdminRoute } from './AdminRoute'
import { AdminDashboard } from '../pages/AdminDashboard'
import { CreateProduct } from '../pages/CreateProduct'


export const PageRoutes = () => {
  const location = useLocation()
  return (
    <div className="flex-1 m-4">

    <AnimatePresence mode='wait' initial={false}>

      <Routes location={location} key={location.pathname}>

        <Route path='/' element = { <Home />}></Route>
        <Route path='/product/:id' element = { <ProductDetails />}></Route>

        <Route  element = { <ProtectedRoute />}>
          <Route path='/profile' element = { <UserProfile />} />
          <Route path='/cart' element = { <CartPage />} />
          <Route path='/order' element = { <Order />} />
        </Route>
        
        <Route path='/login' element = {<Login />}> </Route>
        <Route path= '/sign-up' element = { <SignUp />}></Route>
        <Route path='/products' element = { <ProductsList />}></Route>

        <Route element={ <AdminRoute />}>
          <Route path={`/admin/dashboard`} element={ <AdminDashboard />} />
          <Route path={`/add-new-product`} element={ <CreateProduct />} />
        </Route>
          
      </Routes>

    </AnimatePresence>
    </div>
  )
}
