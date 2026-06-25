import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import PhoneFrame from './components/PhoneFrame.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PhoneFrame>
      <AuthProvider>
        <App />
      </AuthProvider>
    </PhoneFrame>
  </React.StrictMode>,
)
