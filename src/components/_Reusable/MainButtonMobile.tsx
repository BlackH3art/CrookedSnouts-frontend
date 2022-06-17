import { FC, ReactNode } from "react";

interface Props {
  callback: () => void;
  children: string | ReactNode;
  disabled?: boolean;
}

const MainButtonMobile: FC<Props> = ({ callback, children, disabled }) => (
  <>
    <button 
      className="h-16 md:hidden min-w-[12rem] text-xl text-white font-semibold bg-black rounded-[2rem] px-10 py-2 mt-4 mr-4 xl:mr-0" 
      onClick={callback}
      disabled={disabled}
    >
      {children}
    </button>
  </>
)

export default MainButtonMobile;