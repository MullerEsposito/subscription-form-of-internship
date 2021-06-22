import React from "react";

import { 
  FormControl, Text, Icon, Input as ChakraInput, InputProps as ChakraInputProps 
} from '@chakra-ui/react'
import { useState } from 'react'
import { BiUpload } from 'react-icons/bi';

interface InputFileProps extends ChakraInputProps {
  label: string;
}
const Input: React.ForwardRefRenderFunction<HTMLInputElement, InputFileProps> = 
({ label, onChange=()=>{}, ...rest }, ref): JSX.Element => {
  const [input, setInput] = useState<File | null>(null);
  const inputId = `input${Math.random() * 100}`;

  const onClickUpload = () => {
    const inputFile = document.getElementById(inputId);
    inputFile?.click();
  }

  return (
    <FormControl position="relative">
      <label>
        {label}
        
        <Text m="5px 20px">
          <Icon
            as={BiUpload}
            transition="color 0.6s"
            _hover={{ cursor: 'pointer', color: 'green.300'}}
            mr="5px"
            onClick={onClickUpload} 
          />
          <span id="file-selected">
            { input?.name || 'carregar arquivo' }
          </span>
        </Text>
      </label>
      <ChakraInput
        id={inputId}
        ref={ref}
        accept="application/pdf, image/png, image/jpeg"
        type="file"
        border="none"
        w="auto"
        position="absolute"
        left="-99999rem" 
        {...rest}
        onChange={e => {
          setInput(e.target.files ? e.target.files[0] : null);
          onChange(e);
        }}
      />
    </FormControl>
  )
}

export const InputFile = React.forwardRef(Input);