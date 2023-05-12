import PWCore, { Address } from '@lay2/pw-core';
import { useLocalStorage } from 'react-use';

export default function useAddress() {
  const [address, setAddress, removeAddress] = useLocalStorage<Address>(
    'pw-core-account',
    undefined,
  );
  const ckbAddress = PWCore.provider?.address.toCKBAddress();
  const ethAddress = PWCore.provider?.address.addressString;

  return { address, ckbAddress, ethAddress, setAddress, removeAddress };
}
