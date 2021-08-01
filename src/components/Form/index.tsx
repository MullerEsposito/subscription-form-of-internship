import {
  FormControl, FormLabel, Grid, Box, Button, useBreakpointValue, useDisclosure, Text,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useContext } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import InputMask from "react-input-mask";
import { strip } from "@fnando/cpf";
import { useHistory, useParams } from "react-router-dom";
import { Input } from "./Input";

import { InputFile } from "./InputFile";
import { RadioGroup } from "./RadioGroup";
import { InputPhoto } from "./InputPhoto";

import { pcdOptions, periodOptions } from "../../data";
import { api } from "../../services/api";

import { defaultValues, schema, SubscriptionInputs } from "./config";

import { SubscriptionsContext } from "../../context/SubscriptionsContext";

interface IFormProps extends React.CSSProperties {
  preloadedValues?: SubscriptionInputs;
}

interface ISubscriptionResponse {
  id: number;
  accesskey: string;
}

export function Form({ preloadedValues, ...rest }: IFormProps): JSX.Element {
  const [
    subscriptionResponse,
    setSubscriptionResponse] = useState<ISubscriptionResponse>({} as ISubscriptionResponse);
  const [errorMessage, setErrorMessage] = useState("");
  const { id } = useParams() as any;
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<SubscriptionInputs>({
    resolver: yupResolver(schema),
    defaultValues: preloadedValues,
  });
  const { accesskey } = useContext(SubscriptionsContext);
  const { isOpen, onOpen } = useDisclosure();
  const isShortScreen = useBreakpointValue({
    base: true,
    sm: false,
  });
  const history = useHistory();

  const onSubmit: SubmitHandler<SubscriptionInputs> = async (data) => {
    try {
      const fd = new FormData();
      data.cpf = strip(data.cpf);
      const inputs = data as any;

      for (const key in inputs) {
        if (inputs.hasOwnProperty(key)) {
          if (typeof inputs[key] === "object") {
            const documents = inputs[key];
            for (const keyNest in documents) {
              if (documents[keyNest]) {
                fd.append("documents[]", documents[keyNest][0], keyNest);
              }
            }
            continue;
          }
          fd.append(key, inputs[key]);
        }
      }

      if (preloadedValues) {
        await api
          .patch(`/subscriptions/${id}`, fd, {
            headers: { accesskey },
          })
          .then((res) => res);
      } else {
        const {
          data: { id, accesskey },
        } = await api
          .post("/subscriptions", fd, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((res) => res);
        setSubscriptionResponse({ id, accesskey });
      }

      reset({ ...defaultValues });
    } catch (err) {
      console.log("Error on request");
      setErrorMessage(err.response?.data?.error ?? err.message);
    }

    onOpen();
  };

  const renderRadiosGroup = (): JSX.Element => (
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
        render={({ field }) => (
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

  const renderInputsFile = (): JSX.Element => (
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
        name="documents.voluntaryServiceDeclaration"
        control={control}
        error={errors.documents?.voluntaryServiceDeclaration}
      >
        Certidão emitida pela Justiça Federal declarando prestação de serviço voluntário:
      </InputFile>
    </Box>
  );

  const renderInputs = (): JSX.Element => (
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
        isDisabled={!!preloadedValues?.address}
      >
        CPF:
      </Input>
      <Input {...register("email")} error={errors.email} type="email">
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

  const renderSubscriptionDoneMessage = (): JSX.Element => (
    <>
      <Text mb="10px">
        Vc receberá um e-mail com os seguintes dados para que possa acompanhar o status de sua inscrição:
      </Text>
      <Text>
        Número de inscrição:
        {' '}
        <strong>{subscriptionResponse.id}</strong>
        .
      </Text>
      <Text>
        Chave de acesso:
        {' '}
        <strong>{subscriptionResponse.accesskey}</strong>
        .
      </Text>
    </>
  );

  const renderModal = (): JSX.Element => (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setErrorMessage("");
        history.push("/subscriptions/query");
      }}
    >
      <ModalOverlay />
      <ModalContent
        bg={errorMessage ? "red.800" : "white"}
        color={errorMessage ? "white" : "black"}
      >
        <ModalHeader>
          { errorMessage
            ? "Não foi possível realizar a inscrição!"
            : "Inscrição realizada com sucesso!"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>

          { errorMessage || (preloadedValues
            ? <Text>"Sua ficha de inscrição foi atualizada com sucesso!"</Text>
            : renderSubscriptionDoneMessage())}

        </ModalBody>
      </ModalContent>
    </Modal>
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{

        ...rest,
        flex: 1,
        width: "100%",
        margin: "0 auto",
        padding: "10px",

      }}
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

        <InputPhoto
          name="documents.photo"
          control={control}
          error={errors.documents?.photo}
        />
        <Grid templateColumns={isShortScreen ? "1fr" : "1fr 1fr"} gap="10px">
          {renderInputs()}

          {renderRadiosGroup()}
        </Grid>

        {renderInputsFile()}

        <Button
          type="submit"
          mt="10px"
          alignSelf="center"
          bg="green.400"
          color="white"
          _hover={{ bg: "green.500" }}
        >
          {preloadedValues ? "Atualizar" : "Enviar"}
        </Button>
      </FormControl>
      {renderModal()}
    </form>
  );
}
