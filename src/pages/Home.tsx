import {
  Grid, Icon, Text, VStack, Link as ChakraLink,
} from "@chakra-ui/react";
import { AiOutlineForm } from "react-icons/ai";
import { GiArchiveResearch } from "react-icons/gi";
import { Link } from "react-router-dom";

export function Home(): JSX.Element {
  return (
    <Grid
      templateColumns="repeat(2, 1fr)"
      gap={2}
      w="50wh"
      m="0 auto"
      color="gray.600"
      flex={1}
    >
      <VStack justifyContent="center">
        <ChakraLink
          as={Link}
          to="/subscription"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Icon as={AiOutlineForm} w="3rem" h="3rem" />
          <Text>Fazer Inscrição</Text>
        </ChakraLink>
      </VStack>
      <VStack justifyContent="center">
        <ChakraLink
          as={Link}
          to="/subscription/query"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Icon as={GiArchiveResearch} w="3rem" h="3rem" />
          <Text>Consultar Inscrição</Text>
        </ChakraLink>
      </VStack>
    </Grid>
  );
}
