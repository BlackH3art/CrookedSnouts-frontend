import { FC } from "react";
import NoItemThere from "./NoItemThere";


const YourCollection: FC = () => {

  return (
    <>
      <section className="your-collection w-full min-h-[40vh] flex justify-center">
        <div className="w-full md:w-4/5 lg:w-3/5 min-h-[60vh] flex flex-col">

          <h2 className="title font-bold text-3xl md:text-4xl lg:text-5xl pb-10 pt-20 px-5">
            Your collection
          </h2>

          <div className="w-full flex flex-col md:flex-row items-center">

            <NoItemThere />
            <NoItemThere />
            <NoItemThere />

          </div>

        </div>
      </section>
    </>
  )
}

export default YourCollection;