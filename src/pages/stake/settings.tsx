import * as cookie from 'cookie';
import React, { useCallback, useEffect, useMemo } from 'react';
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
import { MdCheckBox, MdOutlineCheckBoxOutlineBlank } from 'react-icons/md';
import TextField from '@/components/common/text-field';
import { useRouter } from 'next/router';
import { SPARK_ROLE_KEY } from '@/consts';
import InputField from '@/components/input-filed';
import { useConnect } from '@/hooks/useConnect';
import { ConnectButton } from '@/components/connect-button';
import { rateAtom } from '@/state/query/rate';
import { useAtomValue } from 'jotai';
import { loadable } from 'jotai/utils';
import { useAlert } from '@/hooks/ui/useAlert';

export function getServerSideProps(context: NextPageContext) {
  const cookies = cookie.parse(context.req?.headers.cookie ?? '');
  const { redirect } = context.query;

  if (redirect === 'false') {
    return {
      props: {},
    };
  }

  if (cookies[SPARK_ROLE_KEY] !== StakeRoleType.Validator) {
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
  const { address, isConnected, isDisconnected } = useConnect();
  const [showAlert, setShowAlert] = useAlert('settings');
  const [dialogCheckbox, setDialogCheckbox] = React.useState(false);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const rateQuery = useAtomValue(loadable(rateAtom(address)));
  const isLoading = useMemo(() => rateQuery.state === 'loading', [rateQuery]);
  const [rate, setRate] = React.useState(0);
  const [minAmount, setMinAmount] = React.useState(0);

  useEffect(() => {
    if (rateQuery.state === 'hasData') {
      setRate(rateQuery.data?.rate ?? 0);
      setMinAmount(rateQuery.data?.minimumAmount ?? 0);
    }
  }, [rateQuery]);

  useEffect(() => {
    if (showAlert) {
      setIsDialogOpen(true);
    }
  }, [showAlert, setShowAlert]);

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
        {isLoading ? <Spinner size="sm" /> : <Text>%</Text>}
      </Flex>
    ),
    [isLoading],
  );

  const handleMiniumnAmountChange = useCallback((amount: string) => {
    const [int, dec] = amount.split('.');
    const newAmount = `${int}${dec ? `.${dec}` : ''}`;
    setMinAmount(parseFloat(newAmount));
  }, []);

  return (
    <Layout>
      <Card
        title={
          <Text fontFamily="alfarn-2" fontSize="18px" fontWeight="semibold">
            Commission Rate
          </Text>
        }
      >
        <Box marginTop="55px" marginX="32px">
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
          <Flex width="full" alignItems="center" gap="8" marginBottom="80px">
            <Box width="100px">
              <TextField
                value={rate}
                borderColor="gray.700"
                type="number"
                onChange={(val) => {
                  setRate(Math.min(parseInt(val || '0', 10), 100));
                }}
                rightAddon={isConnected && inputAddon}
                disabled={isDisconnected}
              />
            </Box>
            <Box flexGrow="1">
              <Slider
                value={rate}
                onChange={(val) => isConnected && setRate(val)}
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
                <SliderThumb
                  height="24px"
                  width="24px"
                  borderRadius="3px"
                  backgroundColor="#44403D"
                >
                  <Box
                    height="10px"
                    width="10px"
                    backgroundColor="white"
                    borderRadius="full"
                  />
                </SliderThumb>
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
                rightAddon={isConnected && inputAddon}
                disabled={isDisconnected}
              />
            </Box>
          </Flex>
          <InputField
            label="Minimum Amount"
            width="715px"
            type="number"
            value={minAmount}
            onChange={handleMiniumnAmountChange}
            disabled={isDisconnected}
            rightAddon={
              !isDisconnected && (
                <Flex
                  width={16}
                  height="full"
                  backgroundColor="secondary"
                  alignItems="center"
                  justifyContent="center"
                  borderRightRadius="6px"
                  paddingX={2}
                >
                  {isLoading ? <Spinner /> : <Text>AT</Text>}
                </Flex>
              )
            }
          />
        </Box>
        <Flex justifyContent="center" paddingTop="60px" marginBottom={10}>
          <ConnectButton
            size="lg"
            disabled={isDisconnected}
            onClick={() => router.push('/stake')}
          >
            Submit
          </ConnectButton>
        </Flex>
      </Card>
      <Dialog
        open={isDialogOpen}
        description="Before you start, please set Commission Rate first."
        footer={
          <Flex width="full">
            <Flex
              alignItems="center"
              cursor="pointer"
              onClick={() => setDialogCheckbox(!dialogCheckbox)}
            >
              <Flex
                width={6}
                height={6}
                marginRight={1}
                alignItems="center"
                justifyContent="center"
              >
                <Icon
                  as={
                    dialogCheckbox ? MdCheckBox : MdOutlineCheckBoxOutlineBlank
                  }
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
                  setShowAlert(!dialogCheckbox);
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
