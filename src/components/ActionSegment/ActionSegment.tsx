import { FC } from "react";
import Mint from "./Mint";
import Whitelist from "./Whitelist";


const ActionSegment: FC = () => {

  
  return (
    <>
      <section className="mint-segment w-full min-h-[80vh] flex justify-center items-center">

        <Mint />
        {/* <Whitelist /> */}
        
      </section>
    </>
  )
}

export default ActionSegment;