import { defineStyleConfig } from '@chakra-ui/react';

const Input = defineStyleConfig({
  baseStyle: {
    borderRadius: '6px',
  },
  sizes: {
    lg: {
      height: '48px',
      minWidth: '260px',
      paddingX: '14px',
      paddingY: '12px',
      fontSize: 'md',
    },
    md: {
      height: '40px',
      minWidth: '210px',
      paddingX: '8px',
      paddingY: '10px',
      fontSize: 'sm',
    },
    sm: {
      height: '30px',
      minWidth: '180px',
      paddingX: '8px',
      paddingY: '7px',
      fontSize: 'xs',
    },
  },
  defaultProps: {
    size: 'md',
  },
});

export default Input;
