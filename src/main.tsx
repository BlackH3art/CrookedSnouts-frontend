import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import AppContextProvider from './context/AppContext'
import { BrowserRouter } from "react-router-dom";
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AppContextProvider>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </AppContextProvider>
)
