import { INotificationProps } from '@/components/common/notification';
import { atom } from 'jotai';

export const notificationPropsAtom = atom<INotificationProps>({
  status: 'info',
  message: '',
  visible: true,
});
