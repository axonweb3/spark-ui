import { Text, Flex, Spacer, Box, Spinner } from '@chakra-ui/react';
import SegmentedButton from './common/segmented-button';
import TextField from './common/text-field';
import { BI } from '@ckb-lumos/lumos';
import { useCallback, useMemo, useState } from 'react';

const AMOUNT_OPTIONS = ['25%', '50%', '75%', '100%', 'Custom'];

export interface IAmountFieldProps {
  total: BI;
  amount: BI;
  onChange(amount: BI): void;
  label?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

export default function AmountField(props: IAmountFieldProps) {
  const { total, amount, label, onChange, disabled, isLoading } = props;
  const [custom, setCustom] = useState(true);

  const percent = useMemo(() => {
    if (total.eq(0)) {
      return '0';
    }
    return Math.ceil(amount.mul(100).div(total).toNumber());
  }, [amount, total]);

  const handleOptionChange = useCallback(
    (option: string) => {
      setCustom(option === 'Custom');
      switch (option) {
        case 'Custom':
          if (!amount.eq(total)) {
            onChange(total);
          }
          break;
        default:
          const [percent] = option.split('%');
          onChange(total.mul(percent).div(100));
          break;
      }
    },
    [total, amount, onChange],
  );

  const handleAmountChange = useCallback(
    (val: string) => {
      setCustom(true);
      if (val === '') {
        onChange(BI.from(0));
        return;
      }
      const [_, int, dec = '.0'] = val.match(/^(\d+)(\.\d+)?$/)!;
      const amount = BI.from(int)
        .mul(10 ** 8)
        .add(BI.from(dec.slice(1)).mul(10 ** (9 - dec.length)));
      onChange(amount);
    },
    [onChange],
  );

  return (
    <Flex marginBottom={14}>
      <Flex height={12} alignItems="center">
        <Text fontFamily="montserrat" fontWeight="extrabold">
          {label ?? 'Amount'}
        </Text>
      </Flex>
      <Spacer />
      <Box width="550px">
        <SegmentedButton
          options={AMOUNT_OPTIONS}
          value={custom ? 'Custom' : `${percent}%`}
          onChange={handleOptionChange}
        />
        <Box marginTop={4} width="full">
          <TextField
            type="number"
            size="lg"
            value={(amount.toNumber() / 10 ** 8).toString()}
            onChange={handleAmountChange}
            disabled={disabled}
            rightAddon={
              !disabled && (
                <Flex
                  width={20}
                  height="full"
                  backgroundColor="secondary"
                  alignItems="center"
                  justifyContent="center"
                  borderRightRadius="6px"
                  paddingX={2}
                >
                  {isLoading ? <Spinner /> : <Text>≈ {percent}%</Text>}
                </Flex>
              )
            }
          />
        </Box>
      </Box>
    </Flex>
  );
}
