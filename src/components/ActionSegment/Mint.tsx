import { FC, useContext, useState } from "react";
import { generateSVG } from "../../api";
import { AppContext } from "../../context/AppContext";
import MainButton from "../_Reusable/MainButton";
import PreMint from '../../images/pre-mint.svg';
import MainButtonMobile from "../_Reusable/MainButtonMobile";



interface Props {
  
}

const Mint: FC<Props> = () => {

  const { connectWallet, connectedAccount } = useContext(AppContext);
  const [minted, setMinted] = useState<boolean>(false);
  const [generatedNFT, setGeneratedNFT] = useState<string>('');


  const mint = async () => {

    const { data } = await generateSVG();
    
    const base64String = btoa(String.fromCharCode(...new Uint8Array(data.data)));

    setMinted(true);
    setGeneratedNFT(base64String);
  }

  return (
    <>
      <div className="w-full md:w-4/5 xl:w-3/5 h-[100vh] md:h-[60vh] flex flex-col-reverse justify-end items-center md:flex-row md:justify-around md:items-start">

        {connectedAccount ? (
          <MainButtonMobile callback={mint}>
            Mint Crooked Snout!
          </MainButtonMobile>
        ) : (
          <MainButtonMobile callback={connectWallet}>
            Connect wallet
          </MainButtonMobile>
        )}

        <div className="white-glassmorphism w-80 mt-10 md:mt-20">
          <img src={minted ? `data:image/svg+xml;base64,${generatedNFT}` : PreMint} alt={minted ? "NFT image" : "pre-mint image"} />
        </div>

        <div className="mt-20 flex flex-col items-center">
          <h2 className="title font-bold text-3xl md:text-4xl lg:text-5xl pt-5">
            Public mint is live!
          </h2>

          <p className="text-xl font-semibold text-gray-100 md:text-2xl text-center md:pb-12">
            Join the Crooked Gang and mint your Snout!
          </p>

          {connectedAccount ? (
            <>
              <MainButton callback={mint}>
                Mint Crooked Snout!
              </MainButton>
            </>
          ) : (
            <>
              <MainButton callback={connectWallet}>
                Connect wallet
              </MainButton>
            </>
          )}
          
        </div>

      </div>
    </>
  )
}

export default Mint;