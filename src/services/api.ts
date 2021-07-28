import axios from 'axios';
import "dotenv/config";

const baseURL = process.env.NODE_ENV === "production" 
  ? "http://18.118.36.3:3333/api"
  : "http://localhost:3333/api";

console.log(process.env.NODE_ENV);
export const api = axios.create({ baseURL });