import { FC, useContext, useEffect, useState } from "react";
import { MintContext } from "../../context/MintContext";

import { getIsWhitelisted, getNfts } from "../../api";
import { toast } from "react-toastify";
import { ethers } from 'ethers';

import PreMint from '../../images/pre-mint.svg';

import MainButton from "../_Reusable/MainButton";
import MainButtonMobile from "../_Reusable/MainButtonMobile";
import ClipLoader from 'react-spinners/ClipLoader';

import { collectionContractABI, collectionContractAddress } from "../../utils/constants";


const collectionContractProvider = () => {

  const provider = new ethers.providers.AlchemyProvider("maticmum");
  const collectionContract = new ethers.Contract(collectionContractAddress, collectionContractABI, provider);

  return collectionContract;
}

interface Props {
  
}

const Mint: FC<Props> = () => {

  const { connectWallet, connectedAccount, collectionContractSigner, setAccountNFTs } = useContext(MintContext);
  const [minted, setMinted] = useState<boolean>(false);
  const [generatedNFT, setGeneratedNFT] = useState<string>('');
  const [isUserWhitelisted, setIsUserWhitelisted] = useState<boolean>(false);

  const [requestedNumbers, setRequestedNumbers] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [pendingRequest, setPendingrequest] = useState<boolean>(false);

  const [collectionContract, setCollectionContract] = useState<ethers.Contract>();


  useEffect(() => {
    setCollectionContract(collectionContractProvider());
  }, []);

  useEffect(() => {
    async function isWhitelisted() {
      try {

        if(connectedAccount) {
          const { data } = await getIsWhitelisted(connectedAccount);
  
          if(data) {
            setIsUserWhitelisted(true);
          } else {
            setIsUserWhitelisted(false);
          }
        }
      } catch (error) {
        toast.error("Incorrect address", { theme: "colored" });
      }
    }

    isWhitelisted();
  }, [connectedAccount]);



  const requestNumbers = async () => {

    setLoading(true);

    try {
      
      const transactionHash = await collectionContractSigner?.requestNumbers({
        value: ethers.utils.parseEther(isUserWhitelisted ? "1" : "3")
      });
      await transactionHash.wait();
      
      setLoading(false);
      setRequestedNumbers(true);
      setPendingrequest(true);
  
    } catch (error) {
      setLoading(false);
      setPendingrequest(false);
      toast.error("Something went wrong", { theme: "colored" });
    }
  }

  collectionContract?.on("RequestFulfilled", async (num) => {
    try {
      const requestId = await collectionContract.addressToRequestId(connectedAccount);

      if(num._hex === requestId._hex) {
        setPendingrequest(false);
      } 

    } catch (error) {
      return null;
    }
  });


  const mint = async () => {
    
    setLoading(true);

    try {
      const transactionHash = await collectionContractSigner?.create();
      const receipt = await transactionHash.wait();
      
      const imageURI = receipt.events[1].args[0];
  
      setMinted(true);
      setGeneratedNFT(imageURI);
  
      const { data } = await getNfts(connectedAccount);
      setAccountNFTs(data);
  
      setLoading(false);
      setRequestedNumbers(false);

      toast.success("Crooked Snout minted! Checkout your wallet!", { theme: "colored" });

    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong", { theme: "colored" });
    }
  }


  return (
    <>
      <div className="w-full md:w-4/5 xl:w-3/5 h-[100vh] md:h-[60vh] flex flex-col-reverse justify-end items-center md:flex-row md:justify-around md:items-start">

        {connectedAccount ? (
          requestedNumbers ? (
            <MainButtonMobile callback={mint} disabled={loading || pendingRequest}>
              Finish mint!
            </MainButtonMobile>
          ) : (
            <MainButtonMobile callback={requestNumbers} disabled={loading || pendingRequest}>
              Mint!
            </MainButtonMobile>
          )
        ) : (
          <MainButtonMobile callback={connectWallet}>
            Connect wallet
          </MainButtonMobile>
        )}

        <div className="white-glassmorphism w-80 mt-10 md:mt-20">
          <img src={minted ? generatedNFT : PreMint} alt={minted ? "NFT image" : "pre-mint image"} />
        </div>

        <div className="mt-20 flex flex-col items-center">
          <h2 className="title font-bold text-3xl md:text-4xl lg:text-5xl pt-5">
            Public mint is live!
          </h2>

          <p className="text-xl font-semibold text-gray-100 md:text-2xl text-center md:pb-12">
            Join the Crooked Gang and mint your Snout!
          </p>

          {connectedAccount ? ( 
            requestedNumbers ? (
              <MainButton callback={mint} disabled={loading || pendingRequest}>
                {pendingRequest ? <div>Generating layers<ClipLoader color="white" size={"1.3rem"}/></div> : loading ? <ClipLoader color="white" size={"1.3rem"}/> : "Finish mint!"}
              </MainButton>
            ) : (
              <MainButton callback={requestNumbers} disabled={loading || pendingRequest}>
                {loading ? <ClipLoader color="white" size={"1.3rem"}/> : "Mint!"}
              </MainButton>
            )
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