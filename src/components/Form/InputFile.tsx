import React, { useEffect, useState } from 'react';
import { 
  FormControl, Text, Icon, Tooltip, Input as ChakraInput, InputProps as ChakraInputProps 
} from '@chakra-ui/react'
import { useRef } from 'react';
import { BiUpload } from 'react-icons/bi';
import { FieldError, useController } from 'react-hook-form';

interface InputFileProps extends ChakraInputProps {
  name: string;
  control: any;
  error?: FieldError;
  children: string;
}

export const InputFile = React.memo(({ name, error, control, children, ...rest }: InputFileProps): JSX.Element => {
  const inputFile = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(!!error);

  const { field } = useController({ control, name });

  useEffect(() => {
    setIsOpen(!!error);
    setTimeout(() => setIsOpen(false), 3000);
  }, [error]);
  
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
          <Tooltip label={error?.message} isOpen={isOpen} placement="right" bg="yellow.800" hasArrow>
            <span className="fileSelectedName">
              { inputFile.current?.files?.length 
                  ? inputFile.current?.files[0].name 
                  : 'carregar arquivo' 
              }
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
        onChange={e => field.onChange(e.target.files) }
      />
    </FormControl>
  )
});

InputFile.displayName = "InputFile";