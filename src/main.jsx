import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import './index.css'
import { AuthProvider } from './contexts/AuthContext'
import { Toaster } from 'react-hot-toast'

// Use mock services for development
// In production, you would use the real services
// This allows you to develop and test without Firebase credentials
const useMockServices = true

if (useMockServices) {
  console.log('Using mock services for development')
  // This would be replaced with your actual Firebase config in production
  window.mockMode = true
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <AuthProvider>
          <App />
          <Toaster position="top-right" />
        </AuthProvider>
      </HelmetProvider>
    </BrowserRouter>
  </StrictMode>,
)