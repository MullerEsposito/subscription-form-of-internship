import { Box } from "@chakra-ui/react";
import { Route, Switch } from "react-router-dom";

import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { AuthenticationProvider } from "./context/AuthenticationContext";
import { SubscriptionsProvider } from "./context/SubscriptionsContext";
import { Home } from "./pages/Home";
import { SignIn } from "./pages/SignIn";
import { CreateSubscription } from "./pages/subscriptions/CreateSubscription";
import { UpdateSubscription } from "./pages/subscriptions/UpdateSubscription";
import { SubscriptionQuery } from "./pages/SubscriptionQuery";
import { SubscriptionsList } from "./pages/SubscriptionsList";

function App(): JSX.Element {
  return (
    <Box
      h="100vh"
      p={0}
      w="100%"
      maxW="none"
      display="flex"
      flexDirection="column"
    >
      <Header title="Seleção de Estágio 2022" />
      <AuthenticationProvider>
        <SubscriptionsProvider>
          <Switch>
            <Route path="/subscription/query" component={SubscriptionQuery} />
            <Route path="/subscription/:id" component={UpdateSubscription} />
            <Route path="/subscription" component={CreateSubscription} />
            <Route path="/subscriptions" component={SubscriptionsList} />
            <Route path="/signin" component={SignIn} />
            <Route path="/" component={Home} />
          </Switch>
        </SubscriptionsProvider>
      </AuthenticationProvider>
      <Footer />
    </Box>
  );
}

export default App;
