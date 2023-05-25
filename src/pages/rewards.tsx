import React, { useCallback, useMemo } from 'react';
import Card from '@/components/common/card';
import Layout from '@/components/layout';
import {
  Text,
  Box,
  Flex,
  Icon,
  useClipboard,
  useToast,
  Stat,
  StatLabel,
  StatNumber,
  SimpleGrid,
  Spacer,
} from '@chakra-ui/react';
import { useConnect } from '@spinal-ckb/react';
import { MdFileCopy, MdOutlineCheckBoxOutlineBlank } from 'react-icons/md';
import Button from '@/components/common/button';
import SegmentedButton from '@/components/common/segmented-button';
import Badge from '@/components/common/badge';
import Table from '@/components/common/table';
import Pagination from '@/components/common/pagination';
import Dialog from '@/components/common/dialog';

const MOCK_STATS = [
  {
    label: 'Unlocked Rewards',
    value: 10000,
  },
  {
    label: 'Locked Rewards',
    value: 10000,
  },
  {
    label: 'Total Staked/Delegated Amount',
    value: 10000,
  },
];

const MOCK_COLUMNS = [
  {
    title: 'Epoch',
    dataIndex: 'epoch',
  },
  {
    title: 'Total Rewards',
    dataIndex: 'rewards',
  },
  {
    title: 'Rewards Status',
    dataIndex: 'status',
    render: (status: string, data: any) => {
      return <Badge key={data.id} status={status} />;
    },
  },
];

const MOCK_DATASOURCE = [
  {
    epoch: 1,
    rewards: 1000,
    status: 'succeed',
  },
  {
    epoch: 2,
    rewards: 1000,
    status: 'pending',
  },
  {
    epoch: 3,
    rewards: 1000,
    status: 'failed',
  },
  {
    epoch: 4,
    rewards: 1000,
    status: 'succeed',
  },
  {
    epoch: 5,
    rewards: 1000,
    status: 'pending',
  },
  {
    epoch: 6,
    rewards: 1000,
    status: 'failed',
  },
];

const REWARDS_TAB = ['Rewards History', 'Withdrawal History'];

export default function RewardsPage() {
  const toast = useToast();
  const { address } = useConnect({});
  const { onCopy } = useClipboard(address ?? '');

  const displayAddress = useMemo(() => {
    return (
      address?.substring(0, 30) +
      '...' +
      address?.substring(address.length - 30)
    );
  }, [address]);

  const handleCopyAddress = useCallback(() => {
    onCopy();
    toast({
      title: 'Address Copied!',
      description: address,
      status: 'success',
      isClosable: true,
    });
  }, [address, onCopy, toast]);

  return (
    <Layout>
      <Card>
        <Box paddingY="60px" paddingX="32px">
          <Box marginBottom="60px">
            <Flex justifyContent="space-between" alignItems="center">
              <Flex alignItems="center">
                <Text
                  fontFamily="alfarn-2"
                  fontSize="25px"
                  fontWeight="semibold"
                  marginRight="30px"
                >
                  My Address
                </Text>
                <Text fontFamily="montserrat">{displayAddress}</Text>
              </Flex>
              <Icon
                as={MdFileCopy}
                width="16px"
                height="16px"
                cursor="pointer"
                onClick={handleCopyAddress}
              />
            </Flex>
          </Box>
          <SimpleGrid columns={3} spacing="12px" marginBottom="60px">
            {MOCK_STATS.map(({ label, value }) => (
              <Box
                key={label}
                backgroundColor="white"
                paddingX="30px"
                paddingY="20px"
                borderWidth="0.5px"
                borderColor="black"
                borderRadius="16px"
              >
                <Stat>
                  <StatLabel fontFamily="montserrat" fontWeight="bold">
                    {label}
                  </StatLabel>
                  <StatNumber
                    fontFamily="montserrat"
                    display="flex"
                    alignItems="baseline"
                  >
                    <Text fontSize="36px" marginRight={1}>
                      {value}
                    </Text>
                    <Text fontSize="16px">AT</Text>
                  </StatNumber>
                </Stat>
              </Box>
            ))}
          </SimpleGrid>
          <Flex justifyContent="center">
            <Dialog
              description="All of your unlocked rewards will be withdrawn in a single operation. The remaining balance will be zero afterwards."
              footer={
                <Flex width="full">
                  <Flex alignItems="center">
                    <Flex
                      width={6}
                      height={6}
                      marginRight={1}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <MdOutlineCheckBoxOutlineBlank />
                    </Flex>
                    <Text fontSize="sm" color="blue.400">
                      Do not show again
                    </Text>
                  </Flex>
                  <Spacer />
                  <Flex>
                    <Button variant="outlined" size="sm">
                      Cancel
                    </Button>
                    <Box width={2} />
                    <Button variant="contained" size="sm">
                      Got it
                    </Button>
                  </Flex>
                </Flex>
              }
            >
              <Button size="lg">Withdraw Unlocked Rewards</Button>
            </Dialog>
          </Flex>
        </Box>
      </Card>
      <Box height="30px" />
      <Card>
        <Box paddingY="30px" paddingX="32px">
          <Flex justifyContent="center" marginBottom="30px">
            <Box width="420px">
              <SegmentedButton options={REWARDS_TAB} />
            </Box>
          </Flex>
          <Table columns={MOCK_COLUMNS} dataSources={MOCK_DATASOURCE} />
          <Box marginTop="30px">
            <Pagination total={500} showQuickJumper />
          </Box>
        </Box>
      </Card>
    </Layout>
  );
}
