import React, { PropsWithChildren } from 'react';
import { MdClose } from 'react-icons/md';
import {
  Close,
  Content,
  Description,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger,
} from '@radix-ui/react-dialog';
import classnames from 'classnames';
import { Button } from './button';

export interface IDialogProps extends PropsWithChildren {
  title: string;
  description?: string;
  open?: boolean;
  footer?: React.ReactNode;
  confrmLabel?: string;
  cancelLabel?: string;
  onConfirm?(): void;
  onCancel?(): void;
  onOpenChange?(open: boolean): void;
  onClose?(): void;
}

export function Dialog(props: IDialogProps) {
  const { title, description, children, open, onOpenChange, onClose } = props;

  const handleOpenChange = React.useCallback((value: boolean) => {
    onOpenChange?.(value);
    if (!value) {
      onClose?.();
    }
  }, [onOpenChange, onClose]);

  return (
    <Root open={open} onOpenChange={handleOpenChange}>
      {children && <Trigger>{children}</Trigger>}
      <Portal>
        <Overlay />
        <Content className="w-[486px] fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
          <div className="p-6 bg-primary border border-black rounded-2xl">
            <div className="flex flex-row items-center">
              <Title className="flex-1 text-xl font-alfarn-2 font-bold">
                {title}
              </Title>
              <Close className="fill-black outline-none">
                <MdClose className="w-6 h-6" />
              </Close>
            </div>
            <Description
              className={classnames('my-4 font-montserrat text-grey-900', {
                'leading-5': !title,
                'text-sm leading-4': title,
              })}
            >
              {description}
            </Description>
            {props.footer || (
              <div className="flex flex-row-reverse mt-6">
                <div className="flex flex-row">
                  <Button
                    variant="outlined"
                    label={props.cancelLabel ?? 'Cancel'}
                    size="small"
                  />
                  <div className="w-2" />
                  <Button
                    variant="contained"
                    label={props.confrmLabel ?? 'Got it'}
                    size="small"
                  />
                </div>
              </div>
            )}
          </div>
        </Content>
      </Portal>
    </Root>
  );
}
