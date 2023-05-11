import {
  Text,
  Box,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
} from '@chakra-ui/react';
import React, { ChangeEvent } from 'react';

export interface ITextFieldProps {
  value?: string;
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
        return 'grey.500';
    }
  }, [status]);

  return (
    <Box>
      <InputGroup size={size}>
        {props.leftAddon && <InputLeftAddon>{props.leftAddon}</InputLeftAddon>}
        <Input
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          type={type}
          borderColor={statusColor}
          borderWidth={status !== 'none' ? 2 : 1}
          disabled={disabled}
        />
        {props.rightAddon && (
          <InputRightAddon>{props.rightAddon}</InputRightAddon>
        )}
      </InputGroup>
      <Text color={statusColor} fontFamily="montserrat" fontSize="xs">
        {message}
      </Text>
    </Box>
  );
}
