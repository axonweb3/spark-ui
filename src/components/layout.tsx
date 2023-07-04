import React, { useEffect, useRef } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { NotificationProvider } from '@/hooks/ui/useNotification';
import BaseLayout from './base-layout';
import { motion } from 'framer-motion';
import Sidebar from './sidebar';
import Header from './header';

export default function Layout(props: React.PropsWithChildren<{}>) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [sidebarWidth, setSidebarWidth] = React.useState(0);

  useEffect(() => {
    const width = sidebarRef.current?.offsetWidth ?? 240;
    setSidebarWidth(width);
  }, []);

  return (
    <BaseLayout>
      <Flex>
        <Box position="fixed" top="0">
          <Sidebar ref={sidebarRef} />
        </Box>
        {sidebarWidth !== 0 && (
          <Box
            as={motion.div}
            flexGrow="1"
            paddingY={10}
            marginLeft={`${sidebarWidth}px`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <Header />
            <Box maxWidth="1080px" marginX="auto" paddingX={4}>
              <NotificationProvider>{props.children}</NotificationProvider>
            </Box>
          </Box>
        )}
      </Flex>
    </BaseLayout>
  );
}
