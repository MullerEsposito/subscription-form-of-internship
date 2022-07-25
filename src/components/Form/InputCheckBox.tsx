import React, { ForwardRefRenderFunction, useEffect, useState } from "react"
import { Checkbox, CheckboxProps, FormControl, Tooltip } from "@chakra-ui/react"
import { FieldError } from "react-hook-form"

interface InputProps extends CheckboxProps {
    error?: FieldError;
}

const InputCheckBoxBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ 
    error, children, ...rest 
}: InputProps, ref) => {
    const [isOpen, setIsOpen] = useState(!!error);

    useEffect(() => {
        setIsOpen(!!error);
        setTimeout(() => setIsOpen(false), 3000);
    }, [error])

    return (
        <FormControl mt={5}>
            <Tooltip isOpen={isOpen} label={error?.message} hasArrow>
                <Checkbox 
                    errorBorderColor="red.500"
                    isInvalid={!!error}
                    mr={2}
                    ref={ref}
                    {...rest}
                />
            </Tooltip>
            { children }
        </FormControl>
    )
}

export const InputCheckBox = React.forwardRef(InputCheckBoxBase);

InputCheckBox.displayName = "InputCheckBox";