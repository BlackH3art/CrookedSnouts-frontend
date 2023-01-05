import { Dispatch, SetStateAction } from "react";
import { NFTsResponseInterface } from "./NFTsResponseInterface";

export interface MintContextInterface {
  connectWallet: () => void;
  connectedAccount: string;
  setConnectedAccount:  Dispatch<SetStateAction<string>>;
  accountNFTs: NFTsResponseInterface[];
  setAccountNFTs: Dispatch<SetStateAction<NFTsResponseInterface[]>>;
}