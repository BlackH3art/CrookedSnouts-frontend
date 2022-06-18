import { FC } from "react";
import About from "../About/About";
import ActionSegment from "../ActionSegment/ActionSegment";
import Collection from "../Collection/Collection";
import Creator from "../Creator/Creator";
import Main from "../Main/Main";
import Roadmap from "../Roadmap/Roadmap";
import YourCollection from "../YourCollection/YourCollection";


const DappBody: FC = () => {

  return (
    <>
      <Main />
      <ActionSegment />
      <Collection />
      {/* <YourCollection /> */}
      <About />
      <Roadmap />
      <Creator />
    </>
  )
}

export default DappBody