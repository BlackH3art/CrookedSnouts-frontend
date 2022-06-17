import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  link: string;
}

const SocialLink: FC<Props> = ({ link, children }) => (
  <>
    <a href={link} rel="noopener noreferrer" target="_blank">
      {children}
    </a>
  </>
)

export default SocialLink;