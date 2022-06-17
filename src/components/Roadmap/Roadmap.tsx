import { FC } from "react";
import roadmap from '../../images/roadmap.png';


const Roadmap: FC = () => {
  return (
    <>
      <section className="flex justify-center w-full h-[80vh]">

        <div className="w-full flex flex-col md:w-4/5 lg:w-3/5">

          <h2 className="title w-full text-left font-bold text-3xl md:text-4xl lg:text-5xl pb-5 pt-20 px-5">
            Roadmap
          </h2>

          <img src={roadmap} className="h-4/5 mx-auto" alt="roadmap" />
        </div>

      </section>
    </>
  )
}

export default Roadmap;