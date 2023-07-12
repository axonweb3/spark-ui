import { Box, Text } from '@chakra-ui/react';
import Table from '../common/table';
import { usePaginatedAtomQuery } from '@/hooks/query/usePaginatedAtomQuery';
import { statsTopStakeAddressesAtom } from '@/state/query/stats';
import { useStakeRole } from '@/hooks/useStakeRole';

const columns = [
  {
    title: 'Address',
    dataIndex: 'address',
    render: (address: string) => address.slice(0, 20) + '...' + address.slice(-20),
  },
  {
    title: 'Stake Amount',
    dataIndex: 'amount',
    render: (amount: string) => {
      return `${(parseInt(amount, 10) / 10 ** 8).toFixed(2)} AT`;
    },
  },
];

export function TopStakeAddresses() {
  const { data, isLoading } = usePaginatedAtomQuery(statsTopStakeAddressesAtom);
  const { isValidator } = useStakeRole();

  return (
    <Box marginX="-13px">
      <Box marginBottom="20px">
        <Text fontFamily="alfarn-2" fontSize="18px" fontWeight="semibold">
          Top Staking Addresses
        </Text>
      </Box>
      <Box marginBottom="10px">
        <Table
          columns={columns}
          data={data}
          isLoading={isLoading}
          backgroundColor={isValidator ? 'secondary' : 'primary'}
        />
      </Box>
    </Box>
  );
}
