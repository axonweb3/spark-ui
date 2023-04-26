import classnames from 'classnames';
import React from 'react';

export interface IButtonProps {
  label: string;
  onClick?(): void;
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
    'min-w-[100px] rounded-[30px] border cursor-pointer',
    {
      // contained
      'bg-yellow-300 hover:bg-yellow-400 text-black border-grey-700': !disabled && variant === 'contained',
      'bg-grey-100 border-none': disabled && variant === 'contained',
      // outlined
      'bg-transparent hover:bg-yellow-200 text-yellow-800 border-[0.5px] border-grey-700': !disabled && variant === 'outlined',
      'bg-transparent border-grey-400': disabled && variant === 'outlined',
      // text
      'bg-transparent hover:bg-yellow-200 text-yellow-800 border-none': !disabled && variant === 'text',
      'bg-transparent': disabled && variant === 'text',
      // size
      'h-[30px] px-5 font-montserrat font-extrabold': size === 'small',
      'h-[40px] px-8 font-montserrat font-extrabold': size === 'medium',
      'h-[48px] px-9 font-alfarn-2 font-bold text-lg': size === 'large',
      // disabled
      'text-grey-400 cursor-not-allowed': disabled,
    },
  );

  return (
    <button type="button" className={classNames} onClick={onClick}>
      <div className="flex flex-row justify-center items-center">{label}</div>
    </button>
  );
}
