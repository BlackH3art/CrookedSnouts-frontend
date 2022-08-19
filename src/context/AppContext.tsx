import { ethers } from "ethers";
import { useState, useEffect, createContext, FC, ReactNode } from "react";
import { toast } from "react-toastify";
import { getMaxOwnerWhitelistSpots, getMaxPublicWhitelistSpots, getMaxWhitelistSpots, getOwnerSpotsTaken, getPublicSpotsTaken, getWhitelistClose, getWhitelistOpen } from "../api";
import { AppContextInterface } from "../interfaces/AppContextInterface";
import { whitelistContractABI, whitelistContractAddress } from "../utils/constants";

const { ethereum } = window;

export const AppContext = createContext<AppContextInterface>({
  setAddedToWhitelist: () => {},
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
  const [addedToWhitelist, setAddedToWhitelist] = useState<boolean>(false);

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

      // const results = await Promise.all([
      //   getMaxWhitelistSpots(),
      //   getMaxPublicWhitelistSpots(),
      //   getMaxOwnerWhitelistSpots(),
      //   getPublicSpotsTaken(),
      //   getOwnerSpotsTaken(),
      //   getWhitelistOpen(),
      //   getWhitelistClose()
      // ]);

      // let maxSpots = results[0].data;
      // let publicSpots = results[1].data;
      // let ownerSpots = results[2].data;
      // let publicTakenSpots = results[3].data;
      // let ownerTakenSpots = results[4].data;
      // let startTimestamp = results[5].data.hex;
      // let endTimestamp = results[6].data.hex;

      try {
        
        let maxSpots = await getMaxWhitelistSpots();
        let publicSpots = await getMaxPublicWhitelistSpots();
        let ownerSpots = await getMaxOwnerWhitelistSpots();
        let publicTakenSpots = await getPublicSpotsTaken();
        let ownerTakenSpots = await getOwnerSpotsTaken();
        let startTimestamp = await getWhitelistOpen();
        let endTimestamp = await getWhitelistClose();
        
        setMaxWhitelistSpots(maxSpots.data);
        setMaxPublicSpots(publicSpots.data);
        setMaxOwnerSpots(ownerSpots.data);
        setTakenPublicSpots(publicTakenSpots.data);
        setTakenOwnerSpots(ownerTakenSpots.data);
        setWhitelistOpen(parseInt(startTimestamp.data.hex));
        setWhitelistClose(parseInt(endTimestamp.data.hex));
        
      } catch (error) {
        toast.error("Some error while fetching data. Try refresh.", { theme: "colored" }); 
      }
    }

    fetchWhitelistData();

  }, [addedToWhitelist]);

  
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
        try {
          const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
          setConnectedAcount(accounts[0]);
        } catch (error) {
          toast.error("Requesting your account failed", { theme: "colored" }); 
        }
        
      }
    } catch (error) {
      toast.error("Unexpected error while connecting wallet", { theme: "colored" }); 
    }
  }
  
  // useEffect(() => {

  //   if(!ethereum) {
  //     console.warn('MetaMask is not installed on this browser.')
  //   } else {
      
  //     if(ethereum.isConnected()) {
  //       requestAndSetConnectedAccount();
  //     } 
  //   }

  // }, []);


  return (
    <AppContext.Provider value={{
      setAddedToWhitelist,
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