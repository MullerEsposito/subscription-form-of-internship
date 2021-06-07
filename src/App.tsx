import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

import { Header } from './components/Header';
import { Footer } from './components/Footer';

function App(): JSX.Element {
  return (
    <Flex direction="column" h="100vh" p={0} w="100%" maxW="none">
      <Header title="Seleção de Estágio 2021" />

      <Box flex={1} />

      <Footer />
    </Flex>
  );
}

export default App;
