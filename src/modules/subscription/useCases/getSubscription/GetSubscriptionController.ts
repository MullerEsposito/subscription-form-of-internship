import { GetSubscriptionService } from "./GetSubscriptionService";
import { IGetSubscriptionDTO, IResponse } from "./types";

export class GetSubscriptionController { 
  constructor(private getSubscriptionService: GetSubscriptionService){}
  
  async handle(data: IGetSubscriptionDTO): Promise<IResponse> {
    try {
      const subscriptions = await this.getSubscriptionService.execute(data);

      return { status: "success", content: subscriptions };
    } catch (error: any) {
      return { status: "error", content: error.message }
    }
  }
}