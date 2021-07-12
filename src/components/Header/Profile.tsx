import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

export function Profile() {
  return (
    <Flex align='center'>
      <Box mr='4' textAlign='right'>
        <Text>Cleyton Santana</Text>
        <Text color='gray.300' fontSize='small'>
          csttn.dev@gmail.com
        </Text>
      </Box>

      <Avatar size='md' name='Cleyton Santana' src='https://github.com/csttn.png' />
    </Flex>
  );
}
