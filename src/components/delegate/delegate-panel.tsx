import React, { startTransition, useEffect, useMemo, useState } from 'react';
import Button from '@/components/common/button';
import { Text, Box, Flex, Divider } from '@chakra-ui/react';
import { useConnect } from '@spinal-ckb/react';
import { BI } from '@ckb-lumos/lumos';
import Dialog from '../common/dialog';
import AmountField from '../amount-field';
import InputField from '../input-filed';
import EpochField from '../epoch-field';
import { useStakeAmountQuery } from '@/hooks/useStakeAmountQuery';
import { useStakeRateQuery } from '@/hooks/useStakeRateQuery';
import { useSendTxMutation } from '@/hooks/useSendTxMutation';
import axios from 'axios';
import { useNotification } from '@/hooks/useNotification';
import { useDialog } from '@/hooks/useDialog';

export default function DelegatePanel() {
  const notify = useNotification();
  const showDialog = useDialog();
  const { connected, address } = useConnect();
  const { isLoading, availableAmount } = useStakeAmountQuery(address);
  const [delegateAddress, setDelegateAddress] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const { stakeRate, error, isFetching } = useStakeRateQuery(delegateAddress, {
    retry: false,
  });
  const [amount, setAmount] = useState(availableAmount);
  const [message, setMessage] = useState('');
  const disabled = useMemo(
    () => !connected || !delegateAddress || amount.isZero(),
    [connected, delegateAddress, amount],
  );

  const mutation = useSendTxMutation(
    (params: { address: string; to: string; amount: number }) => {
      return axios.post(`/api/delegate`, params);
    },
    {
      onError: (err) => {
        notify({
          status: 'error',
          message: (err as Error).message,
        });
      },
      onSuccess: () => {
        setShowConfirmDialog(false);
        showDialog({
          title: 'Delegation Request Submitted',
          description:
            'Your request has been submitted. Check out Delegation history for details.',
          hideCancel: true,
        });
      },
    },
  );

  useEffect(() => {
    if (!availableAmount.isZero()) {
      setAmount(availableAmount);
    }
    if (!connected) {
      setAmount(BI.from(0));
    }
  }, [connected, availableAmount, setAmount]);

  useEffect(() => {
    startTransition(() => {
      if (delegateAddress && error) {
        setMessage(error.response.data.message);
      } else if (!isFetching) {
        setMessage('');
      }
    });
  }, [delegateAddress, error, isFetching]);

  return (
    <Box width="756px" marginTop={10} marginX="auto">
      <InputField
        label="Delegate To"
        placeholder="Please add your address here"
        value={delegateAddress}
        onChange={setDelegateAddress}
        message={message}
        disabled={!connected}
        status={message ? 'error' : 'none'}
      />
      <AmountField
        label="Stake Amount"
        total={availableAmount}
        amount={amount}
        onChange={setAmount}
        disabled={!connected}
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
                <Text fontWeight="normal">{delegateAddress}</Text>
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
          confirming={mutation.isLoading}
          onConfirm={() =>
            mutation.mutate({
              address: address!,
              to: delegateAddress!,
              amount: amount.toNumber(),
            })
          }
        >
          <Button
            size="lg"
            disabled={disabled}
            onClick={() => setShowConfirmDialog(true)}
          >
            Submit
          </Button>
        </Dialog>
      </Flex>
    </Box>
  );
}
