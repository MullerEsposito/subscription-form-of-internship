import { ChakraProvider } from '@chakra-ui/react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";

import App from './App';

import { theme } from "./styles/theme";
require("dotenv").config();

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ChakraProvider>,
  document.getElementById('root')
);
