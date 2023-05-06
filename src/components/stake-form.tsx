import React from 'react';
import * as Form from '@radix-ui/react-form';
import { TextField } from './common/text-field';
import { SegmentedButton } from './common/segmented-button';

const AMOUNT_OPTIONS = ['25%', '50%', '75%', '100%', 'Custom'];

export function StakeForm() {
  const [option, setOption] = React.useState(AMOUNT_OPTIONS[0]);

  return (
    <Form.Root className="w-[756px] mx-auto">
      <Form.Field name="amount">
        <div className="flex flex-row justify-between">
          <div className="h-12 flex flex-row items-center">
            <Form.Label className="font-semibold">Token Amount</Form.Label>
          </div>
          <div>
            <SegmentedButton options={AMOUNT_OPTIONS} value={option} onChange={setOption} />
            {option === 'Custom' && (
              <div className="h-12 mt-4">
              <TextField />
              </div>
            )}
          </div>
        </div>
      </Form.Field>
    </Form.Root>
  );
}
