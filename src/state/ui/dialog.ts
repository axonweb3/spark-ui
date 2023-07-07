import { IDialogProps } from '@/components/common/dialog';
import { atom } from 'jotai';

type DialogProps = IDialogProps & { timestamp?: number };

export const dialogOpenAtom = atom(false);
export const dialogPorpsAtom = atom<DialogProps>({});
