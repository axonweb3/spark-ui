import { Box, Alert as ChakraAlert, CloseButton, Spacer, Text } from '@chakra-ui/react';
import React from 'react';

export interface INotificationProps {
  status: 'info' | 'success' | 'warning' | 'error';
  message: string;
  visible?: boolean;
  onClose?(): void;
}

export default function Notification(props: INotificationProps) {
  const { status, message, onClose } = props;
  const [visible, setVisible] = React.useState(props.visible ?? true);

  const backgroundColor = React.useMemo(() => {
    switch (status) {
      case 'info':
        return 'colors.blue.300';
      case 'success':
        return 'colors.green.400';
      case 'warning':
        return 'colors.yellow.400';
      case 'error':
        return 'colors.red.400';
      default:
        return 'colors.blue.300';
    }
  }, [status]);

  React.useEffect(() => {
    if (props.visible !== undefined) {
      setVisible(props.visible);
    }
  }, [props.visible]);

  const handleClose = React.useCallback(() => {
    setVisible(false);
    onClose?.();
  }, [onClose]);

  if (!visible) {
    return null;
  }

  return (
    <Box>
      <ChakraAlert
        status={status}
        variant="solid"
        paddingX="4"
        paddingY="2"
        borderRadius="4px"
        className={status}
        sx={{ '--alert-bg': backgroundColor }}
      >
        <Text fontFamily="montserrat" fontWeight="extrabold" color="white">
          {message}
        </Text>
        <Spacer />
        <CloseButton onClick={handleClose} />
      </ChakraAlert>
    </Box>
  );
}
