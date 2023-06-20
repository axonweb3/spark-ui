import {
  Box,
  Table as ChakraTable,
  Flex,
  Icon,
  LayoutProps,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import {
  CellContext,
  ColumnDef,
  DeepKeys,
  Row,
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { AnimatePresence, motion } from 'framer-motion';
import { Fragment, useCallback, useMemo, useState } from 'react';
import { MdChevronRight, MdExpandMore } from 'react-icons/md';

interface ColumnType<Data extends object> {
  title: string;
  dataIndex: string;
  width?: LayoutProps['width'];
  render?: (value: any, data: Data[]) => React.ReactNode;
}

export interface ITableProps<Data extends Record<string, any>> {
  data: Data[];
  columns: ColumnType<Data>[];
  expandable?: {
    expandedRowRender?(record: Data): React.ReactNode;
    rowExpandable?(record: Data): boolean;
  };
  isLoading?: boolean;
}

export default function Table<Data extends Record<string, any>>(
  props: ITableProps<Data>,
) {
  const { data = [] } = props;
  const [sorting, setSorting] = useState<SortingState>([]);
  const columnHelper = useMemo(() => createColumnHelper<Data>(), []);
  const columns: ColumnDef<Data, any>[] = useMemo(() => {
    return props.columns.map((column) => {
      const columnDef: ColumnDef<Data, any> = columnHelper.accessor(
        column.dataIndex as DeepKeys<Data>,
        {
          header: column.title,
          cell: (i: CellContext<Data, string>) =>
            column.render?.(i.getValue(), data) ?? i.getValue(),
        },
      );
      return columnDef;
    });
  }, [props.columns, columnHelper, data]);
  const getRowCanExpand = useCallback(
    (row: Row<Data>) => !!props.expandable?.rowExpandable?.(row.original),
    [props.expandable],
  );

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getRowCanExpand,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
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
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const meta: any = header.column.columnDef.meta;
                return (
                  <Th
                    key={header.id}
                    isNumeric={meta?.isNumeric}
                    textTransform="capitalize"
                    padding="16px"
                    color="black"
                    fontFamily="montserrat"
                    fontSize="sm"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </Th>
                );
              })}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row) => (
            <Fragment key={row.id}>
              <Tr>
                {row.getVisibleCells().map((cell, index) => {
                  const meta: any = cell.column.columnDef.meta;
                  return (
                    <Td
                      key={cell.id}
                      isNumeric={meta?.isNumeric}
                      padding="16px"
                      fontFamily="montserrat"
                      fontSize="14px"
                      backgroundColor="white"
                    >
                      <Flex alignItems="center" gap={1}>
                        {row.getCanExpand() &&
                          index === 0 &&
                          props.expandable && (
                            <Icon
                              as={
                                row.getIsExpanded()
                                  ? MdExpandMore
                                  : MdChevronRight
                              }
                              width="24px"
                              height="24px"
                              cursor="pointer"
                              onClick={row.getToggleExpandedHandler()}
                            />
                          )}
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </Flex>
                    </Td>
                  );
                })}
              </Tr>
              <AnimatePresence initial={false}>
                {row.getIsExpanded() && props.expandable?.expandedRowRender && (
                  <Tr>
                    <Td colSpan={row.getVisibleCells().length} padding={0}>
                      <Box
                        paddingLeft={5}
                        backgroundColor="yellow.100"
                        as={motion.div}
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                          open: { opacity: 1, height: 'auto' },
                          collapsed: { opacity: 0, height: 0 },
                        }}
                      >
                        {props.expandable.expandedRowRender(row.original)}
                      </Box>
                    </Td>
                  </Tr>
                )}
              </AnimatePresence>
            </Fragment>
          ))}
        </Tbody>
      </ChakraTable>
    </TableContainer>
  );
}
