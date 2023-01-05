import { FC, useContext, useEffect, useState } from "react";
import { MintContext } from "../../context/MintContext";

import { getIsWhitelisted, getNfts } from "../../api";
import { toast } from "react-toastify";
import { ethers } from 'ethers';

import PreMint from '../../images/pre-mint.svg';

import MainButton from "../_Reusable/MainButton";
import MainButtonMobile from "../_Reusable/MainButtonMobile";
import ClipLoader from 'react-spinners/ClipLoader';
import BarLoader from 'react-spinners/BarLoader';

import { collectionContractABI, collectionContractAddress, networkRPC } from "../../utils/constants";
import { useContract, useContractEvent, useSigner } from "wagmi";


const Mint: FC = () => {

  const { connectWallet, connectedAccount, setAccountNFTs } = useContext(MintContext);
  const [minted, setMinted] = useState<boolean>(false);
  const [generatedNFT, setGeneratedNFT] = useState<string>('');
  const [isUserWhitelisted, setIsUserWhitelisted] = useState<boolean>(false);

  const [requestedNumbers, setRequestedNumbers] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [pendingRequest, setPendingrequest] = useState<boolean>(false);

  const { data: signer } = useSigner();

  const contractProvider = useContract({
    address: collectionContractAddress,
    abi: collectionContractABI,
    signerOrProvider: new ethers.providers.InfuraProvider(networkRPC)
  });

  const contractSigner = useContract({
    address: collectionContractAddress,
    abi: collectionContractABI,
    signerOrProvider: signer
  });


  const checkIfRequested = async () => {
    try {
      setLoading(true);
      if(contractProvider && connectedAccount) {
        
        const requestId = await contractProvider.addressToRequestId(connectedAccount);
        const requestMinted = await contractProvider.requestIdMinted(requestId._hex);

        if(requestMinted || requestId._hex === '0x00') {
          setLoading(false);
        } else {
          setLoading(false);
          setRequestedNumbers(true);
        }
      }
      
    } catch (error) {
      setLoading(false);
      toast.error("Error checking request id", { theme: "colored" });
    }
  }

  const isWhitelisted = async () => {
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

  useEffect(() => {
    checkIfRequested();
  }, [connectedAccount]);


  useEffect(() => {
    isWhitelisted();
  }, [connectedAccount]);


  const requestNumbers = async () => {

    setLoading(true);

    try {
      
      const transactionHash = await contractSigner?.requestNumbers({
        value: ethers.utils.parseEther(isUserWhitelisted ? "1" : "3")
      });
      await transactionHash.wait();
      
      setLoading(false);
      setRequestedNumbers(true);
      setPendingrequest(true);
  
    } catch (error: any) {
      setLoading(false);
      setPendingrequest(false);
      toast.info(error.message, { theme: "colored" });
    }
  }

  
  const mint = async () => {
    
    setLoading(true);
    
    try {
      const transactionHash = await contractSigner?.create();
      const receipt = await transactionHash.wait();
      
      const imageURI = receipt.events[1].args[0];
      
      setMinted(true);
      setGeneratedNFT(imageURI);
      
      const { data } = await getNfts(connectedAccount);
      setAccountNFTs(data);
      
      setLoading(false);
      setRequestedNumbers(false);
      
      toast.success("Crooked Snout minted! Checkout your wallet!", { theme: "colored" });
      
    } catch (error: any) {
      setLoading(false);
      toast.error(error.message, { theme: "colored" });
    }
  }
  

  const handleFulfilled = async (num: any) => {
    try {
      const requestId = await contractProvider?.addressToRequestId(connectedAccount);

      if(num._hex === requestId._hex) {
        setPendingrequest(false);
      } 

    } catch (error) {
      return null;
    }
  }

  useContractEvent({
    address: collectionContractAddress,
    abi: collectionContractABI,
    eventName: 'RequestFulfilled',
    listener(num) {
      handleFulfilled(num);
    },
  });

  
  return (
    <>
      <div className="w-full md:w-4/5 xl:w-3/5 h-[100vh] md:h-[60vh] flex flex-col-reverse justify-end items-center md:flex-row md:justify-around md:items-start">

        {connectedAccount ? (
          requestedNumbers ? (
            <MainButtonMobile callback={mint} disabled={loading || pendingRequest}>
              {pendingRequest ? (
                  <div className="flex flex-col pb-4 items-center">
                    <p className="text-md pb-2">Generating layers</p>
                    <BarLoader color="white" />
                  </div>
                ) : loading ? <ClipLoader color="white" size={"1.3rem"}/> : "Finish mint!"}
            </MainButtonMobile>
          ) : (
            <MainButtonMobile callback={requestNumbers} disabled={loading || pendingRequest}>
              {loading ? <ClipLoader color="white" size={"1.3rem"}/> : "Mint!"}
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
                {pendingRequest ? (
                  <div className="flex flex-col pb-4 items-center">
                    <p className="text-md pb-2">Generating layers</p>
                    <BarLoader color="white" />
                  </div>
                ) : loading ? <ClipLoader color="white" size={"1.3rem"}/> : "Finish mint!"}
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