import {
  FormControl, FormLabel, Grid, Box, Button, useBreakpointValue, useDisclosure, Text,
  Image, Flex,
  Link as ChakraLink, Icon, VStack, Textarea,
} from "@chakra-ui/react";
import { BiLinkExternal } from "react-icons/bi"
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useContext, FormEvent } from "react";
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
import imgRejected from "../../assets/rejected.png"
import imgAccepted from "../../assets/accepted.png"
import imgPending from "../../assets/pending.png"

import { ISubscription, schema, schemaUpdate, SubscriptionInputs } from "./config";

import { SubscriptionsContext } from "../../context/SubscriptionsContext";
import { AuthenticationContext } from "../../context/AuthenticationContext";
import { IModal, Modal } from "../Modal";

interface IFormProps extends React.CSSProperties {
  defaultValues: SubscriptionInputs;
  subscription?: ISubscription;
}

interface IUpdateStatus {
  id: number | undefined;
  status?: "accepted" | "rejected" | "pending";
  message?: string;
}

interface FormElements extends HTMLFormControlsCollection {
  message: HTMLInputElement;
}
interface FormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export function Form({ defaultValues, subscription: sub, ...rest }: IFormProps): JSX.Element {
  const [modalConfig, setModalConfig] = useState<IModal>({} as IModal);
  const [status, setStatus] = useState<"accepted" | "rejected" | "pending">(sub?.status ?? "pending");
  const { id } = useParams() as any;
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<SubscriptionInputs>({
    resolver: yupResolver(sub ? schemaUpdate : schema),
    defaultValues,
  });
  const { accesskey } = useContext(SubscriptionsContext);
  const { isAuthenticated } = useContext(AuthenticationContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isShortScreen = useBreakpointValue({
    base: true,
    sm: false,
  });
  const history = useHistory();
  const statusImg = {
    accepted: imgAccepted,
    rejected: imgRejected,
    pending: imgPending,
  };

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

      if (sub) {
        await api.patch(`/subscriptions/${id}`, fd, {
            headers: { accesskey },
        }).then((res) => res);

        setModalConfig({
          type: "success",
          messages: {
            header: "Inscrição atualizada com sucesso!",
            body: <Text>Aguarde seus dados serem analisados novamente.</Text>,
          },
          onClose: () => history.push("/"),
        })
      } else {
        const { data: { id, accesskey }} = await api.post("/subscriptions", fd, {
            headers: { "Content-Type": "multipart/form-data" },
        }).then((res) => res);

        setModalConfig({
          type: "success",
          messages: {
            header: "Inscrição realizada com sucesso!",
            body: renderSubscriptionDoneMessage(id, accesskey),
          },
          onClose: () => { history.push("/subscription/query"); },
        })
      }

      reset({ ...defaultValues });
    } catch (err) {
      setModalConfig({
        type: "error",
        messages: {
          header: "Não foi possível realizar a inscrição!",
          body: err.response?.data?.error,
        },
        onClose: () => { history.push("/"); },
      })
    }

    onOpen();
  };

  const updateStatus = async ({ id, status="pending", message }: IUpdateStatus): Promise<void> => {
    const storage = localStorage.getItem("@SSJMCL2021");
    if (storage) {
      const { token } = JSON.parse(storage);
      try {
        await api.patch(`/subscriptions/${id}/status`, {
          status, message
        }, { headers: { Authorization: `Bearer ${token}`}});
        setStatus(status);

      } catch (err) {};
    }
  }

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
        accept="application/pdf"
      >
        Documento de Identificação:
      </InputFile>
      <InputFile
        name="documents.collegeRegistrationDeclaration"
        control={control}
        error={errors.documents?.collegeRegistrationDeclaration}
        accept="application/pdf"
      >
        Declaração da instituição de ensino em que está matriculado (a):
      </InputFile>
      <InputFile
        name="documents.schoolRecords"
        control={control}
        error={errors.documents?.schoolRecords}
        accept="application/pdf"
      >
        Histórico Escolar:
      </InputFile>
      <InputFile
        name="documents.voluntaryServiceDeclaration"
        control={control}
        error={errors.documents?.voluntaryServiceDeclaration}
        accept="application/pdf"
      >
        Certidão emitida pela Justiça Federal declarando prestação de serviço voluntário:
      </InputFile>
    </Box>
  );

  const renderLinksFile = (): JSX.Element => {
    return (
      <VStack m="20px 0">
        <ChakraLink href={`${process.env.REACT_APP_BASE_URL}/files/${strip(defaultValues.cpf)}/identity.pdf`} isExternal>
          Documento de Identificação <Icon as={BiLinkExternal} mx="2px" />
        </ChakraLink>
        <ChakraLink href={`${process.env.REACT_APP_BASE_URL}/files/${strip(defaultValues.cpf)}/collegeRegistrationDeclaration.pdf`} isExternal>
          Declaração da instituição de ensino em que está matriculado <Icon as={BiLinkExternal} mx="2px" />
        </ChakraLink>
        <ChakraLink href={`${process.env.REACT_APP_BASE_URL}/files/${strip(defaultValues.cpf)}/schoolRecords.pdf`} isExternal>
          Histórico Escolar <Icon as={BiLinkExternal} mx="2px" />
        </ChakraLink>
        <ChakraLink href={`${process.env.REACT_APP_BASE_URL}/files/${strip(defaultValues.cpf)}/voluntaryServiceDeclaration.pdf`} isExternal>
          Certidão emitida pela Justiça Federal declarando prestação de serviço voluntário <Icon as={BiLinkExternal} mx="2px" />
        </ChakraLink>
      </VStack>
    )
  }

  const renderInputs = (): JSX.Element => (
    <>
      <Input {...register("candidateName")} error={errors.candidateName} isDisabled={!!isAuthenticated}>
        Nome do Candidato:
      </Input>
      <Input {...register("collegeName")} error={errors.collegeName} isDisabled={!!isAuthenticated}>
        Instituição de Ensino:
      </Input>
      <Input {...register("address")} error={errors.address} isDisabled={!!isAuthenticated}>
        Endereço:
      </Input>
      <Input
        {...register("cpf")}
        error={errors.cpf}
        as={InputMask}
        mask="999.999.999-99"
        isDisabled={!!defaultValues.cpf}
      >
        CPF:
      </Input>
      <Input {...register("email")} error={errors.email} type="email" isDisabled={!!isAuthenticated}>
        E-mail:
      </Input>
      <Input
        {...register("phone")}
        error={errors.phone}
        as={InputMask}
        mask="(99) 99999-9999"
        isDisabled={!!isAuthenticated}
      >
        Telefone:
      </Input>
    </>
  );
  
  const renderStatusHandleButtons = (): JSX.Element => {
    const renderCorrectionBodyInput = (): JSX.Element => {
      return (
        <form
          onSubmit={(e: FormEvent<FormElement>) => {
            e.preventDefault();
            updateStatus({
              id: sub?.id,
              status: "pending",
              message: e.currentTarget.elements.message.value,
            });
            onClose();
          }}
        >
          <Textarea bg="white" name="message" type="" h="5rem" />
          <Button
            type="submit"
            bg="green.400"
            color="white"
            mt="20px"
            _hover={{ filter: "brightness(130%)" }}
          >
            Enviar
          </Button>
        </form>
      )
    }

    return (
      <>
        <Button
          bg="green.400"
          color="white"
          _hover={{ filter: "brightness(130%)" }}
          onClick={() => updateStatus({ 
            id: sub?.id,
            status: "accepted",
            message: "Sua inscrição foi homologada!",
          })}
        >
          Homologar
        </Button>
        <Button
          bg="orange.400"
          color="white"
          m="0 5px"
          _hover={{ filter: "brightness(130%)" }}
          onClick={() => {
            setModalConfig({
              type: "info",
              messages: {
                header: "Informe as correções necessárias!",
                body: renderCorrectionBodyInput(),
              },
              onClose,
            });
            onOpen();
          }}
        >
          Solicitar Correções
        </Button>
        <Button 
          bg="red.400" 
          color="white" 
          _hover={{ filter: "brightness(130%)" }}
          onClick={() => updateStatus({ 
            id: sub?.id,
            status: "rejected",
            message: "Sua inscrição não foi aceita!",
          })}
        >
          Rejeitar
        </Button>
      </>
    )
  }

  const renderSubscriptionDoneMessage = (id: number, accesskey: string): JSX.Element => (
    <>
      <Text mb="10px">
        Vc receberá um e-mail com os seguintes dados para que possa acompanhar o status de sua inscrição:
      </Text>
      <Text>
        Número de inscrição:
        {' '}
        <strong>{id}</strong>
        .
      </Text>
      <Text>
        Chave de acesso:
        {' '}
        <strong>{accesskey}</strong>
        .
      </Text>
    </>
  );

  return (
    <>
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        ...rest,
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

        { sub ? (
          <Flex justifyContent="center" position="relative">
            <Image 
              src={`${process.env.REACT_APP_BASE_URL}/files/${strip(defaultValues.cpf)}/photo.jpg`} 
              w="100px" 
              maxH="150px" 
              alignSelf="center"
              mb="20px"
              border="1px"
              borderColor="#ccccccab"
            />
            <Image
              src={statusImg[status]}
              boxSize={["80px","100px"]}
              objectFit="scale-down"
              position="absolute"
              right={30} 
            />
          </Flex>
        ):(
          <InputPhoto
            name="documents.photo"
            control={control}
            error={errors.documents?.photo}
            accept="image/jpeg"
          />
        )}

        <Grid templateColumns={isShortScreen ? "1fr" : "1fr 1fr"} gap="10px">
          {renderInputs()}

          {renderRadiosGroup()}
        </Grid>

        { isAuthenticated ? renderLinksFile() : renderInputsFile() }
        
        <Box alignSelf="center" mt="10px">
          { isAuthenticated && id 
            ? renderStatusHandleButtons() 
            : (
              <Button
                type="submit"
                bg="green.400"
                color="white"
                _hover={{ filter: "brightness(130%)" }}
              >
                {sub ? "Atualizar" : "Enviar"}
              </Button>
            )}
        </Box>
      </FormControl>
    </form>
    <Modal {...modalConfig} isOpen={isOpen} />
    </>
  );
}
