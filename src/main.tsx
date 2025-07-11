
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { StripeProvider } from './contexts/StripeProvider.tsx'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StripeProvider>
      <App />
    </StripeProvider>
  </StrictMode>
)
