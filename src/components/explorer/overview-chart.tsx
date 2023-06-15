import React, { useEffect, useMemo, useRef } from 'react';
import * as Plot from '@observablehq/plot';
import { Text, Box, Flex } from '@chakra-ui/react';
import Card from '../common/card';
import { useStakeRole } from '@/hooks/useStakeRole';
import { IStakeAmountByEpoch } from '@/hooks/query/useStakeStatsQuery';

export interface IOverviewChartProps {
  dataSource:IStakeAmountByEpoch[];
}

export function OverviewChart(props: IOverviewChartProps) {
  const { dataSource } = props;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { isDelegator } = useStakeRole();
  const backgroundColor = useMemo(
    () => (isDelegator ? 'secondary' : 'primary'),
    [isDelegator],
  );

  useEffect(() => {
    if (dataSource === undefined || containerRef.current === null) {
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
          dataSource,
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
  }, [dataSource]);

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
