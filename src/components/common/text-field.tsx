import React from 'react';
import { Root, Field, Label, Control, Message } from '@radix-ui/react-form';
import classnames from 'classnames';
import { ChangeEvent } from 'react';

export interface ITextFieldProps {
  name: string;
  value?: string;
  onChange?(value: string): void;
  placeholder?: string;
  size?: 'small' | 'medium' | 'large';
  type?: string;
  label?: string;
  message?: string;
  state?: 'normal' | 'warning' | 'error';
  left?: React.ReactNode;
  right?: React.ReactNode;
  disabled?: boolean;
}

export function TextField(props: ITextFieldProps) {
  const {
    name,
    label,
    value,
    onChange,
    placeholder,
    type = 'text',
    size = 'medium',
    message,
    state,
    disabled,
  } = props;

  const [text, setText] = React.useState(value ?? '');

  React.useEffect(() => {
    if (value) {
      setText(value);
    }
  }, [value]);

  const handleChange = React.useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const val = event.target.value;
      setText(val);
      onChange?.(val);
    },
    [onChange],
  );

  const sizeClassNames = React.useMemo(() => {
    return classnames({
      'h-[30px] min-w-[180px]': size === 'small',
      'h-[40px] min-w-[210px]': size === 'medium',
      'h-[48px] min-w-[260px]': size === 'large',
    });
  }, [size]);

  const backgroundClassNames = React.useMemo(() => {
    return classnames({
      'bg-white': !disabled,
      'bg-grey-100': disabled,
    });
  }, [disabled]);

  const borderClassName = React.useMemo(() => {
    return classnames({
      'border-grey-700': disabled || state === 'normal',
      'border-yellow-400 border-[1.5px]': !disabled && state === 'warning',
      'border-orange-500 border-[1.5px]': !disabled && state === 'error',
    });
  }, [state, disabled]);

  const paddingClassNames = React.useMemo(() => {
    return classnames({
      'px-[8px] py-[7px]': size === 'small',
      'px-[8px] py-[10px]': size === 'medium',
      'px-[14px] py-[12px]': size === 'large',
    });
  }, [size]);

  const placeholderClassNames = React.useMemo(() => {
    return classnames('placeholder-grey-500 font-montserrat', {
      'text-xs': size === 'small',
      'text-sm': size === 'medium',
      'text-base': size === 'large',
    });
  }, [size]);

  const messageClassNames = React.useMemo(() => {
    return classnames('font-montserrat text-xs ', {
      'text-black': !disabled && state !== 'error',
      'text-orange-400': !disabled && state === 'error',
      'text-grey-500': disabled,
    });
  }, [disabled, state]);

  return (
    <Root>
      <Field name={name} className={`inline-block ${sizeClassNames}`}>
        {label && <Label>{label}</Label>}
        <div
          className={`flex flex-row items-center w-full h-full border rounded-[6px] ${borderClassName}`}
        >
          {props.left}
          <Control className="h-full focus:outline-none rounded-[6px]" asChild>
            <input
              value={text}
              onChange={handleChange}
              placeholder={placeholder}
              className={`${paddingClassNames} ${placeholderClassNames} ${backgroundClassNames}`}
              type={type}
            />
          </Control>
          {props.right}
        </div>
        {message && <Message className={messageClassNames}>{message}</Message>}
      </Field>
    </Root>
  );
}
