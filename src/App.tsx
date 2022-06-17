import Main from "./components/Main/Main";
import MintSegment from "./components/ActionSegment/ActionSegment";
import Navigation from "./components/Navigation/Navigation";
import YourCollection from "./components/YourCollection/YourCollection";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Creator from "./components/Creator/Creator";
import Footer from "./components/Footer/Footer";
import Roadmap from "./components/Roadmap/Roadmap";
import About from "./components/About/About";

function App() {

  return (
    <div className="w-full min-h-[100vh]">

      <Navigation />

      <ToastContainer />

      <Main />
      <MintSegment />
      <YourCollection />
      <About />
      <Roadmap />
      <Creator />

      <Footer />
      
    </div>
  )
}

export default App;
