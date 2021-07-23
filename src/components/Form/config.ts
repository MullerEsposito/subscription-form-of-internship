import * as yup from "yup";

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
    photo: "",
    identity: "",
    collegeRegistrationDeclaration: "",
    schoolRecords: "",
    criminalRecordDeclaration: "",
    voluntaryServiceDeclaration: "",
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
    photo: string;
    identity: string;
    collegeRegistrationDeclaration: string;
    schoolRecords: string;
    criminalRecordDeclaration: string;
    voluntaryServiceDeclaration: string;
  }; 
}

export const schema = yup.object().shape({
  candidateName: yup.string().required("Nome é obrigatório!"),
  collegeName: yup.string().required("Nome da instituição é obrigatório!"),
  address: yup.string().required("Endereço é obrigatório!"),
  email: yup.string().required("E-mail é obrigatório"),
  cpf: yup.string().required("CPF é obrigatório!").length(14),
  phone: yup.string().required("Telefone é obrigatório!"),
  pcd: yup.string().required("Está opção é obrigatória!"),
  period: yup.string().required("Por favor, marque o período em que está matriculado!"),
  documents: yup.object().shape({
    photo: yup.string().required("A foto é obrigatória!"),
    identity: yup.string().required("O documento de identificação é obrigatório!"),
    collegeRegistrationDeclaration: yup.string().required("Esta declaração é obrigatória!"),
    schoolRecords: yup.string().required("Esta declaração é obrigatória!"),
    criminalRecordDeclaration: yup.string().required("Esta declaração é obrigatória!"),
    voluntaryServiceDeclaration: yup.string(),
  }),
})