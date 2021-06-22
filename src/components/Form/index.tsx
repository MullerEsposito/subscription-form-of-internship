import { 
  FormControl, FormLabel, Grid, Box, Button, useBreakpointValue, Input as ChakraInput
} from "@chakra-ui/react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import InputMask from "react-input-mask";


import { InputFile } from "./InputFile";
import { Input } from "./Input";
import { RadioGroup } from "./RadioGroup";
import { pcdOptions, periodOptions } from "../../data";
import { InputPhoto } from "./InputPhoto";

type Inputs = {
  candidateName: string;
  collegeName: string;
  address: string;
  email: string;
  phone: string;
  photo: string;
  periodo: string;
  pcd: string;
  identity: string;
  collegeRegistrationDeclaration: string;
  schoolRecords: string;
  criminalRecordDeclaration: string;
  voluntaryServiceDeclaration: string;
}
export function Form({ ...rest}): JSX.Element {
  const { register, handleSubmit, control } = useForm<Inputs>();
  const isShortScreen = useBreakpointValue({
    base: true,
    sm: false,
  });

  const onSubmit: SubmitHandler<Inputs> = data => {
    console.log(data);
  }

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)}
      style={{...rest, width: '100%', margin: '0 auto', padding: '10px'}}
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

        <InputPhoto {...register("photo")} />
        <Grid templateColumns={isShortScreen ? '1fr' : '1fr 1fr'} gap="10px">
          <Input label="Nome do Candidato:" {...register("candidateName")} />
          <Input label="Instituição de Ensino:" {...register("collegeName")} />
          <Input label="Endereço:" {...register("address")} />
          <Input label="E-mail:" type="email" {...register("email")} />
          <Controller 
            name="phone" 
            control={control}
            defaultValue={''}
            render={({ field: { onChange, value } }) => (
                <InputMask mask="(99) 99999-9999" value={value} onChange={onChange}>
                  {(inputProps: any) => (
                    <Input label="Telefone:" maxW="200px" {...inputProps} />
                  )}
                </InputMask>
              )}
          />

          <Controller 
            name="periodo"
            control={control}
            render={({ field }) => (
              <RadioGroup 
                label="Período em que está matriculado:" 
                options={periodOptions} 
                labelBottom 
                {...field}
              />
            )}
          />
          <Controller 
            name="pcd"
            control={control}
            render={({ field }) => (
              <RadioGroup 
                label="PCD:" 
                options={pcdOptions} 
                w="150px" 
                {...field} 
              />
            )}
          />
        </Grid>
        
        <Box m="20px 0">
          <InputFile label="Documento de Identificação:" {...register("identity")} />
          <InputFile 
            label="Declaração da instituição de ensino em que está matriculado (a):" 
            {...register("collegeRegistrationDeclaration")}
          />
          <InputFile 
            label="Histórico Escolar:" 
            {...register("schoolRecords")}
          />
          <InputFile 
            label="Atestado de Antecedentes Criminais:" 
            {...register("criminalRecordDeclaration")}
          />
          <InputFile 
            label="Certidão emitida pela Justiça Federal declarando prestação de serviço voluntário:" 
            {...register("voluntaryServiceDeclaration")}
          />
        </Box>

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

    </form>
  )
}