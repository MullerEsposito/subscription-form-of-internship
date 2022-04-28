import { ISubscription } from "../../types";

export type IResponse = {
  status: "success";
  content: ISubscription;
} |
{
  status: "error";
  content: string;
}

export interface IGetSubscriptionDTO {
  id: string;
  accesskey: string;
}