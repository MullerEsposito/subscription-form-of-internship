import { IResponse, IUpdateStatusSubscriptionDTO } from "./types";
import { UpdateStatusSubscriptionService } from "./UpdateStatusSubscriptionService";

export class UpdateStatusSubscriptionController {
  constructor(private updateStatusSubscriptionService: UpdateStatusSubscriptionService) {}

  async handle(data: IUpdateStatusSubscriptionDTO): Promise<IResponse> {
    try {
      this.updateStatusSubscriptionService.execute(data);
      
      return { status: "success", content: { id: data.id, status: data.status }};
    } catch (error: any) {
      return { status: "error", content: error.message }
    }
  }
}