import { FormControl, FormLabel, Text, Icon, Input} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { BiUpload } from 'react-icons/bi';

interface InputFileProps {
  label: string;
}

export function InputFile({ label }: InputFileProps): JSX.Element {
  const [input, setInput] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const onClickUpload = () => {
    inputRef.current?.click();
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
        ref={inputRef}
        accept="application/pdf, image/png, image/jpeg"
        type="file"
        border="none"
        w="auto"
        position="absolute"
        left="-99999rem" 
        onChange={e => setInput(e.target.value)}
      />
    </FormControl>
  )
}