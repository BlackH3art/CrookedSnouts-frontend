import { FC, useContext, useEffect, useState } from "react";
import { useAccount, useBalance } from "wagmi";
import { MintContext } from "../../context/MintContext";



const Navigation: FC = () => {

  const { connectWallet, connectedAccount } = useContext(MintContext);
  const [balance, setBalance] = useState<number>(0);
  const { address } = useAccount();
  

  const { data } = useBalance({
    address: `0x${address?.slice(2)}`,
  });

  useEffect(() => {
    setBalance(Number(data?.formatted));
  }, [address]);
  

  return (
    <>
      <nav className="navigation w-full h-[200px] flex justify-center">
        <div className="w-full h-full lg:w-4/5 flex justify-end">

          {connectedAccount ? (
            <div className="flex items-center h-12 text-white font-semibold px-7 py-2 mt-4 mr-4 xl:mr-0">
              <p className="pr-10 text-lg">{balance.toFixed(6)} {data?.symbol}</p>
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