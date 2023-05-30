import {
  Text,
  Table as ChakraTable,
  Flex,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Box,
  Spacer,
  LayoutProps,
  Spinner,
} from '@chakra-ui/react';
import { useMemo, useState } from 'react';

interface ColumnType {
  title: string;
  dataIndex: string;
  key?: string;
  width?: LayoutProps['width'];
  sorter?: boolean | ((a: any, b: any) => number);
  render?: (value: any, data: DataSourceType) => React.ReactNode;
}

interface DataSourceType {
  key?: string;
  [key: string]: any;
}

export interface ITableProps {
  rowKey?: string;
  isLoading?: boolean;
  columns: ColumnType[];
  dataSources: DataSourceType[];
}

export default function Table(props: ITableProps) {
  const { rowKey = 'key', isLoading, dataSources } = props;
  const [columns] = useState(props.columns);

  return (
    <Box position="relative">
      {isLoading && (
        <Flex
          position="absolute"
          width="100%"
          height="100%"
          backgroundColor="white"
          opacity="50%"
          justifyContent="center"
          alignItems="center"
          cursor="wait"
        >
          <Spinner color="brand" width={30} height={30} />
        </Flex>
      )}
      <TableContainer
        borderWidth="1px"
        borderColor="gray.700"
        borderRadius="16px"
      >
        <ChakraTable variant="simple">
          <Thead
            backgroundColor="secondary"
            borderBottom="1px"
            borderColor="gray.100"
          >
            <Tr>
              {columns.map(({ title, key, dataIndex, sorter, ...rest }) => (
                <Th
                  key={`col_${key ?? dataIndex}`}
                  textTransform="capitalize"
                  padding="16px"
                  width={rest.width}
                >
                  <Flex>
                    <Text color="black" fontFamily="montserrat" fontSize="sm">
                      {title}
                    </Text>
                    <Spacer />
                    {sorter && <Sorter />}
                  </Flex>
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {dataSources.map((dataSource: DataSourceType, index: number) => {
              const rkey = dataSource[rowKey];
              return (
                <Tr key={`${rkey}_${index}`}>
                  {columns.map(({ dataIndex, key, render }) => {
                    return (
                      <Td
                        key={`row_${rkey}_${key ?? dataIndex}`}
                        padding="16px"
                        fontFamily="montserrat"
                        fontSize="14px"
                        backgroundColor="white"
                      >
                        {render
                          ? render(dataSource[dataIndex], dataSource)
                          : dataSource[dataIndex]}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </ChakraTable>
      </TableContainer>
    </Box>
  );
}

const sorterCaretPaths = {
  up: 'M8.6921 5.63879L4.72356 1.03702C4.60997 0.905302 4.39124 0.905302 4.27644 1.03702L0.307898 5.63879C0.160467 5.81039 0.293396 6.06174 0.53146 6.06174H8.46854C8.7066 6.06174 8.83953 5.81039 8.6921 5.63879Z',
  down: 'M8.46854 0.938232H0.53146C0.293396 0.938232 0.160467 1.18959 0.307898 1.36119L4.27644 5.96295C4.39003 6.09468 4.60876 6.09468 4.72356 5.96295L8.6921 1.36119C8.83953 1.18959 8.7066 0.938232 8.46854 0.938232Z',
};

function Sorter() {
  const svgProps = useMemo(
    () => ({
      width: '9',
      height: '7',
      viewBox: '0 0 9 7',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg',
    }),
    [],
  );

  return (
    <Flex direction="column">
      <Box cursor="pointer">
        <svg {...svgProps}>
          <path d={sorterCaretPaths.up} fill="#7B7973" />
        </svg>
      </Box>
      <Box cursor="pointer">
        <svg {...svgProps}>
          <path d={sorterCaretPaths.down} fill="#7B7973" />
        </svg>
      </Box>
    </Flex>
  );
}
