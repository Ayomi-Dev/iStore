
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { StripeProvider } from './contexts/StripeProvider.tsx'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './contexts/UserContext.tsx'
import { ProductListProvider } from './contexts/ProductsContext.tsx'
import {ToastContainer, Bounce} from 'react-toastify'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ProductListProvider>
          <StripeProvider>
            <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Bounce}
          />
            <App />
          </StripeProvider>
        </ProductListProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
)
