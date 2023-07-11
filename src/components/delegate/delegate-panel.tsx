import React, { startTransition, useCallback, useEffect, useMemo, useState } from 'react';
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
import { useAtomValue } from 'jotai';
import { loadable } from 'jotai/utils';
import { rateAtom } from '@/state/query/rate';
import { useAmountAtomQuery } from '@/hooks/query/useAmountAtomQuery';
import { availableAmountAtom } from '@/state/query/amount';
import { useSendTransactionAtomMutate } from '@/hooks/mutate/useSendTransactionAtomMutate';
import { delegateMutateAtom } from '@/state/mutate/delegate';

export default function DelegatePanel() {
  const notify = useNotification();
  const showDialog = useDialog();
  const { isConnected, address } = useConnect();
  const { amount: availableAmount, isLoading } = useAmountAtomQuery(address, availableAmountAtom);
  const [delegateTo, setDelegateTo] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const rateQuery = useAtomValue(loadable(rateAtom(address)));
  const stakeRate = useMemo(() => (rateQuery.state === 'hasData' ? rateQuery.data?.rate : 0), [rateQuery]);
  const [amount, setAmount] = useState(availableAmount);
  const [message, setMessage] = useState('');
  const disabled = useMemo(() => !isConnected || !delegateTo || amount.isZero(), [isConnected, delegateTo, amount]);

  const delegateMutation = useSendTransactionAtomMutate(delegateMutateAtom);

  useEffect(() => {
    if (!availableAmount.isZero()) {
      setAmount(availableAmount);
    }
    if (!isConnected) {
      setAmount(BI.from(0));
    }
  }, [isConnected, availableAmount, setAmount]);

  useEffect(() => {
    startTransition(() => {
      if (delegateTo && rateQuery.state === 'hasError') {
        setMessage(rateQuery.error as string);
      } else if (rateQuery.state === 'hasData') {
        setMessage('');
      }
    });
  }, [delegateTo, rateQuery]);

  const startDelegateTransaction = useCallback(async () => {
    try {
      await delegateMutation.mutate([
        {
          delegateTo,
          amount: amount.toNumber(),
        },
      ]);
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
  }, [delegateTo, amount, delegateMutation, showDialog, notify]);

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
          confirming={delegateMutation.isLoading}
          onConfirm={startDelegateTransaction}
        />
        <ConnectButton size="lg" disabled={disabled} onClick={() => setShowConfirmDialog(true)}>
          Submit
        </ConnectButton>
      </Flex>
    </Box>
  );
}
