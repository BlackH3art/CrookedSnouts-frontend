import { Routes, Route, Navigate } from "react-router-dom";

import Navigation from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";
import DappBody from "./components/DappBody/DappBody";
import ErrorPage from "./components/ErrorPage/ErrorPage";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { WagmiConfig, createClient, configureChains, mainnet } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
 
const { chains, provider, webSocketProvider } = configureChains(
  [mainnet],
  [publicProvider()],
)
 
const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
})

function App() {

  return (
    <WagmiConfig client={client}>
      <div className="w-full min-h-[100vh]">

        <Navigation />

        <ToastContainer />

        <Routes>
          <Route path="/" element={<DappBody />} />
          <Route path="/404" element={<ErrorPage />} />
          <Route path="*" element={ <Navigate to="/404" /> } />
        </Routes>


        <Footer />
        
      </div>
    </WagmiConfig>
  )
}

export default App;
