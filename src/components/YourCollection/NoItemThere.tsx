import { FC } from "react";
import NoItem from '../../images/no-item.svg';

const NoItemThere: FC = () => {

  return (
    <>
      <div className="no-item w-72 relative bg-gray-200 rounded-[1rem] mx-5 mb-5">
        <img src={NoItem} alt="No item yet" />
        <p className="absolute top-[50%] left-[50%] text-white text-xl translate-x-[-50%]">
          No item yet
        </p>
      </div>
    </>
  )
}

export default NoItemThere;