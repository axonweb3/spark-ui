import React from 'react';
import { MdDone } from 'react-icons/md';
import { Text, Button, ButtonGroup, Box, SimpleGrid } from '@chakra-ui/react';
import { motion } from 'framer-motion';

export interface ISegmentedButtonProps {
  options: string[];
  value?: string;
  onChange?(value: string): void;
  defaultValue?: string;
  disabled?: boolean;
}

export default function SegmentedButton(props: ISegmentedButtonProps) {
  const { options, value, onChange, defaultValue, disabled } = props;
  const [active, setActive] = React.useState(
    value ?? defaultValue ?? options[0],
  );

  React.useEffect(() => {
    if (value !== undefined && value !== active) {
      setActive(value);
    }
  }, [value, active]);

  const handleClick = (option: string) => {
    setActive(option);
    onChange?.(option);
  };

  if (disabled) {
    return (
      <ButtonGroup spacing={0} width="100%">
        <SimpleGrid width="100%" columns={options.length}>
          {options.map((option: string, index: number) => (
            <Button
              key={option}
              opacity="0.5"
              borderLeftRadius={index === 0 ? '6px' : 'none'}
              borderRightRadius={index === options.length - 1 ? '6px' : 'none'}
              borderLeftWidth={index === 0 ? 1 : 0}
              backgroundColor="grey.100"
              _hover={{ backgroundColor: 'grey.100' }}
              paddingX={'5'}
              height="48px"
              cursor="not-allowed"
            >
              <Text fontFamily="montserrat" fontSize="md" fontWeight="medium">
                {option}
              </Text>
            </Button>
          ))}
        </SimpleGrid>
      </ButtonGroup>
    );
  }

  return (
    <ButtonGroup spacing={0} width="100%">
      <SimpleGrid width="100%" columns={options.length}>
        {options.map((option: string, index: number) => (
          <Button
            key={option}
            borderLeftRadius={index === 0 ? '6px' : 'none'}
            borderRightRadius={index === options.length - 1 ? '6px' : 'none'}
            borderLeftWidth={index === 0 ? 1 : 0}
            backgroundColor={option === active ? 'yellow.300' : 'transparent'}
            paddingX={option === active ? '7px' : '5'}
            height="48px"
            onClick={() => handleClick(option)}
            _hover={{
              backgroundColor: 'yellow.300',
            }}
          >
            {option === active && (
              <Box
                as={motion.div}
                initial={{ opacity: 0, x: -5 }}
                whileInView={{ opacity: 1, x: 0 }}
                width="18px"
                height="18px"
                marginRight="1"
              >
                <MdDone />
              </Box>
            )}
            <Text fontFamily="montserrat" fontSize="md" fontWeight="medium">
              {option}
            </Text>
          </Button>
        ))}
      </SimpleGrid>
    </ButtonGroup>
  );
}
