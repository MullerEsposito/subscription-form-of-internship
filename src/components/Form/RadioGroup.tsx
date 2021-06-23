import React from 'react';
import { 
  RadioGroup as ChakraRadioGroup, 
  FormLabel, 
  Stack, 
  Radio as ChakraRadio, 
  RadioGroupProps as ChakraRadioGroupProps
} from '@chakra-ui/react';

type Option = {
  value: string;
  label: string;
}

interface RadioGroupProps extends Omit<ChakraRadioGroupProps, 'children'> {
  value: string;
  labelBottom?: boolean;
  options: Option[];
  children: string;
  isRequired: boolean;
  setValue: (value: string) => void;
}

export const RadioGroup = React.memo(({ 
  value, setValue, labelBottom=false, isRequired=false, options, children, ...rest 
}: RadioGroupProps) => {
  return (
    <ChakraRadioGroup {...rest} onChange={setValue} value={value}>
      <FormLabel>{children}</FormLabel>
      <Stack direction="row" justifyContent="center">
        {options.map(({ value, label }) => {
          return labelBottom ? (
            <ChakraRadio
              key={value}
              value={value}
              isRequired={isRequired}
              borderColor="gray.400"
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
            {label}
          </ChakraRadio>
          ):(
            <ChakraRadio key={value} value={value} isRequired={isRequired} borderColor="gray.400">
              {label}
            </ChakraRadio>
          );
        })}
      </Stack>
    </ChakraRadioGroup>
  )
});

RadioGroup.displayName = "RadioGroup";