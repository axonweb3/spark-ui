import React, { useMemo } from 'react';
import Image from 'next/image';
import * as cookie from 'cookie';
import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import Card from '@/components/common/card';
import Button from '@/components/common/button';
import { StakeRoleType, useStakeRole } from '@/hooks/useStakeRole';
import { NextPageContext } from 'next';
import { NotificationProvider } from '@/hooks/ui/useNotification';
import BaseLayout from '@/components/base-layout';
import { SPARK_ROLE_KEY } from '@/consts';

export function getServerSideProps(context: NextPageContext) {
  if (context.query.redirect === 'false') {
    return {
      props: {},
    };
  }
  const cookies = cookie.parse(context.req?.headers.cookie ?? '');

  switch (cookies[SPARK_ROLE_KEY]) {
    case StakeRoleType.Validator:
      return {
        redirect: {
          permanent: false,
          destination: '/stake',
        },
        props: {},
      };
    case StakeRoleType.Delegator:
      return {
        redirect: {
          permanent: false,
          destination: '/delegate',
        },
        props: {},
      };
    default:
      return {
        props: {},
      };
  }
}

export default function IndexPage() {
  const { beValidator, beDelegator } = useStakeRole();

  const roles = useMemo(
    () => [
      {
        title: 'I want to be a validator',
        description:
          'A validator is a participant responsible for validating and confirming transactions, block packaging, and maintaining network security.',
        action: beValidator,
      },
      {
        title: 'I want to be a Delegator',
        description:
          'A delegator refers to an individual or entity in a decentralized network who entrusts their voting or staking power to a validator.',
        action: beDelegator,
      },
    ],
    [beValidator, beDelegator],
  );

  return (
    <BaseLayout>
      <Flex justifyContent="center">
        <Box width="1300px" paddingTop="8px" marginBottom="90px">
          <Image src="/img/logo.webp" alt="spark" width={135} height={70} />
        </Box>
      </Flex>
      <Box width="1080px" marginX="auto">
        <NotificationProvider>
          <Flex justifyContent="center" marginBottom="100px">
            <Text fontSize="36px" fontFamily="alfarn-2" fontWeight="bold">
              New to Axon Staking
            </Text>
            <Text fontSize="36px" marginLeft={2} fontFamily="montserrat" fontWeight="bold">
              ?
            </Text>
          </Flex>
          <SimpleGrid width="100%" maxWidth="800px" marginX="auto" columns={2} gap="55px">
            {roles.map(({ title, description, action }) => (
              <Box width="full" height="210px" key={title}>
                <Card>
                  <Box marginX="-24px" paddingY="4px">
                    <Text fontSize="22px" fontFamily="alfarn-2" fontWeight="bold" marginBottom="24px">
                      {title}
                    </Text>
                    <Text fontSize="14px" fontFamily="montserrat" marginBottom="24px" lineHeight="shorter">
                      {description}
                    </Text>
                    <Flex justifyContent="center">
                      <Button size="sm" onClick={() => action()}>
                        {"Let's Go"}
                      </Button>
                    </Flex>
                  </Box>
                </Card>
              </Box>
            ))}
          </SimpleGrid>
        </NotificationProvider>
      </Box>
    </BaseLayout>
  );
}
