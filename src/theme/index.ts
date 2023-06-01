import { extendTheme } from '@chakra-ui/react';
import colors from './colors';
import Button from './componnets/button';
import Input from './componnets/input';

const theme = extendTheme({
  colors,
  fonts: {
    'alfarn-2': `'alfarn-2', 'serif'`,
    montserrat: `var(--montserrat-font), 'sans-serif'`,
  },
  components: {
    Button,
    Input,
  },
});

export default theme;
