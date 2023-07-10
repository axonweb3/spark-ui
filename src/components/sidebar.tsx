import { Box, Flex, Link, Spacer } from '@chakra-ui/react';
import Image from 'next/image';
import Navigation from './common/navigation';
import { useRouter } from 'next/router';
import { useConnect } from '@/hooks/useConnect';
import { useStakeRole } from '@/hooks/useStakeRole';
import { forwardRef, useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

const NAVS = [
  {
    name: 'Stake',
    href: '/stake',
  },
  {
    name: 'Delegate',
    href: '/delegate',
  },
  {
    name: 'Rewards',
    href: '/rewards',
  },
  {
    name: 'Explorer',
    href: '/explorer',
  },
];

const Sidebar: React.ForwardRefRenderFunction<HTMLDivElement, {}> = (
  _,
  ref,
) => {
  const router = useRouter();
  const { isConnected } = useConnect();
  const { isDelegator } = useStakeRole();
  const [navs, setNavs] = useState<typeof NAVS>([]);

  useEffect(() => {
    let finalNavs = NAVS;
    if (isDelegator) {
      finalNavs = finalNavs.filter(({ name }) => name !== 'Stake');
    }
    if (!isConnected) {
      finalNavs = finalNavs.filter(({ name }) => name !== 'Rewards');
    }
    setNavs(finalNavs);
  }, [isConnected, isDelegator]);

  const active = useMemo(() => {
    const nav = navs.find(({ href }) => router.pathname.startsWith(href));
    return nav?.name;
  }, [router.pathname, navs]);

  return (
    <Box height="100vh" minWidth="200px" maxWidth="240px" ref={ref}>
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
        <Flex direction="column" alignItems="center" grow={1}>
          <Navigation direction="column" navs={navs} active={active} />
          <Spacer />
          {navs.length > 0 && (
            <Box marginBottom="20px">
              <Link
                href="/?redirect=false"
                fontFamily="alfarn-2"
                fontSize="lg"
                fontWeight="bold"
                _hover={{ textDecoration: 'none' }}
              >
                Switch Role
              </Link>
            </Box>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default forwardRef(Sidebar);
