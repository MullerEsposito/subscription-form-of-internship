import { 
  FormControl, FormLabel, Grid, Box, Button, useBreakpointValue
} from "@chakra-ui/react";


import { InputFile } from "./InputFile";
import { Input } from "./Input";
import { RadioGroup } from "./RadioGroup";
import { pcdOptions, periodOptions } from "../../data";
import { InputPhoto } from "./InputPhoto";


export function Form({ ...rest}): JSX.Element {  
  const isShortScreen = useBreakpointValue({
    base: true,
    sm: false,
  })

  return (
    <form style={{...rest, width: '100%', margin: '0 auto', padding: '10px'}}>
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

          <InputPhoto />
        <Grid templateColumns={isShortScreen ? '1fr' : '1fr 1fr'} gap="10px">
          <Input label="Nome do Candidato:" />
          <Input label="Instituição de Ensino:" />
          <Input label="Endereço:" />
          <Input label="E-mail:" type="email" />
          <Input label="Telefone:" maxW="200px" type="tel" />

          <RadioGroup label="Período em que está matriculado:" options={periodOptions} labelBottom />
          <RadioGroup label="PCD:" options={pcdOptions} w="150px" />
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