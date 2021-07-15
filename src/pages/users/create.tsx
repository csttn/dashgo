import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import * as yup from 'yup';
import { Input } from '../../components/Form/Input';
import { Header } from '../../components/Header';
import { SideBar } from '../../components/SideBar';
import { api } from '../../services/api';
import { queryCLient } from '../../services/queryClient';

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
  const router = useRouter();
  // salvando usuario com useMutation
  // A opçãp por escolher o useMutation e não uma função asyncrona comum é que o useMutation permite monitorar a requisição
  // Ex: isLoading, error, isSuccess e todos os atributos oferecidos pelo react-query
  const createUser = useMutation(
    async (user: createUserFormData) => {
      const response = await api.post('users', {
        user: { ...user, created_at: new Date() },
      });

      return response.data.user;
    },
    {
      onSuccess: () => {
        // deletando cahce salva para regarregar o novo ussuario
        //  é possivel deletar somenete um endereço de cahce especifico, basta passar ["users", page] e especificar qual cache deseja excluir

        queryCLient.invalidateQueries('users');
      },
    },
  );

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema),
  });
  const { errors } = formState;

  const handleCreteUser: SubmitHandler<createUserFormData> = async (values) => {
    await createUser.mutateAsync(values);

    router.push('/users');
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
