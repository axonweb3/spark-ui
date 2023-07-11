import { Box, Input, InputGroup, InputLeftAddon, InputProps, InputRightAddon, Text } from '@chakra-ui/react';
import React, { ChangeEvent, useMemo } from 'react';

export interface ITextFieldProps extends Omit<InputProps, 'onChange'> {
  value?: string | number;
  onChange?(value: string): void;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  type?: string;
  message?: string;
  status?: 'none' | 'warning' | 'error';
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
  disabled?: boolean;
}

export default function TextField(props: ITextFieldProps) {
  const {
    value,
    onChange,
    placeholder,
    type = 'text',
    size = 'md',
    message,
    status,
    disabled,
    leftAddon,
    rightAddon,
    ...inputProps
  } = props;

  const handleChange = React.useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const val = event.target.value;
      onChange?.(val);
    },
    [onChange],
  );

  const statusColor = React.useMemo(() => {
    switch (status) {
      case 'warning':
        return 'yellow.400';
      case 'error':
        return 'orange.500';
      default:
        return 'grey.700';
    }
  }, [status]);

  const borderWidth = useMemo(() => (status === 'warning' || status === 'error' ? 2 : 1), [status]);

  return (
    <Box>
      <InputGroup size={size}>
        {leftAddon && (
          <InputLeftAddon
            padding={0}
            backgroundColor="transparent"
            borderColor={statusColor}
            borderWidth={borderWidth}
            borderLeftRadius="6px"
          >
            {leftAddon}
          </InputLeftAddon>
        )}
        <Input
          {...inputProps}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          type={type}
          borderColor={statusColor}
          borderWidth={borderWidth}
          backgroundColor="white"
          disabled={disabled}
          _focusVisible={{
            boxShadow: 'none',
          }}
          _hover={{
            boxShadow: 'none',
          }}
        />
        {rightAddon && (
          <InputRightAddon
            padding={0}
            backgroundColor="transparent"
            borderColor={statusColor}
            borderWidth={borderWidth}
            borderRightRadius="6px"
          >
            {rightAddon}
          </InputRightAddon>
        )}
      </InputGroup>
      <Text color={statusColor} fontFamily="montserrat" fontSize="xs">
        {message}
      </Text>
    </Box>
  );
}
