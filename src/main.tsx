import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import MintContextProvider from './context/MintContext';

import { WagmiConfig, createClient, configureChains } from 'wagmi';
import { polygon } from 'wagmi/chains';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider, webSocketProvider } = configureChains(
  [polygon],
  [publicProvider()],
)

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
  connectors: [
    new MetaMaskConnector({ chains }),
  ]
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <WagmiConfig client={client}>
    <MintContextProvider>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </MintContextProvider>
  </WagmiConfig>
)
