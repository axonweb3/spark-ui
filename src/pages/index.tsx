import React from 'react';
import * as cookie from 'cookie';
import Layout from '@/components/layout';
import { Text, Box, Flex, SimpleGrid } from '@chakra-ui/react';
import Card from '@/components/common/card';
import Button from '@/components/common/button';
import { StakeRoleType, useStakeRole } from '@/hooks/useStakeRole';
import { NextPageContext } from 'next';

export function getServerSideProps(context: NextPageContext) {
  if (context.query.redirect === 'false') {
    return {
      props: {},
    };
  }
  const cookies = cookie.parse(context.req?.headers.cookie ?? '');

  switch (cookies.role) {
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

  return (
    <Layout>
      <Flex justifyContent="center" marginBottom="100px">
        <Text fontSize="36px" fontFamily="alfarn-2" fontWeight="bold">
          New to Axon?
        </Text>
      </Flex>
      <SimpleGrid
        width="100%"
        maxWidth="800px"
        marginX="auto"
        columns={2}
        gap="30px"
      >
        <Box width="full" height="210px">
          <Card>
            <Box marginX="-24px">
              <Text
                fontSize="22px"
                fontFamily="alfarn-2"
                fontWeight="bold"
                marginBottom="24px"
              >
                I want to be a validator
              </Text>
              <Text
                fontSize="14px"
                fontFamily="montserrat"
                marginBottom="24px"
                lineHeight="shorter"
              >
                A validator is a participant responsible for validating and
                confirming transactions, block packaging, and maintaining
                network security.
              </Text>
              <Flex justifyContent="center">
                <Button size="sm" onClick={() => beValidator()}>
                  {"Let's Go"}
                </Button>
              </Flex>
            </Box>
          </Card>
        </Box>
        <Box width="full" height="210px">
          <Card>
            <Box marginX="-24px">
              <Text
                fontSize="22px"
                fontFamily="alfarn-2"
                fontWeight="bold"
                marginBottom="24px"
              >
                I want to be a delegator
              </Text>
              <Text
                fontSize="14px"
                fontFamily="montserrat"
                marginBottom="24px"
                lineHeight="shorter"
              >
                A delegator refers to an individual or entity in a decentralized
                network who entrusts their voting or staking power to a
                validator.
              </Text>
              <Flex justifyContent="center">
                <Button size="sm" onClick={() => beDelegator()}>
                  {"Let's Go"}
                </Button>
              </Flex>
            </Box>
          </Card>
        </Box>
      </SimpleGrid>
    </Layout>
  );
}
