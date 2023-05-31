import React, { useCallback } from 'react';
import Notification, {
  INotificationProps,
} from '@/components/common/notification';
import { Box } from '@chakra-ui/react';

export const NotificationContext = React.createContext<
  | {
      notification: INotificationProps;
      setNotification: React.Dispatch<React.SetStateAction<INotificationProps>>;
    }
  | undefined
>(undefined);

export const NotificationProvider = (props: React.PropsWithChildren<{}>) => {
  const { children } = props;
  const [notification, setNotification] = React.useState<INotificationProps>({
    status: 'info',
    message: '',
    visible: true,
  });
  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {notification.message && (
        <Box maxWidth="1080px" marginX="auto" marginBottom={4}>
          <Notification
            {...notification}
            onClose={() => setNotification({ ...notification, visible: false })}
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
  const { notification, setNotification } = context;
  const notify = useCallback((props: INotificationProps) => {
    if (
      (notification.message !== props.message &&
        notification.status !== props.status) ||
      !notification.visible
    ) {
      setNotification({ ...notification, ...props, visible: true });
    }
  }, [notification, setNotification]);
  return notify;
};
