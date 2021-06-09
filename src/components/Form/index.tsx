import { useState } from "react";
import { 
  FormControl, FormLabel, Stack, Radio, Grid, Box, Button
} from "@chakra-ui/react";


import { InputFile } from "./InputFile";
import { Input } from "./Input";
import { RadioGroup } from "./RadioGroup";


export function Form({ ...rest}): JSX.Element {
  const [pcd, setPcd] = useState('');
  
  return (
    <form style={{...rest, width: '80%', margin: '0 auto', padding: '10px'}}>
      <FormControl
        as="fieldset"
        display="flex"
        flexDirection="column"
        p="10px"
        border="1px"
        borderColor="#ccccccab"
        bg="white"
      >
        <FormLabel as="legend" textAlign="center" fontSize="1.5rem">
          Ficha de Inscrição
        </FormLabel>

        <Grid templateColumns="repeat(2, 1fr)" gap="10px">
          <Input label="Nome do Candidato:" />
          <Input label="Instituição de Ensino:" />

          <RadioGroup label="Período em que está matriculado:" labelBottom options={[
            { label: '1', value: '1' },
            { label: '2', value: '2' },
            { label: '3', value: '3' },
            { label: '4', value: '4' },
            { label: '5', value: '5' },
            { label: '6', value: '6' },
            { label: '7', value: '7' },
            { label: '8', value: '8' },
            { label: '9', value: '9' }
          ]} />

          <Input label="Endereço:" />
          <Input label="Telefone:" />
          <Input label="E-mail:" type="email" />

          <RadioGroup w="150px" label="PCD:" options={[
            { label: 'Sim', value: 'sim' },
            { label: 'Não', value: 'nao' },
          ]} />
        </Grid>
        
        <Box m="20px 0">
          <InputFile label="Documento de Identificação:" />
          <InputFile label="Declaração da instituição de ensino em que está matriculado (a):" />
          <InputFile label="Histórico Escolar:" />
          <InputFile label="Atestado de Antecedentes Criminais:" />
          <InputFile label="Certidão emitida pela Justiça Federal declarando prestação de serviço voluntário:" />
        </Box>

        <Button alignSelf="center" bg="green.400" color="white" _hover={{ bg: 'green.500' }}>
          Enviar
        </Button>
      </FormControl>

    </form>
  )
}