import {
  Text,
  Box,
  Flex,
  Icon,
  SimpleGrid,
  Stat,
  StatLabel,
  Tooltip,
  StatNumber,
  Spacer,
  Button,
} from '@chakra-ui/react';
import {
  MdFileCopy,
  MdHelp,
  MdOutlineCheckBoxOutlineBlank,
} from 'react-icons/md';
import Card from '../common/card';
import Dialog from '../common/dialog';
import { useMemo } from 'react';
import { useBalanceQuery } from '@/hooks/query/useBalanceQuery';
import { useConnect } from '@/hooks/useConnect';
import { useStakeRole } from '@/hooks/useStakeRole';
import { useAddressCopy } from '@/hooks/useAddressCopy';

export function RewardStats() {
  const { address } = useConnect();
  const { unlockAmount, lockedAmount, stakedAmount, delegatedAmount } =
    useBalanceQuery(address);
  const { onCopy } = useAddressCopy();
  const { isDelegator } = useStakeRole();

  const displayAddress = useMemo(() => {
    return (
      address?.substring(0, 20) +
      '...' +
      address?.substring(address.length - 20)
    );
  }, [address]);

  const stats = useMemo(
    () => [
      {
        label: 'Unlocked Rewards',
        tooltip: 'Available for withdrawal and spending.',
        value: (unlockAmount.toNumber() / 10 ** 8).toFixed(2),
      },
      {
        label: 'Locked Rewards',
        tooltip: 'Available only after the locking period.',
        value: (lockedAmount.toNumber() / 10 ** 8).toFixed(2),
      },
      {
        label: 'Total Staked or Delegated Amount',
        value: (stakedAmount.add(delegatedAmount).toNumber() / 10 ** 8).toFixed(
          2,
        ),
      },
    ],
    [unlockAmount, lockedAmount, stakedAmount, delegatedAmount],
  );

  return (
    <Card size="lg" backgroundColor={isDelegator ? 'secondary' : 'primary'}>
      <Box paddingY="60px" paddingX="32px">
        <Box marginBottom="60px">
          <Flex justifyContent="space-between" alignItems="center">
            <Text
              fontFamily="alfarn-2"
              fontSize="25px"
              fontWeight="semibold"
              marginRight="30px"
            >
              My Address
            </Text>
            <Spacer />
            <Flex alignItems="center">
              <Text fontFamily="montserrat">{displayAddress}</Text>
              <Icon
                as={MdFileCopy}
                marginLeft={2}
                width="16px"
                height="16px"
                cursor="pointer"
                onClick={onCopy}
              />
            </Flex>
          </Flex>
        </Box>
        <SimpleGrid columns={3} spacing="12px" marginBottom="60px">
          {stats.map(({ label, tooltip, value }) => (
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
                  <Flex>
                    {label}
                    {tooltip && (
                      <Tooltip
                        label={tooltip}
                        fontSize="sm"
                        fontFamily="montserrat"
                        padding="8px"
                        placement="bottom-start"
                        hasArrow
                      >
                        <Flex alignItems="center" marginLeft={2}>
                          <Icon as={MdHelp} width="20px" height="20px" />
                        </Flex>
                      </Tooltip>
                    )}
                  </Flex>
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
  );
}
