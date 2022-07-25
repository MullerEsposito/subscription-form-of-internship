import { UpdateStatusSubscriptionController } from "./UpdateStatusSubscriptionController";
import { UpdateStatusSubscriptionService } from "./UpdateStatusSubscriptionService";

export function getUpdateStatusSubscriptionController() {
  const updateStatusSubscriptionService = new UpdateStatusSubscriptionService();

  const updateStatusSubscriptionController = new UpdateStatusSubscriptionController(updateStatusSubscriptionService);

  return updateStatusSubscriptionController;
}