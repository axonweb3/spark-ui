import { Text, Badge as ChakraBadge } from '@chakra-ui/react';
import React from 'react';

export interface IBadgeProps {
  status: 'succeed' | 'pending' | 'failed' | string;
}

export default function Badge(props: IBadgeProps) {
  const { status } = props;

  const colorScheme = React.useMemo(() => {
    switch (status) {
      case 'success':
        return 'green';
      case 'pending':
        return 'yellow';
      case 'failed':
        return 'red';
      default:
        return 'gray';
    }
  }, [status]);

  return (
    <ChakraBadge
      colorScheme={colorScheme}
      paddingX="8px"
      paddingY="2px"
      borderRadius="2px"
      fontWeight="bold"
      textTransform="uppercase"
    >
      <Text fontFamily="montserrat">{status}</Text>
    </ChakraBadge>
  );
}
