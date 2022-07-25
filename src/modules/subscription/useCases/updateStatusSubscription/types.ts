type IStatus = "accepted" | "rejected" | "pending";

export interface IUpdateStatusSubscriptionDTO {
  id: string;
  status: IStatus; 
  message?: string;
}

export type IResponse = {
  status: "success";
  content: { id: string; status: IStatus };
} | {
  status: "error";
  content: string;
}