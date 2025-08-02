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
import { AdminDashboard } from '../admin/pages/AdminDashboard'
import { CreateProduct } from '../admin/components/CreateProduct'
import { AdminProducts } from '../admin/pages/AdminProducts'
import { EditProduct } from '../admin/pages/EditProduct'
import { OrderSummary } from '../pages/OrderSummary'
import { WishList } from '../pages/WishList'



export const PageRoutes = () => {
  const location = useLocation()
  return (
    <div className="flex-1">

      <AnimatePresence mode='wait' initial={false}>
    
        <Routes location={location} key={location.pathname}> 
    
          <Route path='/' element = { <Home />}></Route>
          <Route path='/product/:id/details' element = { <ProductDetails />}></Route>
    
          <Route  element = { <ProtectedRoute />}>
            <Route path='/profile' element = { <UserProfile />} />  
            <Route path='/cart' element = { <CartPage />} />
            <Route path='/orders/history' element = { <Order />} />
            <Route path='/order/summary/:id' element = { <OrderSummary />} />
            <Route path='/my-wishlist' element = { <WishList />} />
          </Route>
           
          <Route path='/login' element = {<Login />}> </Route>
          <Route path= '/sign-up' element = { <SignUp />}></Route>
          <Route path='/products' element = { <ProductsList />}></Route> 
    
          <Route element={ <AdminRoute />}>
            <Route path={`/admin/dashboard`} element={ <AdminDashboard />} />
            <Route path={`/admin/add-new-product`} element={ <CreateProduct />} />
            <Route path={`/admin/products`} element={ <AdminProducts />} />
            <Route path={`/admin/products/edit/:id`} element={ <EditProduct />} />
          </Route>
            
        </Routes>
    
      </AnimatePresence>
    </div>
  )
}
