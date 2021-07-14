import { Box, Stack, Text } from '@chakra-ui/react';
import { PaginationItem } from './PaginationItem';

interface PaginationProps {
  totalCountOfRegister: number;
  registerPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

const siblingsCount = 1;

function generatePagesArray(from: number, to: number) {
  //  retorna um array com os numeros das posições que deseja
  // Ex: generatePagesArray(1,6) => [2,3,4,5,6]
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1;
    })
    .filter((page) => page > 0);
}

export function Pagination({
  totalCountOfRegister,
  currentPage = 1,
  onPageChange,
  registerPerPage = 10,
}: PaginationProps) {
  const lastPage = Math.floor(totalCountOfRegister / registerPerPage);

  const previuosPages =
    currentPage > 1 ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1) : [];

  const nextPage =
    currentPage < lastPage
      ? generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage))
      : [];

  return (
    <Stack direction={['column', 'row']} mt='8' justify='space-between' align='center' spacing='6'>
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>{totalCountOfRegister}</strong>
      </Box>
      <Stack direction='row' spacing='2'>
        {currentPage > 1 + siblingsCount && (
          <>
            <PaginationItem number={1} />
            {currentPage > 2 + siblingsCount && (
              <Text color='gray.300' width='8' align='center'>
                ...
              </Text>
            )}
          </>
        )}

        {previuosPages.length > 0 &&
          previuosPages.map((page) => {
            return <PaginationItem key={page} number={page} />;
          })}
        <PaginationItem number={currentPage} isCurrent />
        {nextPage.length > 0 &&
          nextPage.map((page) => {
            return <PaginationItem key={page} number={page} />;
          })}
        {currentPage + siblingsCount < lastPage && (
          <>
            {currentPage + 1 + siblingsCount < lastPage && (
              <Text color='gray.300' width='8' align='center'>
                ...
              </Text>
            )}
            <PaginationItem number={lastPage} />
          </>
        )}
      </Stack>
    </Stack>
  );
}
