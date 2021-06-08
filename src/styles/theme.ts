import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    text: {
      default: 'rgb(112, 112, 112)',
    },
    green: {
      '800': '#426837',
    }
  },
  fonts: {
      heading: 'Roboto',
      body: 'Roboto',
  },
  styles: {
    global: {
      body: {
        bg: '#f2f2f2',
        color: '#fff',
        fontSize: '0.875rem',
      },
      p: {
        margin: 0,
        lineHeight: '1rem'
      }
    }
  }
});