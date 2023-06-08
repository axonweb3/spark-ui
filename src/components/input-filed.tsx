import { Text, Flex, Spacer, Box } from '@chakra-ui/react';
import TextField, { ITextFieldProps } from './common/text-field';

export interface IInputFieldProps extends ITextFieldProps {
  label: string;
  width?: string;
}

export default function InputField(props: IInputFieldProps) {
  const { label, width, ...restProps } = props;
  return (
    <Flex marginBottom={restProps.message ? '40px' : '58px'}>
      <Flex height={12} alignItems="center">
        <Text fontFamily="montserrat" fontWeight="extrabold">
          {label}
        </Text>
      </Flex>
      <Spacer />
      <Flex width={width ?? '550px'} justifyContent="start">
        <Box width="full">
          <TextField {...restProps} size="lg" />
        </Box>
      </Flex>
    </Flex>
  );
}
