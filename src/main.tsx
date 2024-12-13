import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './router'
import { HelmetProvider } from 'react-helmet-async'
import { AuthProvider } from './context/AuthContext';

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')

const root = createRoot(rootElement)
root.render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>
)