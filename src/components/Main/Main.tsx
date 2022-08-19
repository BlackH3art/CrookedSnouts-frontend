import { FC, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import CrookedFaces from '../../images/crookedfaces.svg';
import CollectionStats from "./CollectionStats";


const Main: FC = () => {

  const { maxWhitelistSpots, maxPublicSpots, maxOwnerSpots, takenPublicSpots, takenOwnerSpots } = useContext(AppContext);

  return (
    <>
      <main className="flex justify-center">

        <div className="w-full lg:w-4/5 xl:w-3/5 h-full">

          <h1 className="title font-bold text-3xl md:text-4xl lg:text-6xl text-center pb-10">
            Crooked Snouts NFT
          </h1>

          <p className="text-lg md:text-2xl text-center pb-2">
            We are ugly af Crooked Snouts!
          </p>
          <p className="text-lg md:text-2xl text-center md:pb-12">
            If you're ugly enough, maybe you will get Golden Snout!
          </p>

          <div className="flex flex-col md:flex-row justify-around">
            <img src={CrookedFaces} alt="Crooked Faces" className="h-96" />

            <CollectionStats />

          </div>

        </div>

      </main>
    </>
  )
}

export default Main;