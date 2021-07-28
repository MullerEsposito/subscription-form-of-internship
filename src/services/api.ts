import axios from 'axios';
import "dotenv/config";

const baseURL = process.env.NODE_ENV === "production" 
  ? "http://18.118.36.3/api"
  : "http://localhost:3333/api";

export const api = axios.create({ baseURL });