import * as yup from "yup";
import * as cpf from "@fnando/cpf";

export const defaultValues = {
  candidateName: "",
  collegeName: "",
  address: "",
  email: "",
  cpf: "",
  pcd: "",
  phone: "",
  period: "",
  documents: {
    photo: undefined,
    identity: undefined,
    collegeRegistrationDeclaration: undefined,
    schoolRecords: undefined,
    criminalRecordDeclaration: undefined,
    voluntaryServiceDeclaration: undefined,
  },
}

export type SubscriptionInputs = {
  candidateName: string;
  collegeName: string;
  address: string;
  email: string;
  cpf: string;
  pcd: string;
  phone: string;
  period: string;
  documents: {
    photo: FileList;
    identity: FileList;
    collegeRegistrationDeclaration: FileList;
    schoolRecords: FileList;
    voluntaryServiceDeclaration: FileList;
  }; 
}

export const schema = yup.object().shape({
  candidateName: yup
    .string()
    .required("Nome é obrigatório!")
    .matches(/^[a-z\sáãóõôíúü]+$/i, "Apenas letras!"),
  collegeName: yup
    .string()
    .required("Nome da instituição é obrigatório!")
    .matches(/^[a-z\sáãóõôíú]+$/i, "Apenas letras!"),
  address: yup
    .string()
    .required("Endereço é obrigatório!")
    .matches(/^[a-z\s\d.,-áãóõôíú]+$/i, "Apenas caracteres alfanúmericos!"),
  email: yup
    .string()
    .required("E-mail é obrigatório")
    .email("Formato inválido!"),
  cpf: yup
    .string()
    .required("CPF é obrigatório!")
    .length(14, "Máximo de 14 caracteres!")
    .test("checkCPF", "CPF não é válido!", (value) => {
      if (!value) return true;
      return cpf?.isValid(value);
    }),
  phone: yup.string().required("Telefone é obrigatório!"),
  pcd: yup.string().required("Está opção é obrigatória!"),
  period: yup.string().required("Por favor, marque o período em que está matriculado!"),
  documents: yup.object().shape({
    photo: yup
      .mixed()
      .required("A foto é obrigatória!")
      .test("type", "Apenas arquivos JPG e PNG são aceitos!", (value) => 
        !value || (value && ["image/png", "image/jpeg"].includes(value[0].type))
      ),
    identity: yup
      .mixed()
      .required("O documento de identificação é obrigatório!")
      .test("type", "Apenas arquivos JPG, PNG e PDF são aceitos!", (value) => 
        !value || (value && ["application/pdf", "image/png", "image/jpeg"].includes(value[0].type))
      ),
    collegeRegistrationDeclaration: yup
      .mixed()
      .required("Esta declaração é obrigatória!")
      .test("type", "Apenas arquivos JPG, PNG e PDF são aceitos!", (value) => 
        !value || (value && ["application/pdf", "image/png", "image/jpeg"].includes(value[0].type))
      ),
    schoolRecords: yup
      .mixed()
      .required("Esta declaração é obrigatória!")
      .test("type", "Apenas arquivos JPG, PNG e PDF são aceitos!", (value) => 
        !value || (value && ["application/pdf", "image/png", "image/jpeg"].includes(value[0].type))
      ),
    voluntaryServiceDeclaration: yup
      .mixed()
      .test("type", "Apenas arquivos JPG, PNG e PDF são aceitos!", (value) => 
        !value || (value && ["application/pdf", "image/png", "image/jpeg"].includes(value[0].type))
      ),
  }),
})