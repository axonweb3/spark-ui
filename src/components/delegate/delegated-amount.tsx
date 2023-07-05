import { Text, Input, Flex, Icon } from '@chakra-ui/react';
import React, { useState } from 'react';
import { MdCreate, MdDelete } from 'react-icons/md';

export interface IDelegatedAmountProps {
  amount: number;
}

export default function DelegatedAmount(props: IDelegatedAmountProps) {
  const [amount, setAmount] = useState(props.amount);
  const [editing, setEditing] = React.useState(false);

  return (
    <Flex width="full">
      <Flex grow="1" marginRight={4}>
        {editing ? (
          <Input
            height="20px"
            fontSize="16px"
            marginTop="-5px"
            marginRight={2}
            padding={0}
            paddingLeft={2}
            _focusVisible={{
              boxShadow: 'none',
              borderColor: 'yellow.400',
            }}
            _hover={{
              boxShadow: 'none',
              borderColor: 'yellow.400',
            }}
            defaultValue={amount.toString()}
            onChange={(e) => setAmount(parseInt(e.target.value, 10))}
            onBlur={() => setEditing(false)}
          />
        ) : (
          <Text
            fontFamily="montserrat"
            fontSize="14px"
            onDoubleClick={() => setEditing(true)}
          >
            {amount} AT
          </Text>
        )}
      </Flex>
      <Icon
        as={MdCreate}
        width="16px"
        height="16px"
        color="yellow.800"
        marginRight={4}
        onClick={() => setEditing(true)}
      />
      <Icon as={MdDelete} width="16px" height="16px" color="yellow.800" />
    </Flex>
  );
}
