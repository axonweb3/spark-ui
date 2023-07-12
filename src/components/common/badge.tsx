import { Badge as ChakraBadge, Text } from '@chakra-ui/react';
import theme from '@/theme';
import React from 'react';

export interface IBadgeProps {
  status: 'succeed' | 'pending' | 'failed' | string;
  label?: string;
}

export default function Badge(props: IBadgeProps) {
  const { status, label } = props;

  const colors = React.useMemo(() => {
    switch (status) {
      case 'success':
        return {
          backgroundColor: theme.colors.green[200],
          color: theme.colors.green[800],
        };
      case 'pending':
        return {
          backgroundColor: theme.colors.yellow[200],
          color: theme.colors.yellow[700],
        };
      case 'failed':
        return {
          backgroundColor: theme.colors.orange[200],
          color: theme.colors.orange[700],
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
      paddingX="4px"
      borderRadius="2px"
      fontWeight="bold"
      minWidth="75px"
      textAlign="center"
      textTransform="uppercase"
    >
      <Text fontFamily="montserrat">{label ?? status}</Text>
    </ChakraBadge>
  );
}
