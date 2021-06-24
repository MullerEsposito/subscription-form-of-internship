import React from 'react';
import { useRef } from "react";
import { FormControl, Input as ChakraInput, InputProps as ChakraInputProps, Icon, Box, Image, Tooltip } from "@chakra-ui/react";
import { BsPersonSquare } from "react-icons/bs";
import { useState } from 'react';

interface InputPhotoProps extends ChakraInputProps {
  photo: File;
  msgValidation?: string;
  setPhoto: (file: File) => void;
}

export const InputPhoto = React.memo(({ msgValidation='', photo, setPhoto, ...rest }: InputPhotoProps): JSX.Element => {
  const [errorMessage, setErrorMessage] = useState('');
  const inputPhoto = useRef<HTMLInputElement>(null);

  const validation = () => {
    const { current: input } = inputPhoto;
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

  return(
    <FormControl position="relative" display="flex" justifyContent="center" mb="20px">
      <Tooltip label={errorMessage} isOpen={!!errorMessage} placement="bottom" bg="yellow.800" hasArrow>
        <Box 
          w="100px" 
          h="100px" 
          onClick={() => inputPhoto.current?.click()}
          transition="color 0.6s"
          _hover={{ cursor: 'pointer', color: 'green.300'}}
        > 
          {photo.name ? (
            <Image src={URL.createObjectURL(photo)} />
          ):(
            <Icon as={BsPersonSquare} boxSize="100px" />
          )}
        </Box>
      </Tooltip>

      <ChakraInput
        {...rest}
        ref={inputPhoto}
        accept="application/pdf, image/png, image/jpeg"
        type="file"
        position="absolute"
        left="-99999rem" 
        onChange={e => {
          e.target.files && setPhoto(e.target.files[0]);
          setErrorMessage('');
        }}
        onInvalid={validation}
      />
    </FormControl>
  )
});

InputPhoto.displayName = 'InputPhoto';