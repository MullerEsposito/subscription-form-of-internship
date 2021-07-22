import { Box } from '@chakra-ui/react';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Route, Switch } from 'react-router-dom';
import { SubscriptionQuery } from './pages/SubscriptionQuery';
import { SubscriptionForm } from './pages/SubscriptionForm';
import { SignIn } from './pages/SignIn';
import { Home } from './pages/Home';

function App(): JSX.Element {
  return (
    <Box h="100vh" p={0} w="100%" maxW="none" display="flex" flexDirection="column">
      <Header title="Seleção de Estágio 2021" />
      <Switch>
        <Route path="/subscription/query" component={ SubscriptionQuery} />
        <Route path="/subscription" component={ SubscriptionForm } />
        <Route path="/signin" component={ SignIn } />
        <Route exact path="/" component={ Home } />
      </Switch>
      <Footer />
    </Box>
  );
}

export default App;
