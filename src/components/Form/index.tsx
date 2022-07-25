import { FormControl, FormLabel } from "@chakra-ui/react";
import React from "react";

interface IFormProps extends React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  label?: string;
}

export function Form({ label, children, ...rest }: IFormProps): JSX.Element {
  const renderLabel = () => {
    return (
      <FormLabel as="legend" textAlign="center" fontSize="1.5rem">
        { label }
      </FormLabel>
    );
  };

  return (
    <form
      {...rest}
      style={{
        width: "100%",
        margin: "0 auto",
        padding: "10px",
      }}
    >
      <FormControl
        as="fieldset"
        display="flex"
        flexDirection="column"
        maxW="900px"
        m="0 auto"
        p="10px"
        border="1px"
        borderColor="#ccccccab"
        bg="white"
      >
        {label && renderLabel()}
        
        { children }
      </FormControl>
    </form>
  )
}