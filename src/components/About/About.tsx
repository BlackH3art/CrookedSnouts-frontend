import { FC } from "react";
import AboutAttribute from "../_Reusable/AboutAttribute";


const About: FC = () => {

  return (
    <>
      <section className="flex justify-center w-full min-h-[50vh] bg-gray-100">
        <div className="w-full flex flex-col md:w-4/5 lg:w-3/5">

          <h2 className="title w-full text-left font-bold text-3xl md:text-4xl lg:text-5xl pb-5 pt-20 px-5">
            About
          </h2>

          <AboutAttribute which="first" position="self-end" title="Zero utility" description="Totally useless!" />
          <AboutAttribute which="second" position="self-start" title="Zero partnerships" description="Completely nobody!" />
          <AboutAttribute which="third" position="self-end" title="Zero community" description="Entirely zero!" />
          <AboutAttribute which="fourth" position="self-start" title="Zero marketing" description="Just mint and enjoy your Crooked Snout!" last={true} />
          
        </div>
      </section>
    </>
  )
}

export default About;