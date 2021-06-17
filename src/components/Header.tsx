import { Flex, Image, Text } from "@chakra-ui/react";

interface HeaderProps {
  title: string;
};

export function Header({ title }: HeaderProps): JSX.Element {
  return (
    <Flex bg="green.800" h="173px" maxW="none" alignItems="center">
      <Image src="assets/logo.png" w={['200px', '240px', '280px']} transition="width 1s" />
      <Text flex="1" textAlign="center" fontSize={['1rem','1.3rem','2.5rem']} transition="font-size 1s">
        {title}
      </Text>
    </Flex>
  );
}