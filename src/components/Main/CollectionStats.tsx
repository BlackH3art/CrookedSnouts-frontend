import { FC } from "react";

import { StatRow } from './WhitelistStats';


interface Props {
  
}

const CollectionStats: FC<Props> = () => {

  return (
    <>
      <div className="stats-container w-full md:w-full flex flex-col items-center justify-center">

        <h2 className="text-3xl font-bold pb-5">Details</h2>

        <StatRow 
          title="Max supply"
          value="10.000"
        />

        <StatRow 
          title="Public price"
          value="3 MATIC"
        />

        <StatRow 
          title="Whitelist price"
          value="1 MATIC"
        />

      </div>
    </>
  )
}

export default CollectionStats;