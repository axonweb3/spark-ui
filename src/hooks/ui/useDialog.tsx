import Dialog from '@/components/common/dialog';
import { IDialogProps } from '@/components/common/dialog';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { usePrevious } from 'react-use';

type DialogProps = IDialogProps & { timestamp?: number };

export const DialogContext = createContext<
  | {
      dialogProps: DialogProps;
      setDialogProps: React.Dispatch<React.SetStateAction<DialogProps>>;
    }
  | undefined
>(undefined);

export const DialogProvider = (props: React.PropsWithChildren<{}>) => {
  const { children } = props;
  const [dialogProps, setDialogProps] = useState<DialogProps>({});
  const [open, setOpen] = useState(false);
  const prevDialogProps = usePrevious(dialogProps);

  useEffect(() => {
    if (
      dialogProps.title !== prevDialogProps?.title ||
      dialogProps.description !== prevDialogProps?.description
    ) {
      setDialogProps(dialogProps);
      setOpen(true);
    }
  }, [dialogProps, prevDialogProps]);

  return (
    <DialogContext.Provider value={{ dialogProps, setDialogProps }}>
      {children}
      <Dialog
        open={open}
        onChange={setOpen}
        onCancel={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
        {...dialogProps}
      />
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  const context = useContext(DialogContext);
  const { setDialogProps } = context ?? {};

  const showDialog = useCallback(
    (props: IDialogProps) => {
      setDialogProps?.({
        ...props,
        timestamp: Date.now(),
      });
    },
    [setDialogProps],
  );
  return showDialog;
};
