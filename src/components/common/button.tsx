import React, { useMemo } from 'react';
import { ButtonProps as ChakraButtonProps, Button as ChakraButton } from '@chakra-ui/react';

export interface IButtonProps extends React.PropsWithChildren {
  variant?: 'contained' | 'outlined' | 'text';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?(): void;
}

export default function Button(props: IButtonProps & ChakraButtonProps) {
  const { size, disabled, onClick, children, ...restProps } = props;
  const variant = useMemo(
    () => (disabled ? `${props.variant}_disabled` : props.variant),
    [props.variant, disabled],
  );

  return (
    <ChakraButton
      {...restProps}
      variant={variant ?? 'contained'}
      size={size ?? 'md'}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </ChakraButton>
  );
}
