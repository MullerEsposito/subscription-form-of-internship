import { CreateSubscriptionController } from "./CreateSubscriptionController";
import { CreateSubscriptionService } from "./CreateSubscriptionService";

export function getCreateSubscriptionController() {
  const createSubscriptionService = new CreateSubscriptionService();

  const createSubscriptionController = new CreateSubscriptionController(createSubscriptionService);

  return createSubscriptionController;
}