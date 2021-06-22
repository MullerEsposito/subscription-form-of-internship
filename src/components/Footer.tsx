import { Box, Flex, Icon, Link, Text } from "@chakra-ui/react";
import { ImWhatsapp } from "react-icons/im";

export function Footer(): JSX.Element {
  return (
    <Flex direction="column" bg="green.800" h="166px" p="10px">
      <Flex w="100%" alignItems="center">
        <address>
          <p>Av. Deputado Esteves Rodrigues, Nº 852 - Centro</p>
          <p>CEP: 39400-215</p>
          <p>Montes Claros/MG</p>
          <p>Telefone: (38) 2101-8200</p>
          <p>CNPJ: 05.452.786/0001-00</p>        
        </address>

        <Box ml='auto' p='10px'>
          <Link href="https://api.whatsapp.com/send?phone=5538984171472" isExternal>
            <Icon 
              as={ImWhatsapp} 
              boxSize="2rem" 
              _hover={{ boxSize: '2.2rem' }}
              transition="all 0.8s"
            />
          </Link>
        </Box>

      </Flex>
      <Flex alignItems="center" justifyContent="center" flex={1} pt="20px">
        <Text>© Tribunal Regional Federal da 1ª Região - 2021</Text>
      </Flex>
    </Flex>
  )
}