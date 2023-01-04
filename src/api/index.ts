import axios from 'axios';
import { NFTsResponseInterface } from '../interfaces/NFTsResponseInterface';

const API = axios.create({ 
  baseURL: 'http://localhost:3500/',
  // baseURL: 'https://api.crookedsnouts.com/',
});


export const getIsWhitelisted = (address: string) => API.get<boolean>(`blockchain-provider/whitelist/isWhitelisted/${address}`);
export const getNfts = (address: string) => API.get<NFTsResponseInterface[]>(`nft-data/${address}`);