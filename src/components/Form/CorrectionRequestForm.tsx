import { Button, Textarea } from "@chakra-ui/react";
import { FormEvent } from "react";
import { ISubscription } from "../../modules/subscription/types";
import { getUpdateStatusSubscriptionController } from "../../modules/subscription/useCases/updateStatusSubscription";

interface FormElements extends HTMLFormControlsCollection {
  message: HTMLInputElement;
}
interface FormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

interface ICorrectionRequestFormProps extends React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  subscription: ISubscription;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
}

export function CorrectionRequestForm({ subscription, onSubmit, children, ...rest }: ICorrectionRequestFormProps) {
  const handleOnSubmit = (e: FormEvent<FormElement>) => {
    e.preventDefault();
    getUpdateStatusSubscriptionController().handle({ 
      id: String(subscription.id),
      status: "pending",
      message: e.currentTarget.elements.message.value,
    });
    onSubmit && onSubmit(e);
  }

  return (
    <form 
      onSubmit={handleOnSubmit}
      {...rest}
    >
      <Textarea bg="white" name="message" type="" h="5rem" />
      <Button
        type="submit"
        bg="green.400"
        color="white"
        mt="20px"
        _hover={{ filter: "brightness(130%)" }}
      >
        Enviar
      </Button>
    </form>
  );
}