import { BI, helpers } from '@ckb-lumos/lumos';
import { useMutation } from 'react-query';
import { signTransaction } from '@spinal-ckb/react';
import axios from 'axios';

export function useStakeMutation(options?: Parameters<typeof useMutation>[2]) {
  const mutation = useMutation(
    async ({
      address,
      amount,
    }: {
      address: string | undefined;
      amount: BI;
    }) => {
      const response = await axios.post(`/api/stake?address=${address}`, {
        amount: amount.toNumber(),
      });
      if (response.data.error) {
        throw new Error(response.data.error.message);
      }

      // const tx = helpers
      //   .TransactionSkeleton({})
      //   .update('inputs', (inputs) => inputs.push(...response.data.inputs))
      //   .update('outputs', (outputs) => outputs.push(...response.data.outputs));

      // const signedTx = signTransaction(tx);
      // return signedTx;
      return response;
    },
    options,
  );

  return mutation;
}
