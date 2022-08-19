import { ethers } from "ethers";
import { Dispatch, SetStateAction } from "react";
import { NFTsResponseInterface } from "./NFTsResponseInterface";

export interface MintContextInterface {
  connectWallet: () => void;
  connectedAccount: string;
  collectionContractSigner: null | ethers.Contract;
  signer: null | ethers.providers.JsonRpcSigner;
  accountNFTs: NFTsResponseInterface[];
  setAccountNFTs: Dispatch<SetStateAction<NFTsResponseInterface[]>>;
}