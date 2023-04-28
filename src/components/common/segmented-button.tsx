import React from 'react';
import { Root, Item } from '@radix-ui/react-toggle-group';
import classnames from 'classnames';
import { MdDone } from 'react-icons/md';

export interface ISegmentedButtonProps {
  options: string[];
  value: string;
  onChange(value: string): void;
  defaultValue?: string;
  disabled?: boolean;
}

export function SegmentedButton(props: ISegmentedButtonProps) {
  const { options, value, onChange, defaultValue, disabled = false } = props;
  const [active, setActive] = React.useState(defaultValue);

  React.useEffect(() => {
    if (value !== undefined) {
      setActive(value);
    }
  }, [value]);

  React.useEffect(() => {
    if (active !== undefined) {
      onChange(active);
    }
  }, [active, onChange]);

  const getClassNames = React.useCallback(
    (val: string, index: number) => {
      const classNames = classnames(
        'flex-1 max-w-[100px] flex flex-row items-center justify-center h-12 font-montserrat font-medium border',
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
      className="inline"
      defaultValue={defaultValue}
      value={value}
    >
      <div className="flex flex-row">
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
