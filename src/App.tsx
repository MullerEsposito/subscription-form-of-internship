import { Flex } from '@chakra-ui/react';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Form } from './components/Form';

function App(): JSX.Element {
  return (
    <Flex direction="column" h="100vh" p={0} w="100%" maxW="none">
      <Header title="Seleção de Estágio 2021" />

      <Form flex={1} />
      
      <Footer />
    </Flex>
  );
}

export default App;
