import { FC } from "react";

interface Props {
  tokenId: string;
  image: string;
}

const NFTsCard: FC<Props> = ({ tokenId, image }) => {

  return(
    <>
      <div className="w-72 rounded-[1rem] mx-5 mb-5">
        <img className="rounded-[.8rem]" src={image} alt={`Crooked Snout #${tokenId}`} />
      </div>
    </>
  )
}

export default NFTsCard;