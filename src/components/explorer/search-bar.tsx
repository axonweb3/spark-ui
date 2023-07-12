import React from 'react';
import { Box, Icon, Input, InputGroup, InputRightAddon } from '@chakra-ui/react';
import { MdSearch } from 'react-icons/md';

export function SearchBar() {
  return (
    <Box>
      <InputGroup>
        <Input
          backgroundColor="white"
          borderWidth="1px"
          borderColor="gray.700"
          borderRightWidth="0px"
          placeholder="Transaction Hash"
          _focusVisible={{
            boxShadow: 'none',
          }}
          _hover={{
            boxShadow: 'none',
          }}
          _placeholder={{
            fontFamily: 'montserrat',
            color: 'gray.400',
          }}
        />
        <InputRightAddon backgroundColor="white" borderWidth="1px" borderColor="gray.700" cursor="pointer">
          <Icon as={MdSearch} width="20px" height="20px" />
        </InputRightAddon>
      </InputGroup>
    </Box>
  );
}
