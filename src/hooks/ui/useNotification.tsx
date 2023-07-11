import React, { useCallback } from 'react';
import Notification, { INotificationProps } from '@/components/common/notification';
import { Box } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { notificationPropsAtom } from '@/state/ui/notification';

export const NotificationProvider = (props: React.PropsWithChildren<object>) => {
  const { children } = props;
  const [notificationProps, setNotificationProps] = useAtom(notificationPropsAtom);

  return (
    <>
      {notificationProps.message && (
        <Box marginBottom={6}>
          <Notification
            {...notificationProps}
            onClose={() => setNotificationProps({ ...notificationProps, visible: false })}
          />
        </Box>
      )}
      {children}
    </>
  );
};

export const useNotification = () => {
  const [notificationProps, setNotificationProps] = useAtom(notificationPropsAtom);
  const notify = useCallback(
    (props: INotificationProps) => {
      if (
        (notificationProps.message !== props.message && notificationProps.status !== props.status) ||
        !notificationProps.visible
      ) {
        setNotificationProps({ ...notificationProps, ...props, visible: true });
      }
    },
    [notificationProps, setNotificationProps],
  );
  return notify;
};
