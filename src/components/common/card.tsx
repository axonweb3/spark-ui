import React from 'react';
import { Box, Text } from '@chakra-ui/react';

export interface ICardProps extends React.PropsWithChildren {
  title?: string | React.ReactNode;
}

export default function Card(props: ICardProps) {
  const { title, children } = props;

  return (
    <Box
      borderWidth={1}
      borderColor="grey.700"
      borderRadius="md"
      backgroundColor="primary"
      maxWidth="1080px"
      mx="auto"
    >
      {title && (
        <Text borderBottomWidth={1} borderColor="grey.700" px={12} py={5}>
          {title}
        </Text>
      )}
      <Box px={12} py={5}>
        {children}
      </Box>
    </Box>
  );
}
