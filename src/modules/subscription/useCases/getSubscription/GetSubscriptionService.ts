import { format, parseISO } from "date-fns";
import { api } from "../../../../services/api";
import { ISubscription } from "../../types";
import { IGetSubscriptionDTO } from "./types";

export class GetSubscriptionService { 
  async execute({ id, accesskey }: IGetSubscriptionDTO): Promise<ISubscription> {
    const { data: subscriptions } = await api.get(`/subscriptions/${id}`, {
      headers: { accesskey }
    }).then(res => res);

    if (!subscriptions) throw Error("Não foi possível obter a inscrição de id: " + id);

    subscriptions.birthdate = format(parseISO(subscriptions.birthdate), "yyyy-MM-dd");
    
    return subscriptions;
  }
}