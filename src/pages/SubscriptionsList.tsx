import { Flex, Table, Tbody, Td, Box, Th, Thead, Tr, Text } from "@chakra-ui/react";
import { Link, useHistory } from "react-router-dom";
import { format } from "@fnando/cpf";
import { useEffect } from "react";
import { api } from "../services/api";
import { useState } from "react";
import { ISubscription } from "../components/Form/config";
import { useContext } from "react";
import { SubscriptionsContext } from "../context/SubscriptionsContext";
import Loader from "react-loader-spinner";

export function SubscriptionsList(): JSX.Element {
  const [subscriptions, setSubscriptions] = useState<ISubscription[] | undefined>();
  const { setAccesskey } = useContext(SubscriptionsContext);
  const history = useHistory();

  useEffect(() => {
    const localData = localStorage.getItem("@SSJMCL2021");

    (async function() {
      try {
        if (!localData) throw new Error("Usuário não autenticado!");

        const { token } = JSON.parse(localData);
        const { data } = await api.get("/subscriptions", {
          headers: { Authorization: `Bearer ${token}` }
        }).then(res => res);
        setSubscriptions(data);
      } catch (error) {
        history.push("/signin");
      }
    })();
  }, [history]);

  if (!subscriptions) {
    return (
      <Flex justifyContent="center" alignItems="center" flex={1}>
        <Loader type="TailSpin" height={100} width={100} />
      </Flex>
    )
  } 
  return (
    <Flex flex={1} flexDirection="column" color="black" alignItems="center">
      <Text fontSize="2rem" lineHeight="2rem" m="10px 0">
        Lista de Inscrições
      </Text>
      <Box 
        overflowY="scroll" 
        maxH="55vh" 
        maxW="950px" 
      >
        <Table 
          variant="striped" 
          colorScheme="green" 
          minW={["250px", "400px", "600px", "900px"]}
        >
          <Thead>
            <Tr>
              <Th textAlign="center" fontSize="1.125rem" p="0">Nª</Th>
              <Th textAlign="center" fontSize="1.125rem">Nome</Th>
              <Th textAlign="center" fontSize="1.125rem">CPF</Th>
              <Th textAlign="center" fontSize="1.125rem">Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              subscriptions.map(sub => (
                <Tr h="10px" key={sub.id}>
                  <Td p="0" textAlign="center" w="5%">{ sub.id }</Td>
                  <Td w="45%">{ sub.candidateName }</Td>
                  <Td w="25%" p="0" textAlign="center">{ format(sub.cpf) }</Td>
                  <Td w="25%">
                    <Link to={`/subscription/${sub.id}`} onClick={() => setAccesskey(sub.accesskey)}>
                      <Box
                        bg={ sub.status }
                        borderRadius="10px"
                        textAlign="center"
                        fontWeight="bold"
                        p="2px 10px"
                        _hover={{
                          filter: "brightness(140%)",
                          transition: "filter 0.8s"
                        }}
                      >
                        { sub.status }
                      </Box>
                    </Link>
                  </Td>
                </Tr>
              ))
            }
          </Tbody>
        </Table>
      </Box>
    </Flex>
  )
}