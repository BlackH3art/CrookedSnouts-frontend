import { Routes, Route, Navigate } from "react-router-dom";

import Navigation from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";
import DappBody from "./components/DappBody/DappBody";
import ErrorPage from "./components/ErrorPage/ErrorPage";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
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
  )
}

export default App;
