import { Text, Badge as ChakraBadge } from '@chakra-ui/react';
import React from 'react';

export interface IBadgeProps {
  status: 'succeed' | 'pending' | 'failed' | string;
}

export default function Badge(props: IBadgeProps) {
  const { status } = props;

  const colors = React.useMemo(() => {
    switch (status) {
      case 'success':
        return {
          backgroundColor: '#CEF4D0',
          color: '#224D24',
        };
      case 'pending':
        return {
          backgroundColor: '#FDF1CA',
          color: '#574A1D',
        };
      case 'failed':
        return {
          backgroundColor: '#FFCAC7',
          color: '#99322C',
        };
      default:
        return {
          backgroundColor: 'gray.200',
          color: 'gray.700',
        };
    }
  }, [status]);

  return (
    <ChakraBadge
      {...colors}
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
