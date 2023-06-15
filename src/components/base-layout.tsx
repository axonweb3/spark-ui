import React, { useMemo } from 'react';
import { Box, Container } from '@chakra-ui/react';
import { DialogProvider } from '@/hooks/ui/useDialog';
import { useStakeRole } from '@/hooks/useStakeRole';

export default function BaseLayout(props: React.PropsWithChildren<{}>) {
  const { isValidator } = useStakeRole();
  const backgroundColor= useMemo(() => isValidator ? "secondary" : "primary", [isValidator]);

  return (
    <DialogProvider>
      <Box backgroundColor={backgroundColor}>
        <Box
          backgroundImage="/img/background.png"
          backgroundSize="cover"
          backgroundRepeat="repeat"
          minHeight="100vh"
        >
          <main>
            <Container maxWidth="1440px">{props.children}</Container>
          </main>
        </Box>
      </Box>
    </DialogProvider>
  );
}
