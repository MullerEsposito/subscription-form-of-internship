import { Flex } from "@chakra-ui/react";

export function Footer(): JSX.Element {
  return (
    <Flex bg="green.800" h="166px">
      <address>
        Edifício Sede
        Av. Álvares Cabral, 1805 - Bairro Santo Agostinho
        CEP: 30170-001
        Belo Horizonte/MG
        Telefone: (31) 3501-1300
        CNPJ: 05.452.786/0001-00
      </address>
    </Flex>
  )
}