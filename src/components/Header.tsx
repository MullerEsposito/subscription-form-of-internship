import { Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface HeaderProps {
  title: string;
};

export function Header({ title }: HeaderProps): JSX.Element {
  return (
    <Flex bg="green.800" h="140px" maxW="none" alignItems="center" p="10px 5px">
      <Link to="/">
        <Image src="assets/logo.png" w={['200px', '240px', '280px']} transition="width 1s" />
      </Link>
      <Text flex="1" textAlign="center" fontSize={['1rem','1.3rem','2.5rem']} transition="font-size 1s">
        {title}
      </Text>
    </Flex>
  );
}