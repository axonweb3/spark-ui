import { Flex, Icon, Spacer, Text, Tooltip } from '@chakra-ui/react';
import { MdHelp } from 'react-icons/md';

export interface IEpochFieldProps {
  epoch: number;
}

export default function EpochField(props: IEpochFieldProps) {
  const { epoch = 2 } = props;
  return (
    <Flex marginBottom={14}>
      <Flex height={12} alignItems="center">
        <Text fontWeight="extrabold" fontFamily="montserrat" marginRight={1}>
          Effective Epoch
        </Text>
        <Tooltip
          label="The effective epoch is two epochs ahead of the current one. Any operation performed in the current epoch will have an impact on the validator set of the effective epoch ahead."
          fontSize="sm"
          fontFamily="montserrat"
          padding="8px"
          placement="top-start"
          hasArrow
        >
          <Flex alignItems="center">
            <Icon as={MdHelp} width="20px" height="20px" />
          </Flex>
        </Tooltip>
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
