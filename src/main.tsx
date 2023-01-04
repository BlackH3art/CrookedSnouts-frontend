import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import MintContextProvider from './context/MintContext';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <MintContextProvider>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </MintContextProvider>
)
