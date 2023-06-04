import * as cookie from 'cookie';
import { useStakeRate } from '@/hooks/useStakeRate';
import { useConnect } from '@spinal-ckb/react';
import React, { useEffect, useMemo } from 'react';
import {
  Box,
  Flex,
  Icon,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Spacer,
  Spinner,
  Text,
} from '@chakra-ui/react';
import Layout from '@/components/layout';
import Card from '@/components/common/card';
import { NextPageContext } from 'next';
import { StakeRoleType } from '@/hooks/useStakeRole';
import Button from '@/components/common/button';
import Dialog from '@/components/common/dialog';
import { MdOutlineCheckBoxOutlineBlank } from 'react-icons/md';
import TextField from '@/components/common/text-field';
import { useRouter } from 'next/router';

export function getServerSideProps(context: NextPageContext) {
  const cookies = cookie.parse(context.req?.headers.cookie ?? '');

  if (cookies.role !== StakeRoleType.Validator) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
      props: {},
    };
  }

  return {
    props: {},
  };
}

export default function SettingsPage() {
  const router = useRouter();
  const { address, connected } = useConnect();
  const [isDialogOpen, setIsDialogOpen] = React.useState(true);
  const { stakeRate, isSuccess, isLoading } = useStakeRate(address);
  const [rate, setRate] = React.useState(stakeRate ?? 0);

  useEffect(() => {
    if (isSuccess) {
      setRate(stakeRate ?? 0);
    }
  }, [isSuccess, stakeRate]);

  const inputAddon = useMemo(
    () => (
      <Flex
        width={8}
        height="full"
        backgroundColor="secondary"
        alignItems="center"
        justifyContent="center"
        borderRightRadius="6px"
        paddingX={2}
      >
        {isLoading ? <Spinner /> : <Text>%</Text>}
      </Flex>
    ),
    [isLoading],
  );

  return (
    <Layout>
      <Card
        title={
          <Text fontFamily="alfarn-2" fontSize="18px" fontWeight="semibold">
            Commission Rate
          </Text>
        }
      >
        <Box marginY="70px">
          <Flex width="full" marginBottom="20px">
            <Flex width="100px">
              <Text fontFamily="montserrat" fontWeight="bold">
                Staking
              </Text>
            </Flex>
            <Spacer />
            <Flex width="100px">
              <Text fontFamily="montserrat" fontWeight="bold">
                Delegation
              </Text>
            </Flex>
          </Flex>
          <Flex width="full" alignItems="center" gap="8">
            <Box width="100px">
              <TextField
                value={rate}
                borderColor="gray.700"
                type="number"
                onChange={(val) => {
                  setRate(Math.min(parseInt(val || '0', 10), 100));
                }}
                rightAddon={inputAddon}
                disabled={!connected}
              />
            </Box>
            <Box flexGrow="1">
              <Slider
                value={rate}
                onChange={(val) => connected && setRate(val)}
                focusThumbOnChange={false}
              >
                <SliderTrack
                  backgroundColor="gray.300"
                  height="8px"
                  borderRadius="5px"
                  borderWidth="0.5px"
                  borderColor="black"
                >
                  <SliderFilledTrack backgroundColor="yellow.300" />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </Box>
            <Box width="100px">
              <TextField
                value={100 - rate}
                borderColor="gray.700"
                type="number"
                onChange={(val) => {
                  setRate(100 - Math.min(parseInt(val || '0', 10), 100));
                }}
                rightAddon={inputAddon}
                disabled={!connected}
              />
            </Box>
          </Flex>
        </Box>
        <Flex justifyContent="center" paddingTop="60px" marginBottom={10}>
          <Button
            size="lg"
            disabled={!connected}
            onClick={() => router.push('/stake')}
          >
            Submit
          </Button>
        </Flex>
      </Card>
      <Dialog
        open={isDialogOpen}
        description="Before you start, please set Commission Rate first."
        footer={
          <Flex width="full">
            <Flex alignItems="center" cursor="pointer">
              <Flex
                width={6}
                height={6}
                marginRight={1}
                alignItems="center"
                justifyContent="center"
              >
                <Icon
                  as={MdOutlineCheckBoxOutlineBlank}
                  width="18px"
                  height="18px"
                  fill="blue.400"
                />
              </Flex>
              <Text fontSize="sm" color="blue.400">
                Do not show again
              </Text>
            </Flex>
            <Spacer />
            <Flex>
              <Button
                variant="contained"
                size="sm"
                onClick={() => {
                  setIsDialogOpen(false);
                }}
              >
                Got it
              </Button>
            </Flex>
          </Flex>
        }
      />
    </Layout>
  );
}
