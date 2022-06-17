import { ethers } from "ethers";

export interface AppContextInterface {
  connectWallet: () => void;
  connectedAccount: string;
  // max spots
  maxWhitelistSpots: number;
  maxPublicSpots: number | string;
  maxOwnerSpots: number | string;

  // spots taken
  takenPublicSpots: string;
  takenOwnerSpots: string; 

  // whitelist start and close
  whitelistOpen: number;
  whitelistClose: number; 

  whitelistContractSigner: null | ethers.Contract;
  signer: null | ethers.providers.JsonRpcSigner;
}