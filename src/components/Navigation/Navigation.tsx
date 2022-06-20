import { BigNumber, ethers } from "ethers";
import { FC, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../../context/AppContext";



const Navigation: FC = () => {

  const { connectWallet, connectedAccount, signer } = useContext(AppContext);
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {

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
      } catch (error) {
        toast.error("Problem getting a signer. Try refresh.", { theme: "colored" }); 
      }
    }

    getBalance();
      
  }, [connectedAccount]);



  

  return (
    <>
      <nav className="navigation w-full h-[200px] flex justify-center">
        <div className="w-full h-full lg:w-4/5 flex justify-end">

          {connectedAccount ? (
            <div className="flex items-center h-12 text-white font-semibold px-7 py-2 mt-4 mr-4 xl:mr-0">
              <p className="pr-10 text-lg">{balance.toFixed(6)} MATIC</p>
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