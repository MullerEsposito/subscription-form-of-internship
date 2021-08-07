import { 
  Button, FormControl, FormLabel, Modal, ModalBody, ModalCloseButton, 
  ModalContent, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Input } from "../components/Form/Input";
import { useState } from "react";
import { api } from "../services/api";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { SubscriptionsContext } from "../context/SubscriptionsContext";

interface SubQueryResponse {
  id: number;
  status: "accepted" | "rejected" | "pending";
  message: string;
}

type Inputs = {
  subId: number;
  subPassword: string;
}

const schema = yup.object().shape({
  subId: yup
    .number()
    .positive("Número de inscrição inválido")
    .integer("Número de inscrição inválido")
    .required("Número de inscrição é obrigatório")
    .max(999, "Número de inscrição inválido")
    .typeError("Número de inscrição inválido"),
  subPassword: yup.string().required("Senha é obrigatório!")
})

export function SubscriptionQuery() {
  const { register, handleSubmit, setError, formState: { errors } } = useForm<Inputs>({
    resolver: yupResolver(schema)
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [subQueryResponse, setSubQueryResponse] = useState<SubQueryResponse>({} as SubQueryResponse);
  const { setAccesskey } = useContext(SubscriptionsContext);

  const onSubmit: SubmitHandler<Inputs> = async data => {
    try {
      const { data: response } = await api.get(`/subscriptions/${data.subId}/status`, {
        headers: { accesskey: data.subPassword }
      }).then(res => res);
      
      setSubQueryResponse(response);
      setAccesskey(data.subPassword);
      onOpen();
    } catch ({ response: { data } }) {
      
      setError("subPassword", { type: "manual", message: data.error });
    }
  }

  const renderModal = (): JSX.Element => {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          bg={subQueryResponse.status}
          color="black"
        >
          <ModalHeader>
            Status da inscrição
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              { subQueryResponse.message }
            </Text>
            { subQueryResponse.status === "pending" && !subQueryResponse.message.includes("em análise!") && (
              <>
              <Link to={`/subscription/${subQueryResponse.id}`}>
                <Button size="xs" colorScheme="teal" mt="10px">
                  Corrigir
                </Button>
              </Link>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ flex: 1, width: '100%', margin: '0 auto', padding: '10px'}}
    >
      <FormControl
        as="fieldset"
        display="flex"
        flexDirection="column"
        maxW="400px"
        m="0 auto"
        p="10px"
        border="1px"
        borderColor="#ccccccab"
        bg="white"
      >
        <FormLabel as="legend" textAlign="center" fontSize="1.5rem">
          Consultar Inscrição
        </FormLabel>              
        
        <Input 
          {...register("subId")} 
          type="number" 
          error={errors.subId}
        >
          Número da inscrição:
        </Input>

        <Input 
          {...register("subPassword")}
          error={errors.subPassword}
        >
          Senha de acesso:
        </Input>

        <Button 
          type="submit"
          alignSelf="center" 
          mt="10px"
          bg="green.400" 
          color="white" 
          _hover={{ bg: 'green.500' }}
        >
          Verificar
        </Button>
      </FormControl>
      { renderModal() }
    </form>
  )
}