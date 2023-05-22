import { Text, Flex, Spacer, Box } from "@chakra-ui/react";
import TextField, { ITextFieldProps } from "./common/text-field";

export interface IInputFieldProps extends ITextFieldProps {
  label: string;
}

export default function InputField(props: IInputFieldProps) {
  const { label, ...restProps } = props;
  return (
    <Flex marginBottom={14}>
      <Flex height={12} alignItems="center">
        <Text fontWeight="extrabold">{label}</Text>
      </Flex>
      <Spacer />
      <Flex width="550px" justifyContent="start">
        <Box width="full">
          <TextField {...restProps} size="lg" />
        </Box>
      </Flex>
    </Flex>
  );
}
