import { ethers } from "ethers";
import { useState, useEffect, createContext, FC, ReactNode } from "react";
import { toast } from "react-toastify";
import { getMaxOwnerWhitelistSpots, getMaxPublicWhitelistSpots, getMaxWhitelistSpots, getOwnerSpotsTaken, getPublicSpotsTaken, getWhitelistClose, getWhitelistOpen } from "../api";
import { AppContextInterface } from "../interfaces/AppContextInterface";
import { whitelistContractABI, whitelistContractAddress } from "../utils/constants";

const { ethereum } = window;

export const AppContext = createContext<AppContextInterface>({
  connectWallet: () => {},
  connectedAccount: '',

  maxWhitelistSpots: 0,
  maxPublicSpots: '',
  maxOwnerSpots: '',

  takenPublicSpots: '',
  takenOwnerSpots: '',

  whitelistOpen: 0,
  whitelistClose: 0,

  whitelistContractSigner: null,
  signer: null,
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
  const whitelistContract = new ethers.Contract(whitelistContractAddress, whitelistContractABI, signer);

  return whitelistContract;
}

interface Props {
  children: ReactNode;
}

const AppContextProvider: FC<Props> = ({ children }) => {

  const whitelistContractSigner = getContractSigner();
  const signer = getSigner();

  const [connectedAccount, setConnectedAcount] = useState<string>('');

  // get max whitelist spots
  const [maxWhitelistSpots, setMaxWhitelistSpots] = useState<number>(0);
  const [maxPublicSpots, setMaxPublicSpots] = useState<number | string>('');
  const [maxOwnerSpots, setMaxOwnerSpots] = useState<number | string>('');

  // get taken spots
  const [takenPublicSpots, setTakenPublicSpots] = useState<string>('');
  const [takenOwnerSpots, setTakenOwnerSpots] = useState<string>('');

  // get whitelist open and close time
  const [whitelistOpen, setWhitelistOpen] = useState<number>(0);
  const [whitelistClose, setWhitelistClose] = useState<number>(0);
  

  // fetch data with provider
  useEffect(() => {

    async function fetchWhitelistData() {

      const results = await Promise.all([
        getMaxWhitelistSpots(),
        getMaxPublicWhitelistSpots(),
        getMaxOwnerWhitelistSpots(),
        getPublicSpotsTaken(),
        getOwnerSpotsTaken(),
        getWhitelistOpen(),
        getWhitelistClose()
      ]);

      let maxSpots = results[0].data;
      let publicSpots = results[1].data;
      let ownerSpots = results[2].data;
      let publicTakenSpots = results[3].data;
      let ownerTakenSpots = results[4].data;
      let startTimestamp = results[5].data.hex;
      let endTimestamp = results[6].data.hex;
      
      setMaxWhitelistSpots(maxSpots);
      setMaxPublicSpots(publicSpots);
      setMaxOwnerSpots(ownerSpots);
      setTakenPublicSpots(publicTakenSpots);
      setTakenOwnerSpots(ownerTakenSpots);
      setWhitelistOpen(parseInt(startTimestamp));
      setWhitelistClose(parseInt(endTimestamp));
    }

    fetchWhitelistData();

  }, []);

  
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
    
    try {
      
      // if no metamask then prompt an error toast
      if(!ethereum) {
        toast.error("You need MetaMask. Please visit: https://metamask.io/", { theme: "colored" }); 
        
        
        // if network different than mumbai, then prompt an error toast
      } else if(parseInt(await ethereum.request({ method: 'eth_chainId' }), 16) !== 137) {
        toast.error("Change network to: Polygon mainnet", { theme: "colored" }); 
        
        
        // everything is good - connect wallet
      } else {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        setConnectedAcount(accounts[0]);
        
      }
    } catch (error) {
      console.log('here?');
      
      console.error(error);
    }
  }
  
  useEffect(() => {

    if(!ethereum) {
      console.warn('MetaMask is not installed on this browser.')
    } else {
      
      if(ethereum.isConnected()) {
        requestAndSetConnectedAccount();
      } 
    }

  }, []);


  return (
    <AppContext.Provider value={{
      connectWallet,
      connectedAccount,
      maxWhitelistSpots,
      maxPublicSpots,
      maxOwnerSpots,
      takenPublicSpots,
      takenOwnerSpots,
      whitelistOpen,
      whitelistClose,
      whitelistContractSigner,
      signer,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider;