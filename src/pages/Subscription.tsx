import { Form } from "../components/Form";
import { useParams, useHistory } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { SubscriptionsContext } from "../context/SubscriptionsContext";
import { api } from "../services/api";
import { ISubscription } from "../components/Form/config";
import Loader from "react-loader-spinner";
import { Flex } from "@chakra-ui/react";

import { defaultValues } from "../components/Form/config"

export function Subscription() {
  const [subscription, setSubscription] = useState<ISubscription | undefined>();
  const { id: isUpdateMode } = useParams<{ id: string | undefined}>();
  const { accesskey } = useContext(SubscriptionsContext);
  const history = useHistory();

  useEffect(() => {
    const id = isUpdateMode;
    if (isUpdateMode) {
      (async function() {
        try {
          const { data } = await api.get(`/subscriptions/${id}`, {
            headers: { accesskey }
          }).then(res => res);
          setSubscription(data);
        } catch {
          history.push("/subscription/query");
        }
      })();
    }
  }, [isUpdateMode, accesskey, history]);

  const renderLoader = (): JSX.Element => (
    <Flex flex={1} justifyContent="center" alignItems="center">
      <Loader type="TailSpin" height={100} width={100} />
    </Flex>
  )
  
  if (isUpdateMode) {
    if (subscription) {
      const { id, accesskey, status, ...preloadedValues} = subscription;

      return <Form defaultValues={preloadedValues} subscription={subscription} flex={1} /> ;
    }
    return renderLoader();
  }

  return <Form defaultValues={defaultValues} flex={1} />;
}