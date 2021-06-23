import React, { useState } from "react";
import { 
  FormControl, FormLabel, Grid, Box, Button, useBreakpointValue, useDisclosure, Text,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody
} from "@chakra-ui/react";

import { InputFile } from "./InputFile";
import { Input } from "./Input";
import { RadioGroup } from "./RadioGroup";
import { InputPhoto } from "./InputPhoto";

import { pcdOptions, periodOptions } from "../../data"; 

export function Form({ ...rest}: React.CSSProperties): JSX.Element {
  const [photo, setPhoto] = useState<File | null >(null);
  const [candidateName, setCandidateName] =  useState('');
  const [collegeName, setCollegeName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [period, setPeriod] = useState('');
  const [pcd, setPcd] = useState('');
  const [identity, setIdentity] = useState<File | null >(null);
  const [collegeRegistrationDeclaration, setCollegeRegistrationDeclaration] = useState<File | null >(null);
  const [schoolRecords, setSchoolRecords] = useState<File | null >(null);
  const [criminalRecordDeclaration, setCriminalRecordDeclaration] = useState<File | null >(null);
  const [voluntaryServiceDeclaration, setVoluntaryServiceDeclaration] = useState<File | null >(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const isShortScreen = useBreakpointValue({
    base: true,
    sm: false,
  });

  const resetForm = (): void => {
    setCandidateName('');
    setCollegeName('');
    setAddress('');
    setEmail('');
    setPhone('');
    setPeriod('');
    setPcd('');
    setPhoto(null);
    setIdentity(null);
    setCollegeRegistrationDeclaration(null);
    setSchoolRecords(null);
    setCriminalRecordDeclaration(null);
    setVoluntaryServiceDeclaration(null);
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const data = {
      photo,
      candidateName,
      collegeName,
      address,
      email,
      phone,
      period,
      pcd,
      identity,
      collegeRegistrationDeclaration,
      schoolRecords,
      criminalRecordDeclaration,
      voluntaryServiceDeclaration,
    };

    console.log(data);
    resetForm();
    onOpen();
  }

  const renderRadiosGroup = (): JSX.Element => {
    return (
      <>
        <RadioGroup
          name="period"
          value={period}
          setValue={setPeriod}
          options={periodOptions} 
          labelBottom
          isRequired
        >
            Período em que está matriculado:
        </RadioGroup>
        <RadioGroup
          name="pcd"
          value={pcd}
          setValue={setPcd}
          options={pcdOptions} 
          isRequired
          w="150px" 
        >
          PCD:
        </RadioGroup>
      </>
    );
  }

  const renderInputsFile = (): JSX.Element => {
    return (
      <Box m="20px 0">
          <InputFile
            file={identity}
            setFile={setIdentity}
            isRequired
            msgValidation="O documento de identificação é obrigatório!"
          >
            Documento de Identificação:
          </InputFile>
          <InputFile
            file={collegeRegistrationDeclaration}
            setFile={setCollegeRegistrationDeclaration}
            isRequired
            msgValidation="Esta declaração é obrigatório!"
          >
            Declaração da instituição de ensino em que está matriculado (a):
          </InputFile>
          <InputFile
            file={schoolRecords}
            setFile={setSchoolRecords}
            isRequired
            msgValidation="O histórico escolar é obrigatório!"
          >
            Histórico Escolar:
          </InputFile>
          <InputFile
            file={criminalRecordDeclaration}
            setFile={setCriminalRecordDeclaration}
            isRequired
            msgValidation="Este atestado é obrigatório!"
          >
            Atestado de Antecedentes Criminais:
          </InputFile>
          <InputFile file={voluntaryServiceDeclaration} setFile={setVoluntaryServiceDeclaration}>
            Certidão emitida pela Justiça Federal declarando prestação de serviço voluntário:
          </InputFile>
        </Box>
    );
  }

  const renderInputs = (): JSX.Element => {
    return (
      <>
        <Input value={candidateName} setValue={setCandidateName} isRequired msgValidation="Nome é obrigatório!">
          Nome do Candidato:
        </Input>
        <Input value={collegeName} setValue={setCollegeName} isRequired msgValidation="Nome da instituição é obrigatório!">
          Instituição de Ensino:
        </Input>
        <Input value={address} setValue={setAddress} isRequired msgValidation="Endereço é obrigatório!">
          Endereço:
        </Input>
        <Input type="email" value={email} setValue={setEmail} isRequired msgValidation="E-mail é obrigatório">
          E-mail:
        </Input>
        <Input type="tel" maxW="200px" value={phone} setValue={setPhone} isRequired>
          Telefone:
        </Input>
      </>
    );
  }

  const renderModal = (): JSX.Element => {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="black">Sucesso!</ModalHeader>
          <ModalCloseButton color="black" />
          <ModalBody>
            <Text color="black">Inscrição realizada com sucesso!</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }

  return (
    <form 
      onSubmit={onSubmit}
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

        <InputPhoto photo={photo} setPhoto={setPhoto} isRequired msgValidation="A foto é obrigatória!" />
        <Grid templateColumns={isShortScreen ? '1fr' : '1fr 1fr'} gap="10px">
          { renderInputs() }
          
          { renderRadiosGroup() }
        </Grid>

        { renderInputsFile() }        

        <Button 
          type="submit"
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
