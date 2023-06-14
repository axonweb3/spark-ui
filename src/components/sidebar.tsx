import { Box, Flex, Spacer, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Navigation from './common/navigation';
import { useRouter } from 'next/router';
import { useConnect } from '@/hooks/useConnect';
import { StakeRoleType, useStakeRole } from '@/hooks/useStakeRole';
import allNavs from '@/navs';
import { useMemo } from 'react';

export function Sidebar() {
  const router = useRouter();
  const { isConnected } = useConnect();
  const { role } = useStakeRole();

  const navs = useMemo(() => {
    if (role === StakeRoleType.Delegator) {
      return allNavs.filter(({ name }) => name !== 'Stake');
    }
    if (!isConnected) {
      return allNavs.filter(({ name }) => name !== 'Rewards');
    }
    return allNavs;
  }, [role, isConnected]);

  const active = useMemo(() => {
    const nav = navs.find(({ href }) => router.pathname.startsWith(href));
    return nav?.name;
  }, [router.pathname, navs]);

  return (
    <Box height="100vh" width="240px">
      <Flex
        direction="column"
        alignItems="center"
        height="full"
        borderRightColor="yellow.800"
        borderRightWidth="1px"
        paddingY={10}
      >
        <Box marginBottom="90px">
          <Image src="/img/logo.webp" alt="spark" width={135} height={70} />
        </Box>
        <Navigation direction="column" navs={navs} active={active} />
        <Spacer />
        <Box marginBottom="20px">
          <Text fontFamily="alfarn-2" fontSize="lg" fontWeight="bold">
            Switch Role
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}
