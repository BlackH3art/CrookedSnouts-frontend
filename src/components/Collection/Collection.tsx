import { FC } from "react";
import Table from "./Table";

const Collection: FC = () => {

  return (
    <>
      <section className="your-collection w-full min-h-[40vh] flex justify-center">
        <div className="w-full lg:w-4/5 xl:w-3/5 min-h-[60vh] flex flex-col items-center">

          <h2 className="title w-full text-right font-bold text-3xl md:text-4xl lg:text-5xl pb-10 pt-20 px-5">
            Collection
          </h2>

          <div className="w-full flex flex-col items-center">

            <p className="text-lg md:text-xl text-center px-2">
              We are 10.000 decentralized, completely randomized, unique, on-chain generated SVG NFTs collection of broke and ugly af Crooked Snouts living on Polygon chain!
            </p>
            <p className="text-lg md:text-xl text-center pb-10 px-2">
              Join the useless gang and mint yourself a cheap and ugly Crooked Snout!
            </p>

    
            <Table />
   

          </div>

        </div>
      </section>
    </>
  )
}

export default Collection;