import React from "react";
import { 
  RadioGroup as ChakraRadioGroup, 
  FormLabel, 
  Stack, 
  Radio as ChakraRadio, 
  RadioGroupProps as ChakraRadioGroupProps
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

const Radio: React.ForwardRefRenderFunction<HTMLInputElement, RadioGroupProps> = 
({ label, labelBottom=false, options, ...rest }, ref) => {
  const [pcd, setPcd] = useState('');

  return (
    <ChakraRadioGroup name="pcd" onChange={setPcd} value={pcd} {...rest} >
      <FormLabel>{label}</FormLabel>
      <Stack direction="row" justifyContent="center">
        {options.map(({ value, label }) => {
          return labelBottom ? (
            <ChakraRadio
              key={value}
              value={value}
              borderColor="gray.400"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              ref={ref}
            >
            {label}
          </ChakraRadio>
          ):(
            <ChakraRadio key={value} value={value} borderColor="gray.400" ref={ref}>
              {label}
            </ChakraRadio>
          );
        })}
      </Stack>
    </ChakraRadioGroup>
  )
}

export const RadioGroup = React.forwardRef(Radio);