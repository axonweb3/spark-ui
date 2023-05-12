import React from 'react';
import TextField from '@/components/common/text-field';
import SegmentedButton from '@/components/common/segmented-button';
import Button from '@/components/common/button';
import { Text, Box, Flex, Spacer } from '@chakra-ui/react';

const AMOUNT_OPTIONS = ['25%', '50%', '75%', '100%', 'Custom'];

export default function StakePanel() {
  const [option, setOption] = React.useState(AMOUNT_OPTIONS[0]);

  return (
    <Box width="756px" marginTop={10} marginX="auto">
      <Flex marginBottom={14}>
        <Flex height={12} alignItems="center">
          <Text fontWeight="extrabold">Token Amount</Text>
        </Flex>
        <Spacer />
        <Box>
          <SegmentedButton
            options={AMOUNT_OPTIONS}
            value={option}
            onChange={setOption}
          />
          <Box marginTop={4} width="full">
            <TextField />
          </Box>
        </Box>
      </Flex>
      <Flex marginBottom={14}>
        <Flex height={12} alignItems="center">
          <Text fontWeight="extrabold">Effective Epoch</Text>
        </Flex>
        <Spacer />
        <Flex width={505} justifyContent="start">
          <Box width="full">
            <TextField value={'2'} disabled />
          </Box>
        </Flex>
      </Flex>
      <Flex justifyContent="center" marginBottom={10}>
        <Button>Submit</Button>
      </Flex>
    </Box>
  );
}

// <Form.Root className="w-[756px] mt-11 mx-auto">
//       <Form.Field name="amount">
//         <div className="flex flex-row justify-between mb-14">
//           <div className="h-12 flex flex-row items-center">
//             <Form.Label className="font-extrabold">Token Amount</Form.Label>
//           </div>
//           <div className="w-[580px]">
//             <SegmentedButton
//               options={AMOUNT_OPTIONS}
//               value={option}
//               onChange={setOption}
//             />
//             <div className="h-12 mt-4">
//               <TextField size="large" />
//             </div>
//           </div>
//         </div>
//       </Form.Field>
//       <Form.Field name="epoch">
//         <div className="flex flex-row justify-between items-center mb-20">
//           <Form.Label className="font-extrabold">Effective epoch</Form.Label>
//           <div className="w-[580px] h-12">
//             <TextField size="large" value={'2'} disabled />
//           </div>
//         </div>
//       </Form.Field>
//       <Form.Submit asChild>
//         <div className="mb-11 flex flow-row justify-center">
//           <Button size="large" label="Submit" />
//         </div>
//       </Form.Submit>
//     </Form.Root>
