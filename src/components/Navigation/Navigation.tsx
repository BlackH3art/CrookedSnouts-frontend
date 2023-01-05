import { FC, useContext, useEffect, useState } from "react";
import { ethers, BigNumber } from "ethers";
import { MintContext } from "../../context/MintContext";
import { toast } from "react-toastify";

const { ethereum } = window;

const getSigner = () => {

  if(!ethereum) {
    console.warn('No Metamask detected');
    return null;
  }

  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();

  return signer;
}


const Navigation: FC = () => {

  const { connectWallet, connectedAccount, setConnectedAccount } = useContext(MintContext);
  const [balance, setBalance] = useState<number>(0);
  const signer = getSigner();
  

  async function getBalance() {
    try {
      if(!signer) {
        return;
      } else {
        if(!connectedAccount) {
          return; 
        } else {
          let signerBalance = await signer.getBalance();
          setBalance(Number(ethers.utils.formatEther(BigNumber.from(signerBalance))))
        }
      }
    } catch (error: any) {
      setConnectedAccount('');
      console.warn(error.message)
      toast.warn("Problem getting account balance. Try refresh.", { theme: "colored" }); 
    }
  }


  useEffect(() => {
    getBalance();
  }, [connectedAccount]);
  

  return (
    <>
      <nav className="navigation w-full h-[200px] flex justify-center">
        <div className="w-full h-full lg:w-4/5 flex justify-end">

          {connectedAccount ? (
            <div className="flex items-center h-12 text-white font-semibold px-7 py-2 mt-4 mr-4 xl:mr-0">
              <p className="pr-10 text-lg">{balance.toFixed(6)} MATIC </p> 
              <p className="">{`${connectedAccount.slice(0,5)}...${connectedAccount.slice(connectedAccount.length - 4)}`}</p>
            </div>
            ) : (
            <button className="h-12 text-white font-semibold bg-black rounded-[2rem] px-7 py-2 mt-4 mr-4 xl:mr-0" onClick={connectWallet}>
              Connect wallet
            </button>
            )} 

        </div>
      </nav>
    </>
  )
}

export default Navigation;