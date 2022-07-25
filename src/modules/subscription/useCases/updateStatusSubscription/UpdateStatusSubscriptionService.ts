import { api } from "../../../../services/api";
import { IUpdateStatusSubscriptionDTO } from "./types";

export class UpdateStatusSubscriptionService {
  async execute({ id, status, message }: IUpdateStatusSubscriptionDTO): Promise<void> {
    const storage = localStorage.getItem("@SSJMCL2021");
    
    if (!storage) throw Error("Usuário não está logado!")
    
    const { token } = JSON.parse(storage);
    
    await api.patch(`/subscriptions/${id}/status`, {
      status, 
      message,
    }, { headers: { Authorization: `Bearer ${token}`}});    
  };
};