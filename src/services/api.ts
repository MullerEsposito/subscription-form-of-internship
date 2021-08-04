import axios from 'axios';
import "dotenv/config";

const baseURL = process.env.REACT_APP_BASE_URL;

export const api = axios.create({ baseURL });