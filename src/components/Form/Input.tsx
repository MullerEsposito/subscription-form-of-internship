import { FormControl, FormLabel, Input as ChakraInput, InputProps as ChakraInputProps } from '@chakra-ui/react';
import { useState } from 'react';
import PhoneInput from "react-phone-number-input";

interface InputProps extends ChakraInputProps {
  label: string;
}

export function Input({ label, type, ...rest }: InputProps): JSX.Element {
  const [input, setInput] = useState('');

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      {type === 'number' ? (
        <PhoneInput
          value={input}
          onChange={setInput}
        />
      ):(
        <ChakraInput {...rest} type={type} borderColor="gray.400" />
      )}
    </FormControl>
  )
}