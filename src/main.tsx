
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { StripeProvider } from './contexts/StripeProvider.tsx'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './contexts/UserContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <StripeProvider>
          <App />
        </StripeProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
)
