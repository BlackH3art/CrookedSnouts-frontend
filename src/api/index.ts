import axios, { AxiosResponse } from 'axios';
import { ethers } from 'ethers';
import { FulfilledResponseInterface } from '../interfaces/FulfilledResponseInterface';
import { NFTsResponseInterface } from '../interfaces/NFTsResponseInterface';
import { ParsedNumbersInterface } from '../interfaces/ParsedNumbersInterface';

const API = axios.create({ 
  baseURL: 'https://crookedsnouts-backend.herokuapp.com/'
  // baseURL: 'http://localhost:3500/'
});


  // get max whitelist spots
export const getMaxWhitelistSpots = () => API.get<never, AxiosResponse>('blockchain-provider/whitelist/spots/max');
export const getMaxPublicWhitelistSpots = () => API.get<never, AxiosResponse>('blockchain-provider/whitelist/spots/max-public');
export const getMaxOwnerWhitelistSpots = () => API.get<never, AxiosResponse>('blockchain-provider/whitelist/spots/max-owner');

  // get taken spots
export const getPublicSpotsTaken = () => API.get<never, AxiosResponse>('blockchain-provider/whitelist/spots/public-taken');
export const getOwnerSpotsTaken = () => API.get<never, AxiosResponse>('blockchain-provider/whitelist/spots/owner-taken');

  // get whitelist open and close time
export const getWhitelistOpen = () => API.get<never, AxiosResponse>('blockchain-provider/whitelist/open');
export const getWhitelistClose = () => API.get<never, AxiosResponse>('blockchain-provider/whitelist/close');

export const getIsWhitelisted = (address: string) => API.get<boolean>(`blockchain-provider/whitelist/isWhitelisted/${address}`);


// collection contract
export const getNfts = (address: string) => API.get<NFTsResponseInterface[]>(`nft-data/${address}`);