import { Box, Stack, Text, Link, Icon } from '@chakra-ui/react';
import {
  RiContactsLine,
  RiDashboardLine,
  RiGitMergeLine,
  RiInputMethodLine,
} from 'react-icons/ri';
import NavLink from './NavLink';
import { NavSection } from './NavSection';

export default function SideBar() {
  return (
    <Box as='aside' w='64' mr='8'>
      <Stack spacing='12' align='flex-start'>
        <NavSection title='GERAL'>
          <NavLink text='Dashboard' IconProp={RiInputMethodLine} />
          <NavLink text='Usuários' IconProp={RiGitMergeLine} />
        </NavSection>
        <NavSection title='AUTOMAÇÃO'>
          <NavLink text='Formulários' IconProp={RiInputMethodLine} />
          <NavLink text='Automação' IconProp={RiGitMergeLine} />
        </NavSection>
      </Stack>
    </Box>
  );
}
