import { Text, Box } from '@chakra-ui/react';
import Table from '../common/table';
import { usePaginatedAtomQuery } from '@/hooks/query/usePaginatedAtomQuery';
import { statsTopStakeAddressesAtom } from '@/state/query/stats';

const columns = [
  {
    title: 'Rank',
    dataIndex: 'rank',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    render: (address: string) =>
      address.slice(0, 20) + '...' + address.slice(-20),
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

  return (
    <Box marginX="-13px">
      <Box marginBottom="20px">
        <Text fontFamily="alfarn-2" fontWeight="semibold">
          Top Staking Addresses
        </Text>
      </Box>
      <Box marginBottom="10px">
        <Table columns={columns} data={data} isLoading={isLoading} />
      </Box>
    </Box>
  );
}
