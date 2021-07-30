import axios from 'axios';
import "dotenv/config";

const baseURL = process.env.NODE_ENV === "production" 
  ? "https://api.jfmg-mcl.com"
  : "http://localhost:3333/api";

export const api = axios.create({ baseURL });