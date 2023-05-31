import React, { useCallback } from 'react';
import Notification, {
  INotificationProps,
} from '@/components/common/notification';
import { Box } from '@chakra-ui/react';

export const NotificationContext = React.createContext<
  | {
      notificationProps: INotificationProps;
      setNotificationProps: React.Dispatch<
        React.SetStateAction<INotificationProps>
      >;
    }
  | undefined
>(undefined);

export const NotificationProvider = (props: React.PropsWithChildren<{}>) => {
  const { children } = props;
  const [notificationProps, setNotificationProps] =
    React.useState<INotificationProps>({
      status: 'info',
      message: '',
      visible: true,
    });
  return (
    <NotificationContext.Provider
      value={{ notificationProps, setNotificationProps }}
    >
      {notificationProps.message && (
        <Box maxWidth="1080px" marginX="auto" marginBottom={4}>
          <Notification
            {...notificationProps}
            onClose={() =>
              setNotificationProps({ ...notificationProps, visible: false })
            }
          />
        </Box>
      )}
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = React.useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      'useNotification must be used within a NotificationProvider',
    );
  }
  const { notificationProps, setNotificationProps } = context;
  const notify = useCallback(
    (props: INotificationProps) => {
      if (
        (notificationProps.message !== props.message &&
          notificationProps.status !== props.status) ||
        !notificationProps.visible
      ) {
        setNotificationProps({ ...notificationProps, ...props, visible: true });
      }
    },
    [notificationProps, setNotificationProps],
  );
  return notify;
};
