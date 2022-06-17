import { FC } from "react";


interface Props {
  which: string;
  title: string;
  description: string;
  position: string;
  last?: boolean;
}

const AboutAttribute: FC<Props> = ({ which, title, description, position, last }) => {

  return (
    <>
      <div className={`h-64 w-[90%] sm:w-4/5 relative ${position} ${last ? 'mb-12' : ''}`}>
        <div className={`absolute polygon-${which} bg-[#EDAFFB] h-full w-full`}/>
        <div className={`absolute polygon-${which}-inner h-full w-full`}/>
        <div className="absolute h-full w-full flex flex-col items-center justify-center">
          <h2 className="title font-bold text-3xl md:text-4xl lg:text-5xl text-center text-white">
            {title}
          </h2>
          <p className="text-xl font-semibold text-gray-100 md:text-2xl text-center">
            {description}
          </p>
        </div>
      </div>
    </>
  );
}

export default AboutAttribute;