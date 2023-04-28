import React from 'react';
import { MdClose } from 'react-icons/md';

export interface ISnackbarProps {
  message: string;
  visible?: boolean;
  onClose?(): void;
}

export function Snackbar(props: ISnackbarProps) {
  const { message, onClose } = props;
  const [visible, setVisible] = React.useState(props.visible ?? true);

  React.useEffect(() => {
    if (props.visible !== undefined) {
      setVisible(props.visible);
    }
  }, [props.visible])

  const handleClose = React.useCallback(() => {
    setVisible(false);
    onClose?.();
  }, [onClose]);

  if (!visible) {
    return null;
  }

  return (
    <div className="bg-blue-400 px-4 py-[14px]">
      <div className="flex flex-row justify-between">
        <span className="text-white font-montserrat font-extrabold">{message}</span>
        <div onClick={() => handleClose()}>
          <MdClose className="w-6 h-6 fill-white" />
        </div>
      </div>
    </div>
  );
}
