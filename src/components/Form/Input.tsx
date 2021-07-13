import {
  Input as ChakraInput,
  FormControl,
  FormLabel,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react';
import { forwardRef, ForwardRefRenderFunction } from 'react';

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
}
const GenericInput: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, ...rest },
  ref,
) => {
  return (
    <FormControl>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChakraInput
        name={name}
        id={name}
        focusBorderColor='pink.500'
        bgColor='gray.900'
        variant='filled'
        _hover={{
          bgCOlor: 'gray.900',
        }}
        size='lg'
        ref={ref}
        {...rest}
      />
    </FormControl>
  );
};

export const Input = forwardRef(GenericInput);
