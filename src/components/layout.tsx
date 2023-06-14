import React from 'react';
import { Box, Container, Flex } from '@chakra-ui/react';
import { NotificationProvider } from '@/hooks/ui/useNotification';
import { DialogProvider } from '@/hooks/ui/useDialog';
import { Sidebar } from './sidebar';
import Header from './header';

export interface ILayoutProps {
  logoOnly?: boolean;
}

export default function Layout(props: React.PropsWithChildren<ILayoutProps>) {
  return (
    <DialogProvider>
      <Box backgroundColor="secondary">
        <Box
          backgroundImage="/img/background.png"
          backgroundSize="cover"
          backgroundRepeat="repeat"
        >
          <main>
            <Container maxWidth="1440px">
              <Flex>
                <Box position="fixed" top="0">
                  <Sidebar />
                </Box>
                <Box flexGrow="1" paddingY={10} marginLeft="240px">
                  <Header />
                  <Box width="1080px" marginX="auto">
                    <NotificationProvider>
                      {props.children}
                    </NotificationProvider>
                  </Box>
                </Box>
              </Flex>
            </Container>
          </main>
        </Box>
      </Box>
    </DialogProvider>
  );
}
