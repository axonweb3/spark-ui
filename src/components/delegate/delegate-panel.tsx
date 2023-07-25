import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Divider, Flex, Text } from '@chakra-ui/react';
import { BI } from '@ckb-lumos/bi';
import Dialog from '../common/dialog';
import AmountField from '../amount-field';
import InputField from '../input-filed';
import EpochField from '../epoch-field';
import { useNotification } from '@/hooks/ui/useNotification';
import { useDialog } from '@/hooks/ui/useDialog';
import { useConnect } from '@/hooks/useConnect';
import { ConnectButton } from '../connect-button';
import { useStakeAmountQuery } from '@/hooks/query/useStakeAmountQuery';
import useStakeRateQuery from '@/hooks/query/useStakeRateQuery';

export default function DelegatePanel() {
  const notify = useNotification();
  const showDialog = useDialog();
  const { isConnected } = useConnect();
  const { availableAmount, isLoading } = useStakeAmountQuery();
  const [delegateTo, setDelegateTo] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const { stakeRate } = useStakeRateQuery();
  const [amount, setAmount] = useState(availableAmount);
  // FIXME: update message
  const [message] = useState('');
  const disabled = useMemo(() => !isConnected || !delegateTo || amount.isZero(), [isConnected, delegateTo, amount]);

  useEffect(() => {
    if (!availableAmount.isZero()) {
      setAmount(availableAmount);
    }
    if (!isConnected) {
      setAmount(BI.from(0));
    }
  }, [isConnected, availableAmount, setAmount]);

  const startDelegateTransaction = useCallback(async () => {
    try {
      // FIXME: delegateMutation
      setShowConfirmDialog(false);
      showDialog({
        title: 'Delegation Request Submitted',
        description: 'Your request has been submitted. Check out Delegation history for details.',
        hideCancel: true,
      });
    } catch (e) {
      notify({
        status: 'error',
        message: (e as Error).message,
      });
    }
  }, [showDialog, notify]);

  return (
    <Box width="756px" marginTop={10} marginX="auto">
      <InputField
        label="Delegate To"
        placeholder="Please add your address here"
        value={delegateTo}
        onChange={setDelegateTo}
        message={message}
        disabled={!isConnected}
        status={message ? 'error' : 'none'}
      />
      <AmountField
        label="Stake Amount"
        total={availableAmount}
        amount={amount}
        onChange={setAmount}
        disabled={!isConnected}
        isLoading={isLoading}
      />
      <EpochField epoch={2} />
      <Flex justifyContent="center" marginBottom={10}>
        <Dialog
          title="Delegation Information"
          open={showConfirmDialog}
          description={
            <Box>
              <Box fontFamily="montserrat" marginBottom={4}>
                <Text fontWeight="medium" marginRight={2}>
                  Delegate Address:
                </Text>
                <Text fontWeight="normal">{delegateTo}</Text>
              </Box>
              <Flex fontFamily="montserrat">
                <Text fontWeight="medium" marginRight={2}>
                  Commission Rate:
                </Text>
                <Text fontWeight="normal">{stakeRate}%</Text>
              </Flex>
              <Divider marginY="18px" backgroundColor="grey.200" />
              <Flex fontFamily="montserrat">
                <Text fontWeight="medium" marginRight={2}>
                  Minimum Amount:
                </Text>
                <Text fontWeight="normal">10,000 AT</Text>
              </Flex>
            </Box>
          }
          cancelLabel="Redelegate"
          confirming={false}
          onConfirm={startDelegateTransaction}
        />
        <ConnectButton size="lg" disabled={disabled} onClick={() => setShowConfirmDialog(true)}>
          Submit
        </ConnectButton>
      </Flex>
    </Box>
  );
}
