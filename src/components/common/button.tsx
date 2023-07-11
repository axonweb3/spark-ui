import React, { useMemo } from 'react';
import { Button as ChakraButton, ButtonProps as ChakraButtonProps } from '@chakra-ui/react';

export interface IButtonProps extends React.PropsWithChildren {
  variant?: 'contained' | 'outlined' | 'text' | 'hovertext';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  isLoading?: boolean;
  onClick?(): void;
}

export default function Button(props: IButtonProps & ChakraButtonProps) {
  const { size, disabled, onClick, children, isLoading, ...restProps } = props;
  const variant = useMemo(
    () => (disabled ? `${props.variant ?? 'contained'}_disabled` : props.variant),
    [props.variant, disabled],
  );

  return (
    <ChakraButton
      {...restProps}
      variant={variant ?? 'contained'}
      size={size ?? 'md'}
      disabled={disabled}
      onClick={() => !disabled && onClick?.()}
      isLoading={isLoading}
    >
      {children}
    </ChakraButton>
  );
}
