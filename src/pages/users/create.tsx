import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { Input } from '../../components/Form/Input';
import Header from '../../components/Header';
import SideBar from '../../components/SideBar';

import { yupResolver } from '@hookform/resolvers/yup';

import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

type createUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória').min(6, 'No mínimo 6 caracteres'),
  //passando regra de valição para senhas iguais no YUP
  password_confirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'As senhas precisam ser iguais'),
});

export default function CreateUser() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema),
  });
  const { errors } = formState;

  const handleCreteUser: SubmitHandler<createUserFormData> = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log(values);
  };

  return (
    <Box>
      <Header />
      <Flex width='100%' my='6' maxWidth={1480} mx='auto' px='6'>
        <SideBar />

        <Box
          flex='1'
          borderRadius={8}
          bg='gray.800'
          p={['6', '8']}
          as='form'
          onSubmit={handleSubmit(handleCreteUser)}
        >
          <Heading size='lg' fontWeight='normal'>
            Criar usuário
          </Heading>

          <Divider my={['4', '6']} borderColor='gray.700' />

          <VStack spacing={['6', '8']}>
            <SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%'>
              <Input name='name' label='Nome completo' {...register('name')} error={errors.name} />
              <Input
                name='email'
                label='E-Mail'
                type='email'
                {...register('email')}
                error={errors.email}
              />
            </SimpleGrid>
            <SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%'>
              <Input
                name='password'
                label='Senha'
                type='password'
                {...register('password')}
                error={errors.password}
              />
              <Input
                name='password_confirmation'
                label='Confirmar senha'
                type='password'
                {...register('password_confirmation')}
                error={errors.password_confirmation}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt={['6', '8']} justify='flex-end'>
            <HStack spacing='4'>
              <Link href='/users' passHref>
                <Button colorScheme='whiteAlpha'>Cancelar</Button>
              </Link>
              <Button colorScheme='pink' type='submit' isLoading={formState.isSubmitting}>
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
