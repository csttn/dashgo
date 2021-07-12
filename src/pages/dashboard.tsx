import dynamic from 'next/dynamic';

import { Box, Flex, SimpleGrid, Text, theme } from '@chakra-ui/react';
import Header from '../components/Header';
import SideBar from '../components/SideBar';

//  importando lib de graficos somenete quando o react chegar ao navegador
//  evitando erro de processamento do next na camada do node
const Chart = dynamic(() => import('react-apexcharts'), {
  //  Desligando o SSR na importação desse componente
  ssr: false,
});

const options = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: { enabled: false },
    foreColor: theme.colors.gray[500],
  },
  grid: { show: false },

  //    propriedade de estilização que mostra as informações quando passa o mouse por cima
  tooltip: {
    enabled: false,
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      color: theme.colors.gray[600],
    },
    categories: [
      '2021-07-12T00:00:00.000Z',
      '2021-07-13T00:00:00.000Z',
      '2021-07-14T00:00:00.000Z',
      '2021-07-15T00:00:00.000Z',
      '2021-07-16T00:00:00.000Z',
      '2021-07-17T00:00:00.000Z',
      '2021-07-18T00:00:00.000Z',
    ],
  },

  fill: {
    opacity: 0.3,

    type: 'gradient',
    gradient: { shade: 'dark', opacityFrom: 0.7, opacityTo: 0.3 },
  },
};

const series = [{ name: 'series 1', data: [31, 120, 10, 28, 51, 18, 109] }];

export default function Dashboard() {
  return (
    <Flex direction='column' h='100vh'>
      <Header />

      <Flex width='100%' my='6' maxWidth={1480} mx='auto' px='6'>
        <SideBar />

        <SimpleGrid flex='1' gap='4' minChildWidth='320px' align='flex-start'>
          <Box p='8' bg='gray.800' borderRadius={8}>
            <Text fontSize='lg' mb='4'>
              Inscritos da semana
            </Text>

            <Chart type='area' height={160} options={options} series={series} />
          </Box>
          <Box p='8' bg='gray.800' borderRadius={8}>
            <Text fontSize='lg' mb='4'>
              Taxa de Abertura
            </Text>
            <Chart type='area' height={160} options={options} series={series} />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}
