import React from 'react';
import { MdDone } from 'react-icons/md';
import { Text, Button, ButtonGroup, Box } from '@chakra-ui/react';

export interface ISegmentedButtonProps {
  options: string[];
  value?: string;
  onChange?(value: string): void;
  defaultValue?: string;
}

export default function SegmentedButton(props: ISegmentedButtonProps) {
  const { options, value, onChange, defaultValue } = props;
  const [active, setActive] = React.useState(defaultValue ?? options[0]);

  React.useEffect(() => {
    if (value !== undefined) {
      setActive(value);
    }
  }, [value]);

  React.useEffect(() => {
    if (active !== undefined) {
      onChange?.(active);
    }
  }, [active, onChange]);

  return (
    <ButtonGroup spacing={0} width="100%">
      {options.map((option: string, index: number) => (
        <Button
          key={option}
          borderLeftRadius={index === 0 ? '6px' : 'none'}
          borderRightRadius={index === options.length - 1 ? '6px' : 'none'}
          borderLeftWidth={index === 0 ? 1 : 0}
          backgroundColor={option === active ? 'yellow.300' : 'transparent'}
          paddingX={option === active ? '7px' : '5'}
          minWidth="100px"
          _hover={{ backgroundColor: 'yellow.300' }}
          onClick={() => setActive(option)}
        >
          {option === active && (
            <Box width="18px" height="18px" marginRight="1">
              <MdDone />
            </Box>
          )}
          <Text fontFamily="montserrat" fontSize="md" fontWeight="medium">
            {option}
          </Text>
        </Button>
      ))}
    </ButtonGroup>
  );
}
