// import { helpers } from '@ckb-lumos/lumos';
// import { signTransaction } from '@spinal-ckb/react';
import { AxiosResponse } from 'axios';
import { useMutation } from 'react-query';

export function useSendTxMutation<T>(
  fetcher: (data: T) => Promise<AxiosResponse<any, any>>,
  options?: Parameters<typeof useMutation>[2],
) {
  const mutation = useMutation(async (params: T) => {
    const response = await fetcher(params);
    if (response.data.error) {
      throw new Error(response.data.error.message);
    }

    // const tx = helpers
    //   .TransactionSkeleton({})
    //   .update('inputs', (inputs) => inputs.push(...response.data.inputs))
    //   .update('outputs', (outputs) => outputs.push(...response.data.outputs));

    // TODO: update cellDeps and headerDeps

    // const signedTx = await signTransaction(tx);

    // const txResponse = await axios.post(`/api/send-transaction`, signedTx);
    // if (response.data.error) {
    //   throw new Error(response.data.error.message);
    // }

    // return txResponse.data;
    return response.data;
  }, options);

  return mutation;
}
