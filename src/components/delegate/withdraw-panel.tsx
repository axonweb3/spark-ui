import {
  Text,
  Alert,
  Box,
  Icon,
  Stat,
  StatLabel,
  StatNumber,
  Flex,
} from '@chakra-ui/react';
import { MdError } from 'react-icons/md';
import Table from '../common/table';
import Button from '../common/button';
import Dialog from '../common/dialog';

export default function WithdrawPanel() {
  return (
    <Box>
      <Box marginBottom="40px">
        <Alert status="info" backgroundColor="blue.200" borderRadius="8px">
          <Icon
            as={MdError}
            width="24px"
            height="24px"
            color="blue.400"
            marginRight={2}
          />
          <Text fontFamily="montserrat" fontWeight="medium">
            Undelegated tokens will be withdrawn in a single operation.
          </Text>
        </Alert>
      </Box>
      <Box
        borderWidth="1px"
        borderColor="gray.700"
        borderRadius="16px"
        backgroundColor="white"
        padding="16px"
        marginBottom="40px"
      >
        <Stat fontFamily="montserrat">
          <StatLabel fontSize="md" fontWeight="bold">
            Total Amount
          </StatLabel>
          <StatNumber>
            <Flex alignItems="baseline">
              <Text fontSize="30px" marginRight={1}>
                35000
              </Text>
              <Text fontSize="md">AT</Text>
            </Flex>
          </StatNumber>
        </Stat>
      </Box>
      <Box marginBottom="40px">
        <Table
          columns={[
            {
              title: 'ID',
              dataIndex: 'id',
              sorter: true,
            },
            {
              title: 'Amount (AT)',
              dataIndex: 'amount',
              sorter: true,
            },
            {
              title: 'Status',
              dataIndex: 'status',
              sorter: true,
            },
          ]}
          dataSources={[
            {
              id: '82659894393984111',
              amount: 1000,
              status: 'Successed',
            },
            {
              id: '82659894393984222',
              amount: 1000,
              status: 'Pending',
            },
            {
              id: '82659894393984333',
              amount: 1000,
              status: 'Failed',
            },
            {
              id: '82659894393984444',
              amount: 1000,
              status: 'Successed',
            },
            {
              id: '82659894393984555',
              amount: 1000,
              status: 'Pending',
            },
            {
              id: '82659894393984666',
              amount: 1000,
              status: 'Failed',
            },
          ]}
        />
      </Box>
      <Flex justifyContent="center">
        <Dialog
          title="Total Withdrawlable Amount"
          description="Your available withdrawal amount is 2000AT"
          confrmLabel="Withdraw"
        >
          <Button size="lg">
            Withdraw
          </Button>
        </Dialog>
      </Flex>
    </Box>
  );
}
