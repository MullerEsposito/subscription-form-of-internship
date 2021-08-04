import { Button, FormControl, FormLabel, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Input } from "../components/Form/Input";
import { AuthenticationContext } from "../context/AuthenticationContext";
import { api } from "../services/api";

export function SignIn() {
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const { setIsAuthenticated } = useContext(AuthenticationContext);

  const onSubmit = async () => {
    const data = { email, password };
    try {
      const { data: {
        user, token
      } } =  await api.post("/authentication/sessions", data).then(res => res);
      
      localStorage.setItem("@SSJMCL2021", JSON.stringify({ user, token }));
      setIsAuthenticated(true);
      history.push("/subscriptions")
    } catch (err) {
      setErrorMessage(err.response?.data?.error ?? err.message);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
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

        <Input name="email" value={email} onChange={e => setEmail(e.target.value)}>
          E-mail:
        </Input>
        <Input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)}>
          Senha:
        </Input>
        {!!errorMessage && <Text>{errorMessage}</Text>}

        <Button 
          onClick={onSubmit}
          type="button"
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