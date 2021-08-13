import * as yup from "yup";
import * as cpf from "@fnando/cpf";

const _2MB = 2048000;

export const defaultValues = {
  candidateName: "",
  collegeName: "",
  address: "",
  email: "",
  cpf: "",
  pcd: "",
  phone: "",
  period: "",
  birthdate: "",
  color: "",
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
  birthdate: string;
  color: string;
  documents: {
    photo?: FileList;
    identity?: FileList;
    collegeRegistrationDeclaration?: FileList;
    schoolRecords?: FileList;
    voluntaryServiceDeclaration?: FileList;
  }; 
}

export type ISubscription = {
  id: number;
  candidateName: string;
  collegeName: string;
  address: string;
  email: string;
  cpf: string;
  pcd: string;
  phone: string;
  period: string;
  birthdate: string;
  status: "accepted" | "rejected" | "pending";
  accesskey: string;
  color: "white" | "black" | "brown" | "yellow" | "indian";
  documents: {
    photo?: FileList;
    identity?: FileList;
    collegeRegistrationDeclaration?: FileList;
    schoolRecords?: FileList;
    voluntaryServiceDeclaration?: FileList;
  }; 
}

const commonShape = {
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
    .max(14, `Máximo de 14 caracteres!`)
    .test("checkCPF", "CPF não é válido!", (value) => {
      if (!value) return true;
      return cpf?.isValid(value);
    }),
  birthdate: yup
    .string()
    .required("Data de nascimento é obrigatório!")
    .max(104, `Máximo de 10 caracteres!`),
    // .test("checkCPF", "CPF não é válido!", (value) => {
    //   if (!value) return true;
    //   return cpf?.isValid(value);
    // }),
  color: yup
    .string()
    .required("Escolha uma cor!"),
  phone: yup.string().required("Telefone é obrigatório!"),
  pcd: yup.string().required("Está opção é obrigatória!"),
  period: yup.string().required("Por favor, marque o período em que está matriculado!"),
}

export const schemaUpdate = yup.object().shape({
  ...commonShape,
  identity: yup
    .mixed()
    .test("type", "Carregue um arquivo no formato PDF!", (value) => 
      !value || (value && value[0].type === "application/pdf")
    )
    .test("fileSize", "O arquivo deve ter menos que 2MB.", (value) => 
      !value || value[0].size <= _2MB
    ),
  collegeRegistrationDeclaration: yup
    .mixed()
    .test("type", "Carregue um arquivo no formato PDF!", (value) => 
      !value || (value && value[0].type === "application/pdf")
    )
    .test("fileSize", "O arquivo deve ter menos que 2MB.", (value) => 
      !value || value[0].size <= _2MB
    ),
  schoolRecords: yup
    .mixed()
    .test("type", "Carregue um arquivo no formato PDF!", (value) => 
      !value || (value && value[0].type === "application/pdf")
    )
    .test("fileSize", "O arquivo deve ter menos que 2MB.", (value) => 
      !value || value[0].size <= _2MB
    ),
  voluntaryServiceDeclaration: yup
    .mixed()
    .test("type", "Carregue um arquivo no formato PDF!", (value) => 
      !value || (value && value[0].type === "application/pdf")
    )
    .test("fileSize", "O arquivo deve ter menos que 2MB.", (value) => 
      !value || value[0].size <= _2MB
    ),
});


export const schema = yup.object().shape({
  ...commonShape,
  documents: yup.object().shape({
    photo: yup
      .mixed()
      .required("A foto é obrigatória!")
      .test("type", "Carregue uma foto no formato JPG!", (value) => 
        !value || (value && value[0].type === "image/jpeg")
      )
      .test("fileSize", "O arquivo deve ter menos que 2MB.", (value) =>
        !value || value[0].size <= _2MB
      ),
    identity: yup
      .mixed()
      .required("O documento de identificação é obrigatório!")
      .test("type", "Carregue um arquivo no formato PDF!", (value) => 
        !value || (value && value[0].type === "application/pdf")
      )
      .test("fileSize", "O arquivo deve ter menos que 2MB.", (value) => 
        !value || value[0].size <= _2MB
      ),
    collegeRegistrationDeclaration: yup
      .mixed()
      .required("Esta declaração é obrigatória!")
      .test("type", "Carregue um arquivo no formato PDF!", (value) => 
        !value || (value && value[0].type === "application/pdf")
      )
      .test("fileSize", "O arquivo deve ter menos que 2MB.", (value) => 
        !value || value[0].size <= _2MB
      ),
    schoolRecords: yup
      .mixed()
      .required("Esta declaração é obrigatória!")
      .test("type", "Carregue um arquivo no formato PDF!", (value) => 
        !value || (value && value[0].type === "application/pdf")
      )
      .test("fileSize", "O arquivo deve ter menos que 2MB.", (value) =>
        !value || value[0].size <= _2MB
      ),
    voluntaryServiceDeclaration: yup
      .mixed()
      .test("type", "Carregue um arquivo no formato PDF!", (value) => 
        !value || (value && value[0].type === "application/pdf")
      )
      .test("fileSize", "O arquivo deve ter menos que 2MB.", (value) =>
        !value || value[0].size <= _2MB
      ),
  }),
})