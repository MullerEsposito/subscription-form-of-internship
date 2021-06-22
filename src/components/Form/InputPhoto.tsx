import React from "react";
import { useState } from "react";
import { FormControl, Input as ChakraInput, InputProps as ChakraInputProps, Icon, Box, Image } from "@chakra-ui/react";
import { BsPersonSquare } from "react-icons/bs";

const Input: React.ForwardRefRenderFunction<HTMLInputElement, ChakraInputProps> = 
({ onChange=()=>{}, ...rest }, ref) => {
  const [input, setInput] = useState<File | null>(null);

  const onClickUpload = () => {
    const inputPhoto = document.getElementById("inputPhoto");
    inputPhoto?.click();
  }

  return(
    <FormControl position="relative" display="flex" justifyContent="center" mb="20px">
      <Box 
        w="100px" 
        h="100px" 
        onClick={onClickUpload}
        transition="color 0.6s"
        _hover={{ cursor: 'pointer', color: 'green.300'}}
      > 
        {input ? (
          <Image src={URL.createObjectURL(input)} />
        ):(
          <Icon as={BsPersonSquare} boxSize="100px" />
        )}
      </Box>

      <ChakraInput
        id="inputPhoto"
        ref={ref}
        accept="application/pdf, image/png, image/jpeg"
        type="file"
        position="absolute"
        left="-99999rem" 
        onChange={e => {
          setInput(e.target.files ? e.target.files[0] : null);
          onChange(e);
        }}
        {...rest}
      />
    </FormControl>
  )
}

export const InputPhoto = React.forwardRef(Input);