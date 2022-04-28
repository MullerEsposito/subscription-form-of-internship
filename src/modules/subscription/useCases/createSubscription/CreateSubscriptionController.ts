import { CreateSubscriptionService } from "./CreateSubscriptionService";
import { ISubscription } from "../../types";

type IResponse = {
  status: "success";
  content: { id: string, accesskey: string };
} | {
  status: "error";
  content: string;
}

export class CreateSubscriptionController { 
  constructor(private createSubscriptionService: CreateSubscriptionService){}
  
  async handle(data: ISubscription): Promise<IResponse> {
    try {
      const response = await this.createSubscriptionService.execute(data);

      return { status: "success", content: response };
    } catch (error: any) {
      return { status: "error", content: error.message };
    }
  }
}