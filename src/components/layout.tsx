import React from 'react';
import Header from './header';
import { Box, Container } from '@chakra-ui/react';

export default function Layout(props: React.PropsWithChildren<{}>) {
  return (
    <Box backgroundColor="secondary" minHeight="100vh">
      <Header />
      <main>
        <Container maxW="1440px" paddingY={10}>
          {props.children}
        </Container>
      </main>
    </Box>
  );
}
