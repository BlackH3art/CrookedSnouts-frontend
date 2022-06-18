import { FC, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../../context/AppContext";

import MainButton from "../_Reusable/MainButton";
import MainButtonMobile from "../_Reusable/MainButtonMobile";
import CountdownTimer from "./CountdownTimer";
import PulseLoader from 'react-spinners/PulseLoader';
import { getIsWhitelisted } from "../../api";
import dayjs from "dayjs";



const Whitelist: FC = () => {

  const { connectWallet, connectedAccount, whitelistContractSigner, whitelistClose, whitelistOpen } = useContext(AppContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [isOnWhitelist, setIsOnWhitelist] = useState<boolean>(false);

  const now: dayjs.Dayjs = dayjs();
  const isWhitelistClosed: boolean = now.isAfter(whitelistClose * 1000);
  const isWhitelistOpenedYet: boolean = now.isBefore(whitelistOpen * 1000);


  useEffect(() => {

    async function isWhitelisted() {

      try {

        if(connectedAccount) {

          setLoading(true);

          const { data } = await getIsWhitelisted(connectedAccount);
          data ? setIsOnWhitelist(true) : setIsOnWhitelist(false);

          setLoading(false);
        }
        
      } catch (error) {
        console.error(error);
      }
    }

    isWhitelisted();

  }, [connectedAccount])



  const addToWhitelist = async () => {

    try {
      setLoading(true);
      const transactionHash = await whitelistContractSigner?.addAddressToWhitelist();

      await transactionHash.wait();

      setLoading(false);
      setIsOnWhitelist(true);
      toast.success("Successfully added to whitelist!", { theme: "colored" }); 

    } catch (error: any) {
      
      setLoading(false);

      if(error.data.message === "execution reverted: Sender is already whitelisted") {
        toast.error("Address already whitelisted", { theme: "colored" }); 
      } else if (error.data.message === "execution reverted: whitelist not started yet") {
        toast.error("Whitelist not started yet", { theme: "colored" }); 
      } else {
        toast.error("Something went wrong", { theme: "colored" }); 
      }
    }
  }

  return (
    <>
      <div className="w-full md:w-4/5 xl:w-3/5 h-[70vh] md:h-[60vh] flex flex-col items-center md:flex-row md:justify-around md:items-start">
        <div className="mt-10 flex flex-col items-center">
          <h2 className="title font-bold text-3xl md:text-4xl lg:text-5xl pt-5">
            {now.isAfter(whitelistClose * 1000) ? 'Whitelist is closed' : (
              isWhitelistOpenedYet ? "Whitelist will be open in" : "Whitelist is open for:"
            )}
          </h2>

          <CountdownTimer timestamp={isWhitelistOpenedYet ? whitelistOpen : whitelistClose} />
          
          <div className="pt-12 md:pt-0">

            {connectedAccount ? (
              <MainButton callback={addToWhitelist} disabled={loading || isOnWhitelist || isWhitelistClosed}>
                {isWhitelistClosed ? 'Wait for public mint!' : (
                  loading ? <PulseLoader color="#ffffff" size={10} /> : (isOnWhitelist ? "You're whitelisted!" : (
                    isWhitelistOpenedYet ? "Add me to whitelist!" : "Wait for open!"
                  ))
                )}
              </MainButton>
            ) : (
              <MainButton callback={connectWallet}>
                Connect wallet
              </MainButton>
            )}

            {connectedAccount ? (
              <MainButtonMobile callback={addToWhitelist} disabled={loading || isOnWhitelist || isWhitelistClosed}>
                {isWhitelistClosed ? 'Wait for public mint!' : (
                  loading ? <PulseLoader color="#ffffff" size={10} /> : (isOnWhitelist ? "You're whitelisted!" : (
                    isWhitelistOpenedYet ? "Add me to whitelist!" : "Wait for open!"
                  ))
                )}
              </MainButtonMobile>
            ) : (
              <MainButtonMobile callback={connectWallet}>
                Connect wallet
              </MainButtonMobile>
            )}
          </div>

        </div>
      </div>
    </>
  )
}

export default Whitelist;