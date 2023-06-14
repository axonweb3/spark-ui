import { Box, Flex } from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';
import React from 'react';

export interface INavigationItem {
  name: string;
  href: string;
}

export interface INavigationProps {
  navs: INavigationItem[];
  direction?: 'row' | 'column';
  active?: string;
}

export default function Navigation(props: INavigationProps) {
  const { navs, active, direction } = props;

  return (
    <Flex
      alignItems="center"
      direction={direction ?? 'row'}
      sx={{
        '.active': {
          backgroundColor: 'brand',
          borderWidth: 1,
          borderColor: 'grey.700',
          borderRadius: 'md',
        },
      }}
    >
      {navs.map(({ name, href }, index) => {
        return (
          <Box
            key={name}
            paddingX="24px"
            paddingY="8px"
            marginRight={index !== navs.length - 1 ? '6px' : '0'}
            marginBottom={direction === 'column' ? '20px' : '0'}
            className={name === active ? 'active' : undefined}
          >
            <Link
              href={href}
              fontFamily="alfarn-2"
              fontSize="lg"
              fontWeight="bold"
              lineHeight="5"
              textTransform="capitalize"
              _hover={{ textDecoration: 'none' }}
            >
              {name}
            </Link>
          </Box>
        );
      })}
    </Flex>
  );
}
