import { Text, Flex, Spacer, Box } from "@chakra-ui/react";
import SegmentedButton from "./common/segmented-button";
import TextField from "./common/text-field";
import { BI } from "@ckb-lumos/lumos";
import { useCallback, useMemo, useState } from "react";

const AMOUNT_OPTIONS = ['25%', '50%', '75%', '100%', 'Custom'];

export interface IAmountFieldProps {
  total: BI;
  amount: BI;
  onOptionChange(option: string): void;
  onAmountChange(amount: string): void;
  label?: string;
  disabled?: boolean;
}

export default function AmountField(props: IAmountFieldProps) {
  const { total, amount, label, onOptionChange, onAmountChange, disabled } = props;
  const [custom, setCustom] = useState(true);

  const percent = useMemo(() => {
    if (total.eq(0)) {
      return '0';
    }
    return amount.mul(100).div(total).toString();
  }, [amount, total]);

  const handleOptionChange = useCallback((option: string) => {
    setCustom(option === 'Custom');
    onOptionChange(option);
  }, [onOptionChange]);

  const handleAmountChange = useCallback((val: string) => {
    setCustom(true);
    onAmountChange(val);
  }, [onAmountChange])

  return (
    <Flex marginBottom={14}>
      <Flex height={12} alignItems="center">
        <Text fontWeight="extrabold">{label ?? 'Amount'}</Text>
      </Flex>
      <Spacer />
      <Box>
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
                  borderRightRadius="6px"
                  paddingX={2}
                >
                  <Text>≈ {percent}%</Text>
                </Flex>
              )
            }
          />
        </Box>
      </Box>
    </Flex>
  );
}
