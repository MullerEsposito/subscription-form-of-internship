import React, { ForwardRefRenderFunction, useEffect, useState } from 'react';
import { 
  RadioGroup as ChakraRadioGroup, 
  FormLabel, 
  Stack, 
  Radio as ChakraRadio,
  RadioGroupProps as ChakraRadioGroupProps,
  Tooltip,
} from '@chakra-ui/react';
import { Control, FieldError } from "react-hook-form";
import { ISubscription } from '../../modules/subscription/types';

type Option = {
  value: string;
  label: string;
}

interface RadioGroupProps extends Omit<ChakraRadioGroupProps, 'children' | 'name'> {
  control?: Control<ISubscription>;
  name: string;
  labelBottom?: boolean;
  options: Option[];
  error?: FieldError
  children: string;
}

const RadioGroupBase: ForwardRefRenderFunction<HTMLInputElement, RadioGroupProps> = ({ 
    control, name, labelBottom=false, options, error, children, ...rest 
  }: RadioGroupProps, ref) => {
    const [isOpen, setIsOpen] = useState(!!error);

    useEffect(() => {
      setIsOpen(!!error);
      setTimeout(() => setIsOpen(false), 3000);
    }, [error])

    return (
      <ChakraRadioGroup {...rest} >
        <FormLabel>{children}</FormLabel>
          <Tooltip isOpen={isOpen} label={error?.message} hasArrow>
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
          </Tooltip>
      </ChakraRadioGroup>
    )
};

export const RadioGroup = React.memo(React.forwardRef(RadioGroupBase));

RadioGroup.displayName = "RadioGroup";