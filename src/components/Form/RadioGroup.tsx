import { 
  RadioGroup as ChakraRadioGroup, FormLabel, Stack, Radio, RadioGroupProps as ChakraRadioGroupProps
} from '@chakra-ui/react'
import { useState } from 'react'

type Option = {
  value: string;
  label: string;
}

interface RadioGroupProps extends Omit<ChakraRadioGroupProps, 'children'> {
  label: string;  
  labelBottom?: boolean;
  options: Option[];
}

export function RadioGroup({ label, labelBottom=false, options, ...rest }: RadioGroupProps) {
  const [pcd, setPcd] = useState('');

  return (
    <ChakraRadioGroup name="pcd" onChange={setPcd} value={pcd} {...rest} >
      <FormLabel>{label}</FormLabel>
      <Stack direction="row" justifyContent="center">
        {options.map(({ value, label }) => {
          return labelBottom ? (
            <Radio
              key={value}
              value={value}
              borderColor="gray.400"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              m="0"
            >
            {label}
          </Radio>
          ):(
            <Radio key={value} value={value} borderColor="gray.400">
              {label}
            </Radio>
          );
        })}
      </Stack>
    </ChakraRadioGroup>
  )
}