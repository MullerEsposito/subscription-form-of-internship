import { 
  Button, FormControl, FormLabel, Modal, ModalBody, ModalCloseButton, 
  ModalContent, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Input } from "../components/Form/Input";
import { useState } from "react";
import { api } from "../services/api";

interface SubQueryResponse {
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
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
    resolver: yupResolver(schema)
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [subQueryResponse, setSubQueryResponse] = useState<SubQueryResponse>({} as SubQueryResponse);

  const onSubmit: SubmitHandler<Inputs> = async data => {
    console.log(data);
    try {
      const { data: response } = await api.get(`/subscriptions/${data.subId}/status`).then(res => res);
      setSubQueryResponse(response);
    } catch (error) {
      console.log(error.message);
    }
    onOpen();
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
            { subQueryResponse.status === "rejected" && (
              <Button size="xs" colorScheme="teal" mt="10px">
                Corrigir
              </Button>
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