import { Text, Flex, Spacer, Box } from '@chakra-ui/react';

export interface IEpochFieldProps {
  epoch: number;
}

export default function EpochField(props: IEpochFieldProps) {
  const { epoch = 2 } = props;
  return (
    <Flex marginBottom={14}>
      <Flex height={12} alignItems="center">
        <Text fontWeight="extrabold">Effective Epoch</Text>
      </Flex>
      <Spacer />
      <Flex width="550px" justifyContent="start">
        <Flex
          width="110px"
          height="48px"
          borderWidth={1}
          borderColor="gray.700"
          borderRadius="6px"
          justifyContent="center"
          alignItems="center"
        >
          <Text fontFamily="montserrat" fontWeight="medium">
            {epoch}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
