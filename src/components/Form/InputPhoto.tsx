import { useRef, useState } from "react";
import { FormControl, Input, Icon, Box } from "@chakra-ui/react";
import { BsPersonSquare } from "react-icons/bs";

export function InputPhoto() {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickUpload = () => {
    inputRef.current?.click();
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
        <Icon as={BsPersonSquare} boxSize="100px" />
      </Box>

      <Input
        ref={inputRef}
        accept="application/pdf, image/png, image/jpeg"
        type="file"
        position="absolute"
        left="-99999rem" 
        onChange={e => setInput(e.target.value)}
      />
    </FormControl>
  )
}