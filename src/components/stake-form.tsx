import React from 'react';
import * as Form from '@radix-ui/react-form';
import { TextField } from './common/text-field';
import { SegmentedButton } from './common/segmented-button';
import { Button } from './common/button';

const AMOUNT_OPTIONS = ['25%', '50%', '75%', '100%', 'Custom'];

export function StakeForm() {
  const [option, setOption] = React.useState(AMOUNT_OPTIONS[0]);

  return (
    <Form.Root className="w-[756px] mt-11 mx-auto">
      <Form.Field name="epoch">
        <div className="flex flex-row justify-between items-center mb-14">
          <Form.Label className="font-extrabold">Effective epoch</Form.Label>
          <div className="w-[580px] h-12">
            <TextField size="large" value={'2'} disabled />
          </div>
        </div>
      </Form.Field>
      <Form.Field name="amount">
        <div className="flex flex-row justify-between mb-20">
          <div className="h-12 flex flex-row items-center">
            <Form.Label className="font-extrabold">Token Amount</Form.Label>
          </div>
          <div className="w-[580px]">
            <SegmentedButton
              options={AMOUNT_OPTIONS}
              value={option}
              onChange={setOption}
            />
            <div className="h-12 mt-4">
              <TextField size="large" />
            </div>
          </div>
        </div>
      </Form.Field>
      <Form.Submit asChild>
        <div className="mb-11 flex flow-row justify-center">
          <Button size="large" label="Submit" />
        </div>
      </Form.Submit>
    </Form.Root>
  );
}
