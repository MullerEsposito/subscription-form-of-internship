import { Suspense, useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Box, Button, Flex, Grid, Icon, Image, Link as ChakraLink, useBreakpointValue, useDisclosure, VStack } from "@chakra-ui/react";
import { strip } from "@fnando/cpf";
import InputMask from "react-input-mask";
import Loader from "react-loader-spinner";

import { SubscriptionsContext } from "../../context/SubscriptionsContext";
import { Form } from "../../components/Form";

import imgRejected from "../../assets/rejected.png";
import imgAccepted from "../../assets/accepted.png"
import imgPending from "../../assets/pending.png"
import { ISubscription } from "../../modules/subscription/types";
import { Input } from "../../components/Form/Input";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Select } from "../../components/Form/Select";
import { colorOptions, courseOptions, pcdOptions, periodOptions } from "../../data";
import { RadioGroup } from "../../components/Form/RadioGroup";
import { BiLinkExternal } from "react-icons/bi";
import { IModal, Modal } from "../../components/Modal";
import { getUpdateStatusSubscriptionController } from "../../modules/subscription/useCases/updateStatusSubscription";
import { CorrectionRequestForm } from "../../components/Form/CorrectionRequestForm";
import { getGetSubscriptionController } from "../../modules/subscription/useCases/getSubscription";
import { updateSubscriptionSchema } from "../../modules/subscription/useCases/updateStatusSubscription/yup";

export function UpdateSubscription() {
  const [subscription, setSubscription] = useState<ISubscription>({} as ISubscription);
  const { id } = useParams<{ id: string }>();
  const { accesskey } = useContext(SubscriptionsContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalConfig, setModalConfig] = useState<IModal>({} as IModal);
  const history = useHistory();
  const isShortScreen = useBreakpointValue({
    base: true,
    sm: false,
  });
  const statusImg = {
    accepted: imgAccepted,
    rejected: imgRejected,
    pending: imgPending,
  };
  const {
    register,
    control,
    formState: { errors },
  } = useForm<ISubscription>({
    resolver: yupResolver(updateSubscriptionSchema),
  });

  useEffect(() => {
    (async function() {
      const response = await getGetSubscriptionController().handle({ id, accesskey });

      if (response.status === "error") return history.push("/subscription/query");
      
      setSubscription(response.content as ISubscription);
    })();
  }, [accesskey, history]);

  const renderLoader = (): JSX.Element => (
    <Flex flex={1} justifyContent="center" alignItems="center">
      <Loader type="TailSpin" height={100} width={100} />
    </Flex>
  )

  const renderInputs = (): JSX.Element => (
    <>
      <Input {...register("candidateName")} error={errors.candidateName} isDisabled>
        Nome do Candidato:
      </Input>
      <Input {...register("collegeName")} error={errors.collegeName} isDisabled>
        Instituição de Ensino:
      </Input>
      <Input {...register("address")} error={errors.address} isDisabled>
        Endereço:
      </Input>
      <Input
        {...register("cpf")}
        error={errors.cpf}
        as={InputMask}
        mask="999.999.999-99"
        isDisabled
      >
        CPF:
      </Input>
      <Input {...register("email")} error={errors.email} type="email" isDisabled>
        E-mail:
      </Input>
      <Input
        {...register("phone")}
        error={errors.phone}
        as={InputMask}
        mask="(99) 99999-9999"
        isDisabled
      >
        Telefone:
      </Input>
      <Input
        {...register("birthdate")}
        error={errors.birthdate}
        type="date"
        max="2021-01-01"
        min="1950-01-01"
        isDisabled
        maxW="180px"
      >
        Data de Nascimento:
      </Input>
    </>
  );

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

  const renderLinksFile = (): JSX.Element => (
    <VStack m="20px 0">
      <ChakraLink href={`${process.env.REACT_APP_BASE_URL}/files/${strip(subscription.cpf)}/identity.pdf`} isExternal>
        Documento de Identificação <Icon as={BiLinkExternal} mx="2px" />
      </ChakraLink>
      <ChakraLink href={`${process.env.REACT_APP_BASE_URL}/files/${strip(subscription.cpf)}/collegeRegistrationDeclaration.pdf`} isExternal>
        Declaração da instituição de ensino em que está matriculado <Icon as={BiLinkExternal} mx="2px" />
      </ChakraLink>
      <ChakraLink href={`${process.env.REACT_APP_BASE_URL}/files/${strip(subscription.cpf)}/schoolRecords.pdf`} isExternal>
        Histórico Escolar <Icon as={BiLinkExternal} mx="2px" />
      </ChakraLink>
    </VStack>
  );

  const renderStatusHandleButtons = (): JSX.Element => {
    return (
      <>
        <Button
          bg="green.400"
          color="white"
          _hover={{ filter: "brightness(130%)" }}
          onClick={async () => await getUpdateStatusSubscriptionController().handle({ 
            id: String(subscription.id), 
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
              message: {
                header: "Informe as correções necessárias!",
                body: <CorrectionRequestForm onSubmit={onClose} subscription={subscription} />,
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
          onClick={() => getUpdateStatusSubscriptionController().handle({ 
            id: String(subscription.id),
            status: "rejected",
            message: "Sua inscrição não foi aceita!",
          })}
        >
          Rejeitar
        </Button>
      </>
    )
  }

  return (
    <Suspense fallback={renderLoader}>
      <Form label="Ficha de Inscrição">
        <Flex justifyContent="center" position="relative">
          <Image
            src={`${process.env.REACT_APP_BASE_URL}/files/${strip(subscription.cpf)}/photo.jpg`} 
            w="100px" 
            maxH="150px" 
            alignSelf="center"
            mb="20px"
            border="1px"
            borderColor="#ccccccab"
          />
          <Image
            src={statusImg[subscription.status]}
            boxSize={["80px","100px"]}
            objectFit="scale-down"
            position="absolute"
            right={30} 
          />
        </Flex>

        <Grid templateColumns={isShortScreen ? "1fr" : "1fr 1fr"} gap="10px">
          {renderInputs()}

          <Select
            {...register("course")}
            error={errors.color}
            options={courseOptions} 
            isDisabled
            placeholder="Selecione seu curso"
          >
            Curso:
          </Select>

          <Select 
            {...register("color")}
            error={errors.color}
            options={colorOptions} 
            isDisabled
            placeholder="Selecione a cor"
          >
            Cor:
          </Select>

          {renderRadiosGroup()}
        </Grid>
        
        {renderLinksFile()}
        <Box alignSelf="center" mt="10px">
          { renderStatusHandleButtons() }            
        </Box>
      </Form>
      <Modal {...modalConfig} isOpen={isOpen} />
    </Suspense>
  );
}