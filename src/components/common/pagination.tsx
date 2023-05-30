import { Box, Flex, Icon, Input, Select, Text } from '@chakra-ui/react';
import React, { useEffect, useMemo } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

export interface IPaginationProps {
  total: number;
  defaultCurrent?: number;
  defaultPageSize?: number;
  current?: number;
  showQuickJumper?: boolean;
  onChange?(page: number): void;
}

const PAGE_NUM_STYLE = {
  width: '32px',
  height: '32px',
  paddingY: '7px',
  paddingX: '1px',
  marginX: '4px',
  backgroundColor: 'white',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
};

export default function Pagination(props: IPaginationProps) {
  const {
    total,
    defaultCurrent = 1,
    defaultPageSize = 10,
    current,
    showQuickJumper = false,
    onChange,
  } = props;
  const [page, setPage] = React.useState(current ?? defaultCurrent);
  const [pageSize, setPageSize] = React.useState(defaultPageSize);
  const totalPage = useMemo(
    () => Math.ceil(total / pageSize),
    [total, pageSize],
  );
  const range = useMemo(() => {
    let start = page > 2 ? page - 2 : 1;
    let end = start + 4;
    if (end > totalPage) {
      start -= end - totalPage;
      if (start < 1) {
        start = 1;
      }
      end = totalPage;
    }
    return {
      start,
      end,
    };
  }, [page, totalPage]);

  useEffect(() => {
    if (page > totalPage) {
      setPage(totalPage);
    }
  }, [page, totalPage]);

  useEffect(() => {
    if (current !== undefined) {
      setPage(current);
    }
  }, [current]);

  useEffect(() => {
    onChange?.(page);
  }, [page, onChange])

  return (
    <Box>
      <Flex justifyContent="flex-end">
        <Flex>
          <Flex
            {...PAGE_NUM_STYLE}
            marginLeft={0}
            borderWidth="1px"
            borderColor="gray.200"
            cursor={page === 1 ? 'not-allowed' : 'pointer'}
            onClick={() => page !== 1 && setPage(page - 1)}
          >
            <Icon
              as={MdKeyboardArrowLeft}
              width="18px"
              height="18px"
              color={page === 1 ? 'gray.200' : 'black'}
            />
          </Flex>
          {Array.from({ length: totalPage }).map((_, index) => {
            const pageNumber = index + 1;
            const active = pageNumber === page;

            if (
              pageNumber === 1 ||
              (pageNumber >= range.start && pageNumber <= range.end) ||
              pageNumber === totalPage
            ) {
              return (
                <Flex
                  {...PAGE_NUM_STYLE}
                  key={`page_${pageNumber}`}
                  borderWidth="1px"
                  color={active ? 'yellow.700' : 'black'}
                  borderColor={active ? 'yellow.700' : 'gray.200'}
                  borderRadius="2px"
                  onClick={() => setPage(pageNumber)}
                >
                  <Text fontSize="14px" opacity="85%">
                    {pageNumber}
                  </Text>
                </Flex>
              );
            }

            if (
              pageNumber === range.start - 1 ||
              pageNumber === range.end + 1
            ) {
              return (
                <Flex
                  key={`page_${pageNumber}`}
                  {...PAGE_NUM_STYLE}
                  backgroundColor="transparent"
                >
                  <Text fontSize="14px" opacity="25%">
                    •••
                  </Text>
                </Flex>
              );
            }
          })}
        </Flex>
        <Flex
          {...PAGE_NUM_STYLE}
          marginRight={0}
          borderWidth="1px"
          borderColor="gray.200"
          cursor={page === totalPage ? 'not-allowed' : 'pointer'}
          onClick={() => setPage(page + 1)}
        >
          <Icon
            as={MdKeyboardArrowRight}
            width="18px"
            height="18px"
            color={page === totalPage ? 'gray.200' : 'black'}
          />
        </Flex>
        <Select
          value={pageSize}
          width="105px"
          size="sm"
          marginLeft="16px"
          backgroundColor="white"
          onChange={(e) => setPageSize(parseInt(e.target.value))}
        >
          <option value={10}>10/page</option>
          <option value={20}>20/page</option>
          <option value={30}>30/page</option>
          <option value={50}>50/page</option>
          <option value={100}>100/page</option>
        </Select>
        {showQuickJumper && (
          <Flex alignItems="center" marginLeft="8px">
            <Text marginRight="8px" fontSize="14px">
              Go to
            </Text>
            <Input
              height="32px"
              width="50px"
              paddingX="12px"
              paddingY="5px"
              borderRadius="2px"
              backgroundColor="white"
              _focusVisible={{
                boxShadow: 'none',
              }}
              _hover={{
                boxShadow: 'none',
              }}
            />
          </Flex>
        )}
      </Flex>
    </Box>
  );
}
