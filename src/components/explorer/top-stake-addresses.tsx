import { Text, Box } from '@chakra-ui/react';
import Table from '../common/table';
import { ITopStakeAddress } from '@/hooks/query/useStakeStatsQuery';
import { useMemo } from 'react';

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

export interface ITopStakeAddressesProps {
  dataSource: ITopStakeAddress[];
}

export function TopStakeAddresses(props: ITopStakeAddressesProps) {
  const dataSource = useMemo(() => {
    return props.dataSource.map((item: ITopStakeAddress, index) => {
      return {
        ...item,
        rank: index + 1,
      };
    });
  }, [props.dataSource]);

  return (
    <Box marginX="-13px">
      <Box marginBottom="20px">
        <Text fontFamily="alfarn-2" fontWeight="semibold">
          Top Staking Addresses
        </Text>
      </Box>
      <Box marginBottom="10px">
        <Table rowKey="rank" columns={columns} dataSources={dataSource} />
      </Box>
    </Box>
  );
}
