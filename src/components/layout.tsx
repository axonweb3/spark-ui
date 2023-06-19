import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { NotificationProvider } from '@/hooks/ui/useNotification';
import BaseLayout from './base-layout';
import Sidebar from './sidebar';
import Header from './header';

export default function Layout(props: React.PropsWithChildren<{}>) {
  return (
    <BaseLayout>
      <Flex>
        <Box position="fixed" top="0">
          <Sidebar />
        </Box>
        <Box flexGrow="1" paddingY={10} marginLeft="240px">
          <Header />
          <Box width="1080px" marginX="auto">
            <NotificationProvider>{props.children}</NotificationProvider>
          </Box>
        </Box>
      </Flex>
    </BaseLayout>
  );
}
