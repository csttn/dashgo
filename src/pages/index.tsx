import { Button, Flex, Stack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Input } from '../components/Form/Input';

type SignInFormData = {
  email: string;
  password: string;
};

//  definindo Schem acom yup
const signInformSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória'),
});

export default function SignIn() {
  //  Buscando informações do react hook form
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInformSchema),
  });
  //  erros na validação do react hook form
  const { errors } = formState;

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log(values);
  };

  return (
    <Flex w='100vw' h='100vh' align='center' justify='center'>
      <Flex
        as='form'
        width='100%'
        maxWidth={360}
        bg='gray.800'
        p='8'
        borderRadius='8'
        flexDir='column'
        //  chamdno a função do react hook form no parametro da função handleSubmit do react hook form
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing='4'>
          <Input
            name='email'
            type='email'
            label='Email'
            //  estabelecendo padrão de uncontrolled compoenets para passar as informções do inout ao React hook form
            {...register('email')}
            //  passando campo de validação de erros ao componnete de InputGenerico
            error={errors.email}
          />
          <Input
            name='password'
            type='password'
            label='Senha'
            error={errors.password}
            {...register('password')}
          />
        </Stack>
        <Button
          type='submit'
          mt='6'
          colorScheme='pink'
          size='lg'
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}
