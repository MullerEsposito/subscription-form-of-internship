import { Flex, Image, Text } from "@chakra-ui/react";

interface HeaderProps {
  title: string;
};

export function Header({ title }: HeaderProps): JSX.Element {
  return (
    <Flex bg="green.800" h="173px" maxW="none" alignItems="center">
      <Image src="assets/logo.png" />
      <Text flex="1" textAlign="center" color="white" fontSize="2.8rem">
        {title}
      </Text>
    </Flex>
  );
}