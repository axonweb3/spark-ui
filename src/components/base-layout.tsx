import React, { useMemo } from 'react';
import { Box, Container } from '@chakra-ui/react';
import { DialogProvider } from '@/hooks/ui/useDialog';
import { useStakeRole } from '@/hooks/useStakeRole';

export default function BaseLayout(props: React.PropsWithChildren<object>) {
  const { isDelegator } = useStakeRole();
  const backgroundColor = useMemo(() => (isDelegator ? 'primary' : 'secondary'), [isDelegator]);

  return (
    <DialogProvider>
      <Box backgroundColor={backgroundColor}>
        <Box
          backgroundImage="/img/background.png"
          backgroundSize="cover"
          backgroundRepeat="repeat"
          backgroundAttachment="fixed"
          minHeight="100vh"
        >
          <main>
            <Container padding={0} maxWidth="1440px">
              {props.children}
            </Container>
          </main>
        </Box>
      </Box>
    </DialogProvider>
  );
}
