import { Icon, Link as ChakraLink, Text, LinkProps as ChakraLinkProps } from '@chakra-ui/react';
import { IconType } from 'react-icons/lib';

import { ActiveLink } from '../ActiveLink';
interface NavLinkProps extends ChakraLinkProps {
  text: string;
  IconProp: IconType;
  href: string;
}

export default function NavLink({ text, IconProp, href, ...rest }: NavLinkProps) {
  return (
    <ActiveLink href={href} passHref>
      <ChakraLink display='flex' align='center' {...rest}>
        <Icon as={IconProp} fontSize='20' />
        <Text ml='4' fontWeight='medium'>
          {text}
        </Text>
      </ChakraLink>
    </ActiveLink>
  );
}
