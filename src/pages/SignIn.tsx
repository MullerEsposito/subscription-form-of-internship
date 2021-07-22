import { Button, FormControl, FormLabel } from "@chakra-ui/react";
import { Input } from "../components/Form/Input";

export function SignIn() {

  return (
    <form
      style={{ flex: 1, width: '100%', margin: '0 auto', padding: '10px'}}
    >
      <FormControl
        as="fieldset"
        display="flex"
        flexDirection="column"
        maxW="400px"
        m="0 auto"
        p="10px"
        border="1px"
        borderColor="#ccccccab"
        bg="white"
      >
        <FormLabel as="legend" textAlign="center" fontSize="1.5rem">
          SignIn
        </FormLabel>

        <Input type="number">
          E-mail:
        </Input>
        <Input>
          Senha:
        </Input>

        <Button 
          type="submit"
          alignSelf="center" 
          mt="10px"
          bg="green.400" 
          color="white" 
          _hover={{ bg: 'green.500' }}
        >
          Enviar
        </Button>
      </FormControl>
    </form>
  )
}