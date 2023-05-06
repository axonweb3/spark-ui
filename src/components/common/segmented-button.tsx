import React from 'react';
import { Root, Item } from '@radix-ui/react-toggle-group';
import classnames from 'classnames';
import { MdDone } from 'react-icons/md';

export interface ISegmentedButtonProps {
  options: string[];
  value?: string;
  onChange?(value: string): void;
  defaultValue?: string;
  disabled?: boolean;
}

export function SegmentedButton(props: ISegmentedButtonProps) {
  const { options, value, onChange, defaultValue, disabled = false } = props;
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

  const getClassNames = React.useCallback(
    (val: string, index: number) => {
      const classNames = classnames(
        'h-12 flex flex-row items-center justify-center font-montserrat font-medium border',
        {
          'bg-yellow-300 px-[7px]': val === active,
          'hover:bg-yellow-100 px-5': val !== active,
          /* border */
          'border-grey-700 text-black': !disabled,
          'border-grey-200 text-grey-500': disabled,
          'rounded-l-lg': index === 0,
          'border-l-0': index !== 0,
          'rounded-r-lg': index === options.length - 1,
        },
      );
      return classNames;
    },
    [active, options, disabled],
  );

  return (
    <Root
      type="single"
      defaultValue={defaultValue}
      className="w-full"
      value={value}
    >
      <div className={`grid grid-cols-5`}>
        {options.map((option: string, index: number) => (
          <Item
            key={option}
            value={option}
            disabled={disabled}
            className={getClassNames(option, index)}
            onClick={() => setActive(option)}
          >
            {option === active && <MdDone className="w-[18px] h-[18px] mr-2" />}
            {option}
          </Item>
        ))}
      </div>
    </Root>
  );
}
