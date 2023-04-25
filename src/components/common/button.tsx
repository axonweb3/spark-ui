import classnames from 'classnames';
import React from 'react';

export interface IButtonProps {
  label: string;
  onClick(): void;
  variant?: 'text' | 'contained' | 'outlined';
  size?: 'small' | 'medium' | 'large';
  disable?: boolean;
}

export function Button(props: IButtonProps) {
  const {
    label,
    onClick,
    variant = 'contained',
    size = 'medium',
    disable = false,
  } = props;
  const classNames = classnames(
    'rounded-[30px] border border-[#1f1f1f] cursor-pointer',
    {
      /* variant */
      'bg-yellow-300': variant === 'contained',
      'bg-white':  variant === 'text' || variant === 'outlined',
      'border-none': variant === 'text',
      /* size */
      'h-[30px] px-5 font-montserrat font-extrabold': size === 'small',
      'h-[40px] px-8 font-montserrat font-extrabold': size === 'medium',
      'h-[48px] px-9 font-alfarn-2 font-bold text-lg': size === 'large',
      /* disable */
      'text-grey-400 cursor-not-allowed': disable,
      'bg-grey-100 border-none': disable && variant === 'contained',
      'border-grey-400': disable && variant === 'outlined',
      'hover:bg-yellow-400': !disable && variant === 'contained',
      'hover:bg-yellow-200': !disable && (variant === 'outlined' || variant === 'text')
    },
  );

  return (
    <button type="button" className={classNames} onClick={onClick}>
      <div className="flex flex-row items-center">{label}</div>
    </button>
  );
}
