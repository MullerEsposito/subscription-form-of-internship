import { FormControl, FormLabel, Input as ChakraInput, InputProps as ChakraInputProps } from '@chakra-ui/react';
import { useState, useRef, useEffect } from 'react';
import { maskNumberToPhone, unmaskPhoneToNumber } from '../../utils/masks';

interface InputProps extends ChakraInputProps {
  label: string;  
}

export function Input({ label, type, ...rest }: InputProps): JSX.Element {
  const [input, setInput] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.onkeypress = (k) => /\d/.test(k.key)
    }
  }, [])

  return (
    <FormControl
      display="flex"
      flexDirection="column"
      justifyContent="flex-end"
    >
      <FormLabel>{label}</FormLabel>
      {type === 'tel' ? (
        <ChakraInput
          {...rest}
          ref={inputRef}
          value={maskNumberToPhone(input)}
          onChange={e => setInput(unmaskPhoneToNumber(e.target.value))}
          borderColor="gray.400"
          maxLength={15}
        />
      ):(
        <ChakraInput {...rest} type={type} borderColor="gray.400" />
      )}
    </FormControl>
  )
}

