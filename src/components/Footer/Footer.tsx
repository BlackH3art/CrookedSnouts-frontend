import { FC } from "react";
import { FaGithub, FaTwitter } from 'react-icons/fa'
import SocialLink from "../_Reusable/SocialLink";
import logoSnout from '../../images/logo.png';

const Footer: FC = () => {

  return (
    <>
      <footer className="footer w-full bg-gray-100 min-h-[300px] items-end flex justify-center">

        <div className="w-full lg:w-3/5 flex justify-between">

          {/* footer logo container */}
          <div className="flex flex-col items-center pb-6">
            <h1 className="title font-bold text-1xl md:text-1xl lg:text-2xl p-4">
              Crooked Snouts NFT
            </h1>

            <div className="w-[100px] h-[100px] shrink-0 rounded-lg">
              <img src={logoSnout} alt="logo" />
            </div>
          </div>

          {/* Footer social container */}
          <div className="flex flex-col justify-end pb-6">

            <div className="flex pt-4 justify-end">
              <SocialLink link="">
                <FaGithub size="1.8em" className="mx-2" />
              </SocialLink>

              <SocialLink link="https://twitter.com/NftSnouts">
                <FaTwitter size="1.8em" className="mx-2" />
              </SocialLink>
            </div>

          </div>


        </div>

      </footer>
    </>
  )
}

export default Footer;