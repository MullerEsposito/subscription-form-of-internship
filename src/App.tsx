import React from 'react';
import { Container } from '@chakra-ui/react';

import { Header } from './components/Header';

function App(): JSX.Element {
  return (
    <Container p={0} w="100%" maxW="none">
      <Header title="Seleção de Estágio 2021" />
    </Container>
  );
}

export default App;
