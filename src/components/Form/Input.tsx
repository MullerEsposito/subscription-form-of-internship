import React from "react";
import { FormControl, FormLabel, Input as ChakraInput, InputProps as ChakraInputProps } from '@chakra-ui/react';

interface InputProps extends ChakraInputProps {
  label: string;  
}

const Input: React.ForwardRefRenderFunction<HTMLInputElement, InputProps> = 
({label, ...rest}, ref) => {
  return (
    <FormControl
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
      >
        <FormLabel>{label}</FormLabel>
        <ChakraInput {...rest} borderColor="gray.400" ref={ref} />
    </FormControl>
  )
}

export default React.forwardRef(Input);
