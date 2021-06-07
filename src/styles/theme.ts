import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    text: {
      default: '#152f48',
    }
  },
  fonts: {
      heading: 'Roboto',
      body: 'Roboto',
  },
  styles: {
    global: {
      body: {
        bg: 'white.900',
        color: 'text.default'
      }
    }
  }
});