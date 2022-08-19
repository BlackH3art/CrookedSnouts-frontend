import { ethers } from "ethers";
import { useState, useEffect, createContext, FC, ReactNode } from "react";
import { toast } from "react-toastify";
import { AppContextInterface } from "../interfaces/AppContextInterface";
import { MintContextInterface } from "../interfaces/MintContextInterface";
import { NFTsResponseInterface } from "../interfaces/NFTsResponseInterface";
import { collectionContractABI, collectionContractAddress } from "../utils/constants";

const { ethereum } = window;

export const MintContext = createContext<MintContextInterface>({
  collectionContractSigner: null,
  signer: null,
  connectWallet: () => {},
  connectedAccount: "",

  accountNFTs: [],
  setAccountNFTs: () => {}
});

const getSigner = () => {

  if(!ethereum) {
    console.warn('No Metamask detected');
    return null;
  }

  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();

  return signer;
}

const getContractSigner = () => {
  const signer = getSigner();

  if(!signer) {
    console.warn('There\'s no signer');
    return null;
  }
  const collectionContract = new ethers.Contract(collectionContractAddress, collectionContractABI, signer);

  return collectionContract;
}





interface Props {
  children: ReactNode;
}

const MintContextProvider: FC<Props> = ({ children }) => {

  const collectionContractSigner = getContractSigner();
  const signer = getSigner();

  const [connectedAccount, setConnectedAcount] = useState<string>('');
  const [accountNFTs, setAccountNFTs] = useState<NFTsResponseInterface[]>([]);


  



  
  ethereum?.on('accountsChanged', (accounts: string[]) => {
    if(ethereum.isConnected()) {
      requestAndSetConnectedAccount();
    } else {
      setConnectedAcount('');
    }
  });
  
  ethereum?.on('chainChanged', () => window.location.reload());
  
  
  const requestAndSetConnectedAccount = async () => {
    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      setConnectedAcount(accounts[0]);
    } catch (error) {
      console.warn('Not connected');   
    }
  }
  
  const connectWallet = async () => {
    
    // try {
      
    //   // if no metamask then prompt an error toast
    //   if(!ethereum) {
    //     toast.error("You need MetaMask. Please visit: https://metamask.io/", { theme: "colored" }); 
        
        
    //     // if network different than mumbai, then prompt an error toast
    //   } else if(parseInt(await ethereum.request({ method: 'eth_chainId' }), 16) !== 80001) {
    //     toast.error("Change network to: Polygon mainnet", { theme: "colored" }); 
        
        
    //     // everything is good - connect wallet
    //   } else {
    //     try {
    //       const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    //       setConnectedAcount(accounts[0]);
    //     } catch (error) {
    //       toast.error("Requesting your account failed", { theme: "colored" }); 
    //     }
        
    //   }
    // } catch (error) {
    //   toast.error("Unexpected error while connecting wallet", { theme: "colored" }); 
    // }



    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      setConnectedAcount(accounts[0]);
    } catch (error) {
      toast.error("Requesting your account failed", { theme: "colored" }); 
    }
  }
  
  useEffect(() => {

    if(!ethereum) {
      console.warn('MetaMask is not installed on this browser.')
    } else {
      
      if(ethereum.isConnected()) {
        // requestAndSetConnectedAccount();
      } 
    }

  }, []);


  return (
    <MintContext.Provider value={{
      collectionContractSigner,
      signer,

      connectedAccount,
      connectWallet, 

      accountNFTs,
      setAccountNFTs
    }}>
      {children}
    </MintContext.Provider>
  )
}

export default MintContextProvider;