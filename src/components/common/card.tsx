import React from 'react';
import { Box } from '@chakra-ui/react';

export interface ICardProps extends React.PropsWithChildren {
  title?: string | React.ReactNode;
}

export default function Card(props: ICardProps) {
  const { title, children } = props;

  return (
    <Box
      borderWidth={1}
      borderColor="grey.700"
      borderRadius="16px"
      backgroundColor="primary"
      height="full"
      maxWidth="1080px"
      filter="drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.15))"
      mx="auto"
    >
      {title && (
        <Box borderBottomWidth={1} borderColor="grey.700" px={12} py={5}>
          {title}
        </Box>
      )}
      <Box px={12} py={5}>
        {children}
      </Box>
    </Box>
  );
}
