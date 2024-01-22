import React from 'react'
import ReactDOM from 'react-dom/client'
import { UserContextProvider } from "./context/UserContext";
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </React.StrictMode>,
)
