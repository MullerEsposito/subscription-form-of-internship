import { GetSubscriptionController } from "./GetSubscriptionController";
import { GetSubscriptionService } from "./GetSubscriptionService";

export function getGetSubscriptionController() {
  const getSubscriptionService = new GetSubscriptionService();

  const getSubscriptionController = new GetSubscriptionController(getSubscriptionService);

  return getSubscriptionController;
}