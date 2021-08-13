import { FormControl, FormLabel, Select as ChakraSelect, SelectProps as ChakraSelectProps, Tooltip } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";

interface SelectProps extends ChakraSelectProps {
  options: { label: string, value: string }[];
  children: string;
  error?: FieldError;
}

const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = ({ 
  options, error, children, ...rest 
}: SelectProps, ref): JSX.Element => {
  const [isOpen, setIsOpen] = useState(!!error);

  useEffect(() => {
    setIsOpen(!!error);
    setTimeout(() => setIsOpen(false), 3000);
  }, [error]);

  return (
    <FormControl>
        <FormLabel>{ children }</FormLabel>
        <Tooltip isOpen={isOpen} label={error?.message} hasArrow>
          <ChakraSelect 
            borderColor="gray.400"
            errorBorderColor="red.500" 
            ref={ref}
            {...rest}
          >
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </ChakraSelect>
        </Tooltip>
      </FormControl>
  )
}

export const Select = React.memo(React.forwardRef(SelectBase))

Select.displayName = "Select";