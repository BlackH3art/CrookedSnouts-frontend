import { FC, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getNfts } from "../../api";
import { MintContext } from "../../context/MintContext";
import NFTsCard from "./NFTsCard";

import NoItemThere from "./NoItemThere";


const YourCollection: FC = () => {

  const { connectedAccount, setAccountNFTs, accountNFTs } = useContext(MintContext);

  const getNftsData = async () => {
    try {
      const { data } = await getNfts(connectedAccount);
      setAccountNFTs(data);
      
    } catch (error) {
      toast.error("Problem fetching your Crooked Snouts", { theme: "colored" });
    }
  }
  
  useEffect(() => {
    if(connectedAccount) {
      getNftsData();
    }
  }, [connectedAccount]);

  

  return (
    <>
      <section className="your-collection w-full min-h-[40vh] flex justify-center">
        <div className="w-full md:w-4/5 lg:w-3/5 min-h-[60vh] flex flex-col">

          <h2 className="title font-bold text-3xl md:text-4xl lg:text-5xl pb-10 pt-20 px-5">
            Your collection
          </h2>

          <div className="w-full flex flex-wrap items-center">

            {accountNFTs.length === 0 ? (
              <>
                <NoItemThere />
                <NoItemThere />
                <NoItemThere />
              </>
            ) : accountNFTs.sort((a, b) => Number(b.tokenId) - Number(a.tokenId)).map(item => (
              <NFTsCard key={item.tokenId} tokenId={item.tokenId} image={item.image} />
            ))}

          </div>

        </div>
      </section>
    </>
  )
}

export default YourCollection;