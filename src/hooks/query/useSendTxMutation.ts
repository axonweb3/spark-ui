// import { helpers } from '@ckb-lumos/lumos';
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

    // const provider = this.getProvider();
    // const inputs = tx.get('inputs');

    // tx = tx.update('cellDeps', (cellDeps) =>
    //   cellDeps.push(getScriptCellDep('OMNILOCK'), getScriptCellDep('SECP256K1_BLAKE160')),
    // );

    // const witness = bytes.hexify(blockchain.WitnessArgs.pack({ lock: OMNILOCK_SIGNATURE_PLACEHOLDER }));
    // inputs.forEach(() => {
    //   tx = tx.update('witnesses', (witnesses) => witnesses.push(witness));
    // });

    // tx = commons.omnilock.prepareSigningEntries(tx);
    // const { message } = tx.signingEntries.get(0)!;
    // let signature: string = await provider!.request({
    //   method: 'personal_sign',
    //   params: [message as Hex, provider!.selectedAddress],
    // });

    // // Fix ECDSA recoveryId v parameter
    // // https://bitcoin.stackexchange.com/questions/38351/ecdsa-v-r-s-what-is-v
    // let v = Number.parseInt(signature.slice(-2), 16);
    // if (v >= 27) v -= 27;
    // signature = '0x' + signature.slice(2, -2) + v.toString(16).padStart(2, '0');

    // const signedWitness = bytes.hexify(
    //   blockchain.WitnessArgs.pack({
    //     lock: commons.omnilock.OmnilockWitnessLock.pack({
    //       signature: bytes.bytify(signature!).buffer,
    //     }),
    //   }),
    // );

    // tx = tx.update('witnesses', (witnesses) => witnesses.set(0, signedWitness));
    // const signedTx = helpers.createTransactionFromSkeleton(tx);
    // return signedTx;

    // const txResponse = await axios.post(`/api/send-transaction`, signedTx);
    // if (response.data.error) {
    //   throw new Error(response.data.error.message);
    // }

    // return txResponse.data;
    return response.data;
  }, options);

  return mutation;
}
