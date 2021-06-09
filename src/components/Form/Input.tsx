import { FormControl, FormLabel, Input as ChakraInput, InputProps as ChakraInputProps } from '@chakra-ui/react';

interface InputProps extends ChakraInputProps {
  label: string;
}

export function Input({ label, ...rest }: InputProps): JSX.Element {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <ChakraInput {...rest} />
    </FormControl>
  )
}