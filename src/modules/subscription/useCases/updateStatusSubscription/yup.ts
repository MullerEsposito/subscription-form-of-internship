import * as yup from "yup";
import * as cpf from "@fnando/cpf";
import { differenceInCalendarYears } from "date-fns"

const _2MB = 2048000;

export const updateSubscriptionSchema = yup.object().shape({
  candidateName: yup
    .string()
    .required("Nome é obrigatório!")
    .matches(/^[a-z\sáãóõôíúüé]+$/i, "Apenas letras!"),
  collegeName: yup
    .string()
    .required("Nome da instituição é obrigatório!")
    .matches(/^[a-z\sáãóõôíúé]+$/i, "Apenas letras!"),
  address: yup
    .string()
    .required("Endereço é obrigatório!")
    .matches(/^[a-z\s\d.,-áãóõôíúé]+$/i, "Apenas caracteres alfanúmericos!"),
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
    .mixed()
    .required("Data de nascimento é obrigatório!")
    .test("rangeDate", "Idade mínima inválida!", (value) => {
      if (!value) return true;
      const years = Math.abs(differenceInCalendarYears(new Date(value), new Date()));
      return years < 17 ? false : true;
    }),
  course: yup
    .string()
    .required("Escolha um curso!"),
  color: yup
    .string()
    .required("Escolha uma cor!"),
  phone: yup.string().required("Telefone é obrigatório!"),
  pcd: yup.string().required("Está opção é obrigatória!"),
  period: yup.string().required("Por favor, marque o período em que está matriculado!"),
  privacyTerm: yup.boolean().oneOf([true], "Você precisa aceitar os termos de privacidade pra realizar a inscrição!"),
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