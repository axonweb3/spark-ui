import React, { useEffect, useMemo, useRef } from 'react';
import * as Plot from '@observablehq/plot';
import { Text, Box, Flex } from '@chakra-ui/react';
import Card from '../common/card';
import { useStakeRole } from '@/hooks/useStakeRole';
import { usePaginatedAtomQuery } from '@/hooks/query/usePaginatedAtomQuery';
import { statsAmountByEpochAtom } from '@/state/query/stats';

export function OverviewChart() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { isDelegator } = useStakeRole();
  const backgroundColor = useMemo(
    () => (isDelegator ? 'secondary' : 'primary'),
    [isDelegator],
  );
  const { data } = usePaginatedAtomQuery(statsAmountByEpochAtom);
  console.log(data);

  useEffect(() => {
    if (data === undefined || containerRef.current === null) {
      return;
    }
    const plot = Plot.plot({
      style: { backgroundColor: 'transparent' },
      color: { legend: true },
      y: {
        label: 'Token (%)',
        percent: true,
      },
      marks: [
        Plot.areaY(
          data,
          Plot.stackY(
            { offset: 'normalize', order: 'type', reverse: true },
            { x: 'epoch', y: 'amount', fill: 'type' },
          ),
        ),
        Plot.ruleY([0, 1]),
      ],
    });
    containerRef.current!.append(plot);
    return () => plot.remove();
  }, [data]);

  return (
    <Box width="full">
      <Card backgroundColor={backgroundColor}>
        <Flex direction="column" justifyContent="space-between">
          <Text
            fontFamily="alfarn-2"
            fontSize="18px"
            fontWeight="semibold"
            marginX="-12px"
            marginBottom="30px"
          >
            Staking & Delegation Overview
          </Text>
          <Box marginX="-35px">
            <Box
              ref={containerRef}
              paddingY="18px"
              sx={{
                'svg[class^="plot-"] + div': {
                  marginLeft: '10px',
                },
              }}
            />
          </Box>
        </Flex>
      </Card>
    </Box>
  );
}
