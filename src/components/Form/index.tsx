import React, { useEffect, useState } from "react";
import { 
  FormControl, FormLabel, Grid, Box, Button, useBreakpointValue, useDisclosure, Text,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import InputMask from 'react-input-mask';

import { InputFile } from "./InputFile";
import { Input } from "./Input";
import { RadioGroup } from "./RadioGroup";
import { InputPhoto } from "./InputPhoto";

import { pcdOptions, periodOptions } from "../../data"; 
import { api } from "../../services/api";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { defaultValues, schema, SubscriptionInputs } from "./config";


export function Form({ ...rest}: React.CSSProperties): JSX.Element {
  const { 
    register, 
    control, 
    reset, 
    handleSubmit, 
    formState: { isSubmitSuccessful, errors } 
  } = useForm<SubscriptionInputs>({
    resolver: yupResolver(schema)
  });
  const [subscriptionNumber, setSubscriptionNumber] = useState(null);
  const [submittedData, setSubmittedData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isShortScreen = useBreakpointValue({
    base: true,
    sm: false,
  });

  useEffect(() => {
    if (isSubmitSuccessful) {      
      reset({ ...defaultValues });
    }
  }, [reset, isSubmitSuccessful, submittedData]);

  const onSubmit: SubmitHandler<SubscriptionInputs> = async (data) => {
    console.log(data);
    setSubmittedData(data);
    try {
      const { data: { id } } = await api.post('/subscriptions', data).then(res => res);

      setSubscriptionNumber(id);
    } catch (err) {
      switch (err.response.data.error) {
        case "CPF already registered!":
          setErrorMessage("Já existe uma inscrição feita com este CPF!");
          break;
        default: 
          setErrorMessage(err.response.data.error);
      }
    }
    onOpen();
  }

  const renderRadiosGroup = (): JSX.Element => {
    return (
      <>
        <Controller 
          control={control}
          name="period"
          render={({ field }) => (
            <RadioGroup
              options={periodOptions}
              error={errors.period}
              labelBottom
              {...field}
            >
              Período em que está matriculado:
            </RadioGroup>
          )}
        />
        <Controller 
          control={control}
          name="pcd"
          render={({ field  }) => (
            <RadioGroup
              options={pcdOptions} 
              error={errors.pcd}
              w="150px" 
              {...field}
            >
              PCD:
            </RadioGroup>            
          )}
        />
      </>
    );
  }

  const renderInputsFile = (): JSX.Element => {
    return (
      <Box m="20px 0">
          <InputFile
            name="documents.identity"
            control={control}
            error={errors.documents?.identity}
          >
            Documento de Identificação:
          </InputFile>
          <InputFile
            name="documents.collegeRegistrationDeclaration"
            control={control}
            error={errors.documents?.collegeRegistrationDeclaration}
          >
            Declaração da instituição de ensino em que está matriculado (a):
          </InputFile>
          <InputFile
            name="documents.schoolRecords"
            control={control}
            error={errors.documents?.schoolRecords}
          >
            Histórico Escolar:
          </InputFile>
          <InputFile
            name="documents.criminalRecordDeclaration"
            control={control}
            error={errors.documents?.criminalRecordDeclaration}
          >
            Atestado de Antecedentes Criminais:
          </InputFile>
          <InputFile 
            name="documents.voluntaryServiceDeclaration"
            control={control}
            error={errors.documents?.voluntaryServiceDeclaration}
          >
            Certidão emitida pela Justiça Federal declarando prestação de serviço voluntário:
          </InputFile>
        </Box>
    );
  }

  const renderInputs = (): JSX.Element => {
    return (
      <>
        <Input {...register("candidateName")} error={errors.candidateName}>
          Nome do Candidato:
        </Input>
        <Input {...register("collegeName")} error={errors.collegeName}>
          Instituição de Ensino:
        </Input>
        <Input {...register("address")} error={errors.address}>
          Endereço:
        </Input>
        <Input 
          {...register("cpf")} 
          error={errors.cpf} 
          as={InputMask}
          mask="999.999.999-99"
        >
          CPF:
        </Input>
        <Input {...register("email")} error={errors.email} type="email" >
          E-mail:
        </Input>
        <Input 
          {...register("phone")} 
          error={errors.phone} 
          as={InputMask}
          mask="(99) 99999-9999"
        >
          Telefone:
        </Input>
      </>
    );
  }

  const renderModal = (): JSX.Element => {
    return (
      <Modal isOpen={isOpen} onClose={() => {
        setErrorMessage("");
        onClose();
      }}>
        <ModalOverlay />
        <ModalContent
          bg={errorMessage ? "red.800" : "white"}
          color={errorMessage ? "white" : "black"}
        >
          <ModalHeader>
            { errorMessage 
              ? "Não foi possível realizar a inscrição!"
              : "Inscrição realizada com sucesso!"
            }
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              { errorMessage
                ? errorMessage
                : `O número de sua inscrição é ${subscriptionNumber}`
              }
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)}
      style={{...rest, flex: 1, width: '100%', margin: '0 auto', padding: '10px'}}
    >
      <FormControl
        as="fieldset"
        display="flex"
        flexDirection="column"
        maxW="900px"
        m="0 auto"
        p="10px"
        border="1px"
        borderColor="#ccccccab"
        bg="white"
      >
        <FormLabel as="legend" textAlign="center" fontSize="1.5rem">
          Ficha de Inscrição
        </FormLabel>

        <InputPhoto name="documents.photo" control={control} error={errors.documents?.photo} />
        <Grid templateColumns={isShortScreen ? '1fr' : '1fr 1fr'} gap="10px">
          { renderInputs() }
          
          { renderRadiosGroup() }
        </Grid>

        { renderInputsFile() }        

        <Button 
          type="submit"
          mt="10px"
          alignSelf="center" 
          bg="green.400" 
          color="white" 
          _hover={{ bg: 'green.500' }}
        >
          Enviar
        </Button>
      </FormControl>
      { renderModal() }

    </form>
  )
};
