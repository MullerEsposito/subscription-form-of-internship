import { Flex } from "@chakra-ui/react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Form } from "../components/Form";
import { SubscriptionInputs } from "../components/Form/config";
import { SubscriptionsContext } from "../context/SubscriptionsContext";
import { api } from "../services/api";

export function SubscriptionFormUpdate(): JSX.Element {
  const [data, setData] = useState<SubscriptionInputs | undefined>();
  const { id } = useParams() as any;
  const history = useHistory();
  const { accesskey } = useContext(SubscriptionsContext);
  
  useEffect(() => {
    (async function() {
      try {
        const { data } = await api.get(`/subscriptions/${id}`, {
          headers: { accesskey }
        }).then(res => res);
        setData(data);
      } catch {
        history.push("/subscription/query");
      }
    })();
  }, [id, accesskey, history]);


  return (
    <Flex flex={1}>
      { data 
        ? <Form preloadedValues={data} /> 
        : <div>Loading...</div>
      }
    </Flex>
  )
}