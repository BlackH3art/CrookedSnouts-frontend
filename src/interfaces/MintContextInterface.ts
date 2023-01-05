import { Dispatch, SetStateAction } from "react";
import { NFTsResponseInterface } from "./NFTsResponseInterface";

export interface MintContextInterface {
  connectWallet: () => void;
  connectedAccount: string;
  accountNFTs: NFTsResponseInterface[];
  setAccountNFTs: Dispatch<SetStateAction<NFTsResponseInterface[]>>;
}