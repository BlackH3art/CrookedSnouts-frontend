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

              <p className="text-lg md:text-xl text-center pb-10 px-5 lg:pl-20">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur repellat amet ipsa quas voluptatum dignissimos laboriosam ab expedita saepe, deserunt quae ad quasi quo temporibus pariatur ex qui optio cupiditate.
                Corrupti possimus molestiae eum laudantium repellat ipsum impedit recusandae, voluptas incidunt sint officiis nesciunt dolores maiores quibusdam reiciendis atque, voluptatum architecto sapiente dolore non vitae nisi? Quas blanditiis sit suscipit.
              </p>

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