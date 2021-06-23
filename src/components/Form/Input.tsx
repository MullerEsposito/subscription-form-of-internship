import React from 'react';
import { FormControl, FormLabel, Input as ChakraInput, InputProps as ChakraInputProps } from '@chakra-ui/react';
import InputMask from 'react-input-mask';
import { useRef } from 'react';

interface InputProps extends ChakraInputProps {
  type?: string;
  msgValidation?: string;
  value: string;
  children: string;  
  setValue: (value: string) => void;
}

export const Input = React.memo(({ msgValidation='', type, value, setValue, children, ...rest }: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  
  const validation = () => {
    const { current: input } = inputRef;

    if (input) {
      if (input.validity.valueMissing) {
        input.setCustomValidity(msgValidation);
      } else {
        input.setCustomValidity('');
      } 
    }
  }

  return (
    <FormControl
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
      >
        <FormLabel>{children}</FormLabel>
        {type === 'tel' ? (
          <InputMask mask="(99) 99999-9999" value={value} onChange={e => setValue(e.target.value)}>
            {(inputProps: any) => (
              <ChakraInput {...inputProps} maxW="200px" {...inputProps}/>
            )}
          </InputMask>
        ):(
          <ChakraInput 
            {...rest}
            ref={inputRef}
            type={type}
            value={value} 
            onChange={e => setValue(e.target.value)} 
            borderColor="gray.400"
            onInvalid={validation}
          />
        )}
    </FormControl>
  )
});

Input.displayName = "Input";
