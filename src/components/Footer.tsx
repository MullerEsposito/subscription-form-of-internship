import { Box, Flex, Text } from "@chakra-ui/react";

export function Footer(): JSX.Element {
  return (
    <Flex direction="column" bg="green.800" h="166px" p="10px">
      <Flex w="100%" alignItems="center">
        <address>
          <p>Edifício Sede</p>
          <p>Av. Álvares Cabral, 1805 - Bairro Santo Agostinho</p>
          <p>CEP: 30170-001</p>
          <p>Belo Horizonte/MG</p>
          <p>Telefone: (31) 3501-1300</p>
          <p>CNPJ: 05.452.786/0001-00</p>        
        </address>

        <Box ml='auto' p='10px'>
          Redes Sociais
        </Box>

      </Flex>
      <Flex alignItems="center" justifyContent="center" flex={1}>
        <Text>© Tribunal Regional Federal da 1ª Região - 2020</Text>
      </Flex>
    </Flex>
  )
}