import { Box, Button, Grid, Link as ChakraLink, Text, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import InputMask from "react-input-mask";

import { defaultValues } from "../../components/Form/config"
import { Input } from "../../components/Form/Input";
import { InputCheckBox } from "../../components/Form/InputCheckBox";
import { InputFile } from "../../components/Form/InputFile";
import { InputPhoto } from "../../components/Form/InputPhoto";
import { RadioGroup } from "../../components/Form/RadioGroup";
import { Select } from "../../components/Form/Select";
import { IModal, Modal } from "../../components/Modal";
import { Form } from "../../components/Form";
import { colorOptions, courseOptions, pcdOptions, periodOptions } from "../../data";
import { getCreateSubscriptionController } from "../../modules/subscription/useCases/createSubscription";
import { ISubscription } from "../../modules/subscription/types";
import { createSubscriptionSchema } from "../../modules/subscription/useCases/createSubscription/yup";

export function CreateSubscription() {
  const [modalConfig, setModalConfig] = useState<IModal>({} as IModal);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<ISubscription, "status"|"course"|"color"> & { status: string; course: string; color: string; }>({
    resolver: yupResolver(createSubscriptionSchema),
    defaultValues,
  });
  const isShortScreen = useBreakpointValue({
    base: true,
    sm: false,
  });

  const renderSubscriptionDoneMessage = (id: string, accesskey: string): JSX.Element => (
    <>
      <Text mb="10px">
        Vc receberá um e-mail com os seguintes dados para que possa acompanhar o status de sua inscrição:
      </Text>
      <Text>
        Número de inscrição:
        {' '}
        <strong data-testid="inscription.id">{id}</strong>
        .
      </Text>
      <Text>
        Chave de acesso:
        {' '}
        <strong data-testid="inscription.accesskey">{accesskey}</strong>
        .
      </Text>
    </>
  );

  const onSubmit: SubmitHandler<ISubscription> = async (data) => {
    const response = await getCreateSubscriptionController().handle(data);
    
    if (response.status === "success") {
      setModalConfig({
        type: response.status,
        message: {
          header: "Inscrição realizada com sucesso!",
          body: renderSubscriptionDoneMessage(response.content.id, response.content.accesskey),
        },
        onClose: () => { history.push("/subscription/query"); },
      });
    } else {
      setModalConfig({
        type: response.status,
        message: {
          header: "Não foi possível realizar a inscrição!",
          body: response.content,
        },
        onClose,
      })
    }

    reset({ ...defaultValues });
    onOpen();
  };

  const renderModalLink = ({ type, message, label }: IModal & { label: string }) => {
    return (
      <> <ChakraLink onClick={ () => {
        setModalConfig({
          type,
          message,
          onClose,
        });
        onOpen();
      }}>{ label }</ChakraLink> </>
    )
  }

  const renderInputs = (): JSX.Element => (
    <>
      <Input 
        id="form.name"
        {...register("candidateName")} 
        error={errors.candidateName}
      >
        Nome do Candidato:
      </Input>
      <Input 
        id="form.college"
        {...register("collegeName")} 
        error={errors.collegeName} 
      >
        Instituição de Ensino:
      </Input>
      <Input 
        id="form.address"
        {...register("address")} 
        error={errors.address}
      >
        Endereço:
      </Input>
      <Input
        id="form.cpf"
        {...register("cpf")}
        error={errors.cpf}
        as={InputMask}
        mask="999.999.999-99"
      >
        CPF:
      </Input>
      <Input 
        id="form.email"
        {...register("email")} 
        error={errors.email} 
        type="email"
      >
        E-mail:
      </Input>
      <Input
        id="form.phone"
        {...register("phone")}
        error={errors.phone}
        as={InputMask}
        mask="(99) 99999-9999"
      >
        Telefone:
      </Input>
      <Input
        id="form.birthdate"
        {...register("birthdate")}
        error={errors.birthdate}
        type="date"
        max="2021-01-01"
        min="1950-01-01"
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
            id="form.period"
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
            id="form.pcd"
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
        id="form.identity"
        name="documents.identity"
        control={control}
        error={errors.documents?.identity}
        accept="application/pdf"
      >
        Documento de Identificação:
      </InputFile>
      <InputFile
        id="form.declaration"
        name="documents.collegeRegistrationDeclaration"
        control={control}
        error={errors.documents?.collegeRegistrationDeclaration}
        accept="application/pdf"
      >
        Declaração da instituição de ensino em que está matriculado (a):
      </InputFile>
      <InputFile
        id="form.records"
        name="documents.schoolRecords"
        control={control}
        error={errors.documents?.schoolRecords}
        accept="application/pdf"
      >
        Histórico Escolar:
      </InputFile>
    </Box>
  );

  return (
    <>
    <Form
      onSubmit={handleSubmit(onSubmit)}
      label="Ficha de Inscrição">
      <InputPhoto
        id="form.photo"
        name="documents.photo"
        control={control}
        error={errors.documents?.photo}
        accept="image/jpeg"
      />

        <Grid templateColumns={isShortScreen ? "1fr" : "1fr 1fr"} gap="10px">
          {renderInputs()}

          <Select
            id="form.course"
            {...register("course")}
            error={errors.color}
            options={courseOptions} 
            placeholder="Selecione seu curso"
          >
            Curso:
          </Select>

          <Select 
            id="form.color"
            {...register("color")}
            error={errors.color}
            options={colorOptions} 
            placeholder="Selecione a cor"
          >
            Cor:
          </Select>

          {renderRadiosGroup()}
        </Grid>

          {renderInputsFile()}
          <InputCheckBox
            {...register("privacyTerm")}
            error={errors.privacyTerm}
          >
            Aceito os { 
              renderModalLink({
                  label: "termos de privacidade",
                  type: "info", 
                  message: { 
                    header: "Termo de Privacidade",
                    body: "Conteúdo do Termo de Privacidade"
                  }  
              })
            } para a participação deste processo seletivo.      
          </InputCheckBox>
          <Box alignSelf="center" mt="10px">
            <Button
              type="submit"
              bg="green.400"
              color="white"
              _hover={{ filter: "brightness(130%)" }}
            >
              Enviar
            </Button>
        </Box>
    </Form>
    <Modal {...modalConfig} isOpen={isOpen} />
    </>
  );
}