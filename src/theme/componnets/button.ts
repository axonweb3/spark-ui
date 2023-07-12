import { defineStyleConfig } from '@chakra-ui/react';

const Button = defineStyleConfig({
  baseStyle: {
    borderRadius: '30px',
    minWidth: '100px',
  },
  sizes: {
    lg: {
      height: '48px',
      fontSize: 'lg',
      fontFamily: 'alfarn-2',
      fontWeight: 'extrabold',
      paddingX: '50px',
      px: 9,
    },
    md: {
      height: '40px',
      fontSize: 'md',
      fontFamily: 'montserrat',
      fontWeight: 'extrabold',
      paddingX: '36px',
      px: 8,
    },
    sm: {
      height: '30px',
      fontSize: 'md',
      fontFamily: 'montserrat',
      fontWeight: 'bold',
      paddingX: '24px',
      px: 5,
    },
  },
  variants: {
    contained: {
      backgroundColor: 'yellow.300',
      color: 'black',
      borderColor: 'grey.700',
      borderWidth: 1,

      _hover: {
        backgroundColor: 'yellow.400',
      },
    },
    contained_disabled: {
      color: 'grey.400',
      backgroundColor: 'grey.100',
      border: 'none',
      cursor: 'not-allowed',
    },
    outlined: {
      backgroundColor: 'transparent',
      color: 'yellow.800',
      borderColor: 'grey.700',
      borderWidth: 0.5,

      _hover: {
        backgroundColor: 'yellow.200',
      },
    },
    outlined_disabled: {
      color: 'grey.400',
      backgroundColor: 'grey.400',
      cursor: 'not-allowed',
    },
    text: {
      backgroundColor: 'transparent',
      color: 'yellow.800',
      border: 'none',

      _hover: {
        backgroundColor: 'yellow.200',
      },
    },
    hovertext: {
      color: 'yellow.800',
      border: 'none',
      backgroundColor: 'yellow.200',
    },
    text_disabled: {
      color: 'grey.400',
      cursor: 'not-allowed',
    },
  },
  defaultProps: {
    size: 'md',
    variant: 'contained',
  },
});

export default Button;
