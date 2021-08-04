import React, { useEffect } from 'react';
import { useRef } from "react";
import { FormControl, Input as ChakraInput, InputProps as ChakraInputProps, Icon, Box, Image, Tooltip } from "@chakra-ui/react";
import { BsPersonSquare } from "react-icons/bs";
import { useState } from 'react';
import { FieldError, useController } from 'react-hook-form';

interface InputPhotoProps extends ChakraInputProps {
  name: string;
  control: any;
  error?: FieldError;
}

export const InputPhoto = React.memo(({ error, control, name, ...rest }: InputPhotoProps): JSX.Element => {
  const inputPhoto = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(!!error);

  const { field } = useController({ control, name });

  useEffect(() => {
    setIsOpen(!!error);
    setTimeout(() => setIsOpen(false), 3000);
  }, [error]);

  return(
    <FormControl position="relative" display="flex" justifyContent="center" mb="20px">
      <Tooltip label={error?.message} isOpen={isOpen} placement="bottom" bg="yellow.800" hasArrow>
        <Box 
          w="100px" 
          maxH="150px" 
          border="1px"
          borderColor="#ccccccab"
          onClick={() => inputPhoto.current?.click()}
          transition="color 0.6s"
          _hover={{ cursor: 'pointer', color: 'green.300'}}
        >
          {inputPhoto.current?.files?.length ? (
            <Image 
              src={inputPhoto.current?.files ? URL.createObjectURL(inputPhoto.current.files[0]) : undefined} 
              objectFit="cover"
              maxH="150px"
            />
          ):(
            <Icon as={BsPersonSquare} boxSize="100px" />
          )}
        </Box>
      </Tooltip>

      <ChakraInput
        {...rest}
        ref={inputPhoto}        
        type="file"
        position="absolute"
        left="-99999rem" 
        onChange={ e => field.onChange(e.target.files)}
      />
    </FormControl>
  )
});

InputPhoto.displayName = 'InputPhoto';