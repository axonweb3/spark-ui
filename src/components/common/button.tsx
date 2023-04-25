import classnames from 'classnames';
import React from 'react';

export interface IButtonProps {
  label: string;
  onClick(): void;
  variant?: 'text' | 'contained' | 'outlined';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

export function Button(props: IButtonProps) {
  const {
    label,
    onClick,
    variant = 'contained',
    size = 'medium',
    disabled = false,
  } = props;
  const classNames = classnames(
    'rounded-[30px] border border-grey-700 cursor-pointer',
    {
      /* variant */
      'bg-yellow-300': variant === 'contained',
      'bg-white':  variant === 'text' || variant === 'outlined',
      'border-none': variant === 'text',
      /* size */
      'h-[30px] px-5 font-montserrat font-extrabold': size === 'small',
      'h-[40px] px-8 font-montserrat font-extrabold': size === 'medium',
      'h-[48px] px-9 font-alfarn-2 font-bold text-lg': size === 'large',
      /* disabled */
      'text-grey-400 cursor-not-allowed': disabled,
      'bg-grey-100 border-none': disabled && variant === 'contained',
      'border-grey-400': disabled && variant === 'outlined',
      'hover:bg-yellow-400': !disabled && variant === 'contained',
      'hover:bg-yellow-200': !disabled && (variant === 'outlined' || variant === 'text')
    },
  );

  return (
    <button type="button" className={classNames} onClick={onClick}>
      <div className="flex flex-row items-center">{label}</div>
    </button>
  );
}
