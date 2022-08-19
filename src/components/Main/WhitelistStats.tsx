import { FC } from "react";
import ClipLoader from 'react-spinners/ClipLoader';

interface StatProps {
  title: string;
  value: number | string;
}

export const StatRow: FC<StatProps> = ({ title, value }) => (
  <div className="flex w-full text-xl">
    <h2 className="w-1/2 text-right font-semibold">{title}:</h2>
    <p className="w-1/3 pl-5 text-2xl text-center">{value ? value : <ClipLoader color="#c481f0" size={"1.3rem"} />}</p>
  </div>
);

interface Props {
  maxWhitelistSpots: number;
  maxPublicSpots: string;
  maxOwnerSpots: string; 
  takenPublicSpots: string;
  takenOwnerSpots: string;
}

const WhitelistStats: FC<Props> = ({ maxWhitelistSpots, maxPublicSpots, maxOwnerSpots, takenPublicSpots, takenOwnerSpots }) => {

  return (
    <>
      <div className="stats-container w-full md:w-full flex flex-col items-center justify-center">

        <h2 className="text-3xl font-bold pb-5">Whitelist Stats</h2>

        <StatRow
          title="Max spots"
          value={maxWhitelistSpots}
        />

        <StatRow
          title="Public spots"
          value={maxPublicSpots}
        />

        <StatRow
          title="Owner spots"
          value={maxOwnerSpots}
        />

        <StatRow
          title="Public spots taken"
          value={String(takenPublicSpots)}
        />

        <StatRow
          title="Owner spots taken"
          value={String(takenOwnerSpots)}
        />

        <StatRow
          title="Available spots"
          value={Number(maxWhitelistSpots) - (Number(takenPublicSpots) + Number(takenOwnerSpots))}
        />

      </div>
    </>
  )
}

export default WhitelistStats;