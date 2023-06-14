import React from 'react';
import { Box, Container, Flex } from '@chakra-ui/react';
import { NotificationProvider } from '@/hooks/ui/useNotification';
import { DialogProvider } from '@/hooks/ui/useDialog';
import { Sidebar } from './sidebar';
import Header from './header';
import { useStakeRole } from '@/hooks/useStakeRole';

export default function Layout(props: React.PropsWithChildren<{}>) {
  const { isValidator } = useStakeRole();
  return (
    <DialogProvider>
      <Box backgroundColor={isValidator ? 'secondary' : 'primary'}>
        <Box
          backgroundImage="/img/background.png"
          backgroundSize="cover"
          backgroundRepeat="repeat"
          minHeight="100vh"
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
