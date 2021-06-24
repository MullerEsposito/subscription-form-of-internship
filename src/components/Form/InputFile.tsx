import React, { useState } from 'react';
import { 
  FormControl, Text, Icon, Tooltip, Input as ChakraInput, InputProps as ChakraInputProps 
} from '@chakra-ui/react'
import { useRef } from 'react';
import { BiUpload } from 'react-icons/bi';

interface InputFileProps extends ChakraInputProps {
  file: File;
  msgValidation?: string;
  children: string;
  setFile: (value: File) => void;
}

export const InputFile = React.memo(({ file, msgValidation='', children, setFile, ...rest }: InputFileProps): JSX.Element => {
  const [errorMessage, setErrorMessage] = useState('');
  const inputFile = useRef<HTMLInputElement>(null);

  const validation = () => {
    const { current: input } = inputFile;
    if (input) {
      if (input.validity.valueMissing) {
        input.setCustomValidity(msgValidation);
        setErrorMessage(msgValidation)
      } else {
        input.setCustomValidity('');
        setErrorMessage('');
      }
    }
  }
  
  return (
    <FormControl position="relative">
      <label>
        { children }
        
        <Text m="5px 20px">
          <Icon
            as={BiUpload}
            transition="color 0.6s"
            _hover={{ cursor: 'pointer', color: 'green.300'}}
            mr="5px"
            onClick={() => inputFile.current?.click()} 
          />
          <Tooltip label={errorMessage} isOpen={!!errorMessage} placement="right" bg="yellow.800" hasArrow>
            <span className="fileSelectedName">
              { file?.name || 'carregar arquivo' }
            </span>
          </Tooltip>
        </Text>
      </label>
      <ChakraInput
        {...rest}
        ref={inputFile}
        accept="application/pdf, image/png, image/jpeg"
        type="file"
        border="none"
        w="auto"
        position="absolute"
        left="-99999rem" 
        onChange={e => {
          e.target.files && setFile(e.target.files[0]);
          setErrorMessage('');
        }}
        onInvalid={validation}
      />
    </FormControl>
  )
});

InputFile.displayName = "InputFile";