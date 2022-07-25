import { strip } from "@fnando/cpf";
import { api } from "../../../../services/api";
import { ISubscription } from "../../types";

interface ICreateSubscriptionResponse {
  id: string;
  accesskey: string;
}

export class CreateSubscriptionService {
  async execute(data: ISubscription): Promise<ICreateSubscriptionResponse> {
    data.cpf = strip(data.cpf);
    
    const fd = this.createFormData(data);
    
    const { id, accesskey } = await api.post<ICreateSubscriptionResponse>("/subscriptions", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then(({ data }) => data)
    .catch(({ response }) => { throw new Error(response?.data.error ?? "Servidor fora do ar!") });
    
    return { id, accesskey };    
  };
  
  private createFormData(data: any): FormData {    
    const fd = new FormData();

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        if (typeof data[key] === "object" && key !== "birthdate") {
          const documents = data[key];
          for (const keyNest in documents) {
            if (documents[keyNest]) {
              fd.append("documents[]", documents[keyNest][0], keyNest);
            }
          }
          continue;
        }
        fd.append(key, data[key]);
      }
    };
    
    return fd;
  }
}