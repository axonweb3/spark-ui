import React from 'react';
import Header from './header';
import { Box, Container } from '@chakra-ui/react';
import { NotificationProvider } from '@/hooks/useNotification';

export interface ILayoutProps {
  logoOnly?: boolean;
}

export default function Layout(props: React.PropsWithChildren<ILayoutProps>) {
  const { logoOnly } = props;
  return (
    <Box backgroundColor="secondary" minHeight="100vh">
      <Box
        height="full"
        minHeight="100vh"
        backgroundImage="/img/background.png"
        backgroundRepeat="repeat"
      >
        <Header logoOnly={logoOnly} />
        <main>
          <Container maxWidth="1440px" paddingY={10}>
            <NotificationProvider>{props.children}</NotificationProvider>
          </Container>
        </main>
      </Box>
    </Box>
  );
}
