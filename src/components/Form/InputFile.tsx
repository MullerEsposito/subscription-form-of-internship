import React from "react";

import { FormControl, FormLabel, Text, Icon, Input, InputProps as ChakraInputProps } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { BiUpload } from 'react-icons/bi';
import { useEffect } from "react";

interface InputFileProps extends ChakraInputProps {
  label: string;
}

const InputFile: React.ForwardRefRenderFunction<HTMLInputElement, InputFileProps> = 
({ label, ...rest }, ref): JSX.Element => {
  const [input, setInput] = useState('');
  const inputId = `input${Math.random() * 100}`;

  // const inputRef = useRef<HTMLInputElement>(null);

  const onClickUpload = () => {
    const inputFile = document.getElementById(inputId);
    inputFile?.click();
    // inputRef.current?.click();
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
            { input || 'carregar arquivo' }
          </span>
        </Text>
      </label>
      <Input
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
          console.log('inputfile...');
          setInput(e.target.value)
        } }
      />
    </FormControl>
  )
}

export default React.forwardRef(InputFile);