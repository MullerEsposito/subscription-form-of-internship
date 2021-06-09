import { useState } from "react";
import { 
  FormControl, FormLabel, Stack, RadioGroup, Radio, Grid, Box, Button
} from "@chakra-ui/react";


import { InputFile } from "./InputFile";
import { Input } from "./Input";


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
      >
        <FormLabel as="legend" textAlign="center" fontSize="1.5rem">
          Ficha de Inscrição
        </FormLabel>

        <Grid templateColumns="repeat(2, 1fr)" gap="10px">
          <Input label="Nome do Candidato:" />
          <Input label="Instituição de Ensino:" />
          <Input label="Período em que está matriculado:" type="number" min="1" max="9" />
          <Input label="Endereço:" />
          <Input label="Telefone:" />
          <Input label="E-mail:" type="email" />

          <RadioGroup onChange={setPcd} value={pcd}>
            <FormLabel>PCD:</FormLabel>
            <Stack direction="row">
              <Radio value="1">Sim</Radio>
              <Radio value="2">Não</Radio>
            </Stack>
          </RadioGroup>
        </Grid>
        
        <Box mt="10px">
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