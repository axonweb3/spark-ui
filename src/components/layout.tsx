import React from 'react';
import Header from './header';
import { Box, Container } from '@chakra-ui/react';
import { NotificationProvider } from '@/hooks/useNotification';

export default function Layout(props: React.PropsWithChildren<{}>) {
  return (
    <Box backgroundColor="secondary" minHeight="100vh">
      <Box
        height="full"
        minHeight="100vh"
        backgroundImage="/img/background.png"
        backgroundRepeat="repeat"
      >
        <Header />
        <main>
          <Container maxWidth="1440px" paddingY={10}>
            <NotificationProvider>{props.children}</NotificationProvider>
          </Container>
        </main>
      </Box>
    </Box>
  );
}
