import { BI } from '@ckb-lumos/lumos';
import { useCallback, useState } from 'react';

export function useAmountState(initialValue = BI.from(0)) {
  const [amount, setAmount] = useState<BI>(initialValue);

  const onAmountChange = useCallback((amount: string) => {
    if (amount === '') {
      setAmount(BI.from(0));
      return;
    }
    const [_, int, dec = '.0'] = amount.match(/^(\d+)(\.\d+)?$/)!;
    const amountBI = BI.from(int)
      .mul(10 ** 8)
      .add(BI.from(dec.slice(1)).mul(10 ** (9 - dec.length)));
    setAmount(amountBI);
  }, []);

  return {
    amount,
    setAmount,
    onAmountChange,
  };
}
