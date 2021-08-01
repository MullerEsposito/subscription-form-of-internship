import { Flex, Table, TableCaption, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";

export function SubscriptionsList(): JSX.Element {
  return (
    <Flex>
      <Table variant="striped" colorScheme="teal">
        <TableCaption>Lista de Inscrições</TableCaption>
        <Thead>
          <Tr>
            <Th>Nª</Th>
            <Th>Nome</Th>
            <Th>CPF</Th>
            <Th>Status</Th>
            <Th>Comandos</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>1</Td>
            <Td>Müller Esposito Nunes</Td>
            <Td>671.641.103-87</Td>
            <Td>Pendente</Td>
            <Td></Td>
          </Tr>
          <Tr>
            <Td>2</Td>
            <Td>Laura Fernanda Dias Ribeiro Esposito</Td>
            <Td>064.589.936-41</Td>
            <Td>Accepted</Td>
            <Td></Td>
          </Tr>
          <Tr>
            <Td>3</Td>
            <Td>Nelson Gomes</Td>
            <Td>123.345.567-87</Td>
            <Td>rejected</Td>
            <Td></Td>
          </Tr>
        </Tbody>
      </Table>
    </Flex>
  )
}