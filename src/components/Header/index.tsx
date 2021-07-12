import { Flex } from '@chakra-ui/react';
import { Logo } from './Logo';
import { NotificationsNav } from './NotificationsNav';
import { Profile } from './Profile';
import { SerachBox } from './SerachBox';

export default function Header() {
  return (
    <Flex
      width='100%'
      as='header'
      maxW={1480}
      h='20'
      mx='auto'
      mt='4'
      px='6'
      align='center'
    >
      <Logo />
      <SerachBox />
      <Flex align='center' ml='auto'>
        <NotificationsNav />
        <Profile />
      </Flex>
    </Flex>
  );
}
