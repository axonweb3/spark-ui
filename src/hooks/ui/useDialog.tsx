import Dialog from '@/components/common/dialog';
import { IDialogProps } from '@/components/common/dialog';
import { dialogOpenAtom, dialogPorpsAtom } from '@/state/ui/dialog';
import { useAtom, useSetAtom } from 'jotai';
import { useCallback, useEffect } from 'react';
import { usePrevious } from 'react-use';
import { isEmpty, isEqual } from 'lodash-es';

export const DialogProvider = (props: React.PropsWithChildren<{}>) => {
  const { children } = props;
  const [dialogProps, setDialogProps] = useAtom(dialogPorpsAtom);
  const [open, setOpen] = useAtom(dialogOpenAtom);
  const prevDialogProps = usePrevious(dialogProps);

  useEffect(() => {
    if (!isEmpty(dialogProps) && !isEqual(dialogProps, prevDialogProps ?? {})) {
      setDialogProps(dialogProps);
      setOpen(true);
    }
  }, [dialogProps, prevDialogProps, setOpen, setDialogProps]);

  return (
    <>
      {children}
      <Dialog
        open={open}
        onChange={setOpen}
        onCancel={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
        {...dialogProps}
      />
    </>
  );
};

export const useDialog = () => {
  const setDialogProps = useSetAtom(dialogPorpsAtom);

  const showDialog = useCallback(
    (props: IDialogProps) => {
      setDialogProps({
        ...props,
        timestamp: Date.now(),
      });
    },
    [setDialogProps],
  );
  return showDialog;
};
