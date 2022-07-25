import { 
  Modal as ChakraModal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody 
} from "@chakra-ui/react";

export interface IModal {
  isOpen?: boolean;
  type: "success" | "error" | "info";
  message: {
    header: string;
    body: React.ReactNode;
  },
  onClose?: () => void;
}

const color = {
  bg: {
    success: "white",
    error: "red.800",
    info: "blue.400"
  },
  text: {
    success: "black",
    error: "white",
    info: "black",
  }
}

export function Modal({ isOpen=false, onClose=()=>{}, type, message }: IModal): JSX.Element {
  return (
    <ChakraModal
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent
        bg={color.bg[type]}
        color={color.text[type]}
      >
        <ModalHeader>{ message?.header }</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          { message?.body }
        </ModalBody>
      </ModalContent>
    </ChakraModal>
  )
}