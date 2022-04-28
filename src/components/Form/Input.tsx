import React, { useEffect, useState, ForwardRefRenderFunction } from 'react';
import { FormControl, FormLabel, Tooltip, Input as ChakraInput, InputProps as ChakraInputProps } from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';

interface InputProps extends ChakraInputProps {
  maskChar?: string;
  mask?: string;
  type?: string;
  error?: FieldError;
  children: string;  
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement,InputProps> = ({ 
  error, type, children, ...rest 
}: InputProps, ref) => {
  const [isOpen, setIsOpen] = useState(!!error);

  useEffect(() => {
    setIsOpen(!!error);
    setTimeout(() => setIsOpen(false), 3000);
  }, [error]);

  return (
    <FormControl
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
      >
        <FormLabel>{children}</FormLabel>
        <Tooltip isOpen={isOpen} label={error?.message} hasArrow>
          <div>
            {/* <ReactInputMask mask={mask ? mask : ""} /> */}
            <ChakraInput 
              errorBorderColor="red.500" 
              borderColor="gray.400"
              isInvalid={!!error}
              type={type}
              ref={ref}
              {...rest}
            />          
          </div>
        </Tooltip>
    </FormControl>
  )
};

export const Input = React.forwardRef(InputBase);

Input.displayName = "Input";
