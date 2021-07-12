import { Stack } from '@chakra-ui/react';
import { RiGitMergeLine, RiInputMethodLine } from 'react-icons/ri';
import NavLink from './NavLink';
import { NavSection } from './NavSection';

export function SideBarNav() {
  return (
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
  );
}
