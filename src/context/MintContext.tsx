import { ethers } from "ethers";
import { useState, useEffect, createContext, FC, ReactNode } from "react";
import { toast } from "react-toastify";

import { MintContextInterface } from "../interfaces/MintContextInterface";
import { NFTsResponseInterface } from "../interfaces/NFTsResponseInterface";

import { useAccount, useConnect } from 'wagmi';

import { chainID } from "../utils/constants";

const { ethereum } = window;



export const MintContext = createContext<MintContextInterface>({
  connectWallet: () => {},
  connectedAccount: "",
  accountNFTs: [],
  setAccountNFTs: () => {}
});

interface Props {
  children: ReactNode;
}

const MintContextProvider: FC<Props> = ({ children }) => {

  const [connectedAccount, setConnectedAccount] = useState<string>('');
  const [accountNFTs, setAccountNFTs] = useState<NFTsResponseInterface[]>([]);

  const { connectAsync, connectors } = useConnect();
  const { address, isConnected } = useAccount();
  
  
  ethereum?.on('accountsChanged', (accounts: string[]) => {
    if(isConnected && address) {
      setConnectedAccount(address);
    } else {
      connectWallet();
    }
  });
  
  ethereum?.on('chainChanged', (chainChangedId: string) => { 
    
    if(isConnected && address && chainChangedId === "0x" + chainID.toString(16)) {
      setConnectedAccount(address);
    } else {
      setConnectedAccount('');
    }
  });
  
  const getActiveChainId = async (): Promise<number> => {
    return parseInt(await ethereum.request({ method: 'eth_chainId' }), 16);
  }

  const isSettingAccountNecessary = async (): Promise<void> => {

    const activeChainId = await getActiveChainId();
    
    if(isConnected && address && activeChainId === chainID) {
      setConnectedAccount(address);
    } else {
      setConnectedAccount('');
    }
  }
  
  
  const connectWallet = async () => {

    try {
      const activeChainId = await getActiveChainId();
  
      if(activeChainId !== chainID) {
        await ethereum.request({ 
          method: 'wallet_switchEthereumChain', 
          params: [{ chainId: "0x" + chainID.toString(16) }] 
        });
      } 
      
      if(isConnected && address) {
        setConnectedAccount(address)
      } else {
        const { account } = await connectAsync({ connector: connectors[0] });
        setConnectedAccount(account);
      }
      
    } catch (error: any) {
      toast.info(error.message);
    }
  }
  
  useEffect(() => {
    if(!ethereum) {
      toast.warn("You will need MetaMask to mint Crooked Snout");
      console.warn('MetaMask is not installed on this browser.');
    } else {
      isSettingAccountNecessary();
    }
  }, []);


  return (
    <MintContext.Provider value={{
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