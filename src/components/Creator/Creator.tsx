import { FC } from "react";

// icons
import { FaGithub, FaTwitter, FaLink, FaLinkedin } from 'react-icons/fa';
import SocialLink from "../_Reusable/SocialLink";


const Creator: FC = () => {

  return (
    <>
      <section className="creator-section flex w-full bg-gray-100 min-h-[40vh] justify-center pb-20">
        <div className="w-full md:w-4/5 xl:w-3/5">

          <h2 className="title text-left font-bold text-3xl md:text-4xl lg:text-5xl pb-10 pt-20 px-5">
            Crooked Snout Founder
          </h2>

          <div className="flex">

            <div className="blackh3art rounded-full w-[300px] h-[300px] bg-gray-400 shrink-0 hidden lg:block"/>

            <div className="flex w-auto flex-col items-center justify-between">
              <h2 className="title text-center font-bold text-2xl md:text-3xl lg:text-4xl">
                BlackH3art
              </h2>

              <div className="blackh3art rounded-full w-[250px] h-[250px] bg-gray-400 shrink-0 lg:hidden my-5"/>

              <div className="flex flex-col">
                <p className="text-lg md:text-xl text-center px-5 lg:pl-20">
                  I'm creating this NFT project just to showcase my blockchain, web3 development skills and bring some fun and laugh during this hard times in crypto and market overall. 
                  Bear markets are the best to learn this industry and keep believing in freedom that web3 will bring to us one day.
                </p>
                <br />
                <p className="text-lg md:text-xl text-center pb-10 px-5 lg:pl-20">
                  Stay strong fam! And in the meantime.. get yourself a CrookedSnout! Join the gang, it's cheap af, especially #ForTheRekt ones, just like we all are now.
                </p>
              </div>

              <div className="w-full flex justify-center">
                <SocialLink link="https://blackh3art.dev/">
                  <FaLink size="1.5em" className="mx-2" />
                </SocialLink>

                <SocialLink link="https://www.linkedin.com/in/jaros%C5%82aw-musielak-8810961b2/">
                  <FaLinkedin size="1.5em" className="mx-2" />
                </SocialLink>

                <SocialLink link="https://github.com/BlackH3art">
                  <FaGithub size="1.5em" className="mx-2" />
                </SocialLink>

                <SocialLink link="https://twitter.com/maybeNoT_or_NoT">
                  <FaTwitter size="1.5em" className="mx-2" />
                </SocialLink>
              </div>
            </div>

          </div>

        </div>
      </section>
    </>
  )
}

export default Creator;