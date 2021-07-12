import { Icon, Link, Text, LinkProps as ChakraLinkProps } from '@chakra-ui/react';
import { IconType } from 'react-icons/lib';

interface NavLinkProps extends ChakraLinkProps {
  text: string;
  IconProp: IconType;
}

export default function NavLink({ text, IconProp, ...rest }: NavLinkProps) {
  return (
    <Link display='flex' align='center' {...rest}>
      <Icon as={IconProp} fontSize='20' />
      <Text ml='4' fontWeight='medium'>
        {text}
      </Text>
    </Link>
  );
}
