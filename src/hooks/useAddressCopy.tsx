import { useClipboard, useToast } from '@chakra-ui/react';
import { useConnect } from './useConnect';
import { useCallback } from 'react';

export function useAddressCopy() {
  const toast = useToast();
  const { address } = useConnect();
  const clipboard = useClipboard(address ?? '');

  const onCopy = useCallback(() => {
    clipboard.onCopy();
    toast({
      title: 'Address Copied!',
      description: address,
      status: 'success',
      isClosable: true,
    });
  }, [address, toast, clipboard]);

  return {
    address,
    onCopy,
  };
}
