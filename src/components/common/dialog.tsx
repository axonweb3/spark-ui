import React, { PropsWithChildren, useEffect } from 'react';
import Button from './button';
import {
  Box,
  Text,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  ModalBody,
  ModalFooter,
  Flex,
  ModalCloseButton,
} from '@chakra-ui/react';

export interface IDialogProps extends PropsWithChildren {
  title?: string;
  description?: string | React.ReactNode;
  open?: boolean;
  footer?: React.ReactNode;
  confrmLabel?: string;
  cancelLabel?: string;
  onConfirm?(): void;
  onCancel?(): void;
  confirming?: boolean;
  onChange?(open: boolean): void;
  hideCloseButton?: boolean;
  hideCancel?: boolean;
  disabled?: boolean;
}

export default function Dialog(props: IDialogProps) {
  const {
    title,
    description,
    children,
    open,
    onChange,
    confirming,
    hideCloseButton,
    hideCancel,
    disabled,
  } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    open ? onOpen() : onClose();
  }, [open, onOpen, onClose]);

  useEffect(() => {
    onChange?.(isOpen);
  }, [isOpen, onChange]);

  return (
    <>
      {children && <Box onClick={() => !disabled && onOpen()}>{children}</Box>}

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay backgroundImage="/img/background.png" />
        <ModalContent
          backgroundColor="primary"
          borderRadius="2xl"
          borderWidth={1}
          borderColor="black"
          padding={6}
          minWidth="486px"
        >
          <ModalHeader padding={0}>
            <Text fontFamily="alfarn-2" fontWeight="bold" fontSize="xl">
              {title}
            </Text>
          </ModalHeader>
          {!hideCloseButton && <ModalCloseButton />}
          <ModalBody marginY={4} padding={0}>
            {typeof description === 'string' ? (
              <Text
                fontFamily="montserrat"
                color="grey.900"
                lineHeight={title ? 4 : 5}
                fontSize={title ? 'sm' : 'md'}
              >
                {description}
              </Text>
            ) : (
              description
            )}
          </ModalBody>
          <ModalFooter marginTop={6} padding={0}>
            {props.footer || (
              <Flex>
                {!hideCancel && (
                  <Button
                    variant="outlined"
                    size="sm"
                    disabled={confirming}
                    onClick={() => {
                      onClose();
                      props.onCancel?.();
                    }}
                  >
                    {props.cancelLabel ?? 'Cancel'}
                  </Button>
                )}
                <Box width={3} />
                <Button
                  variant="contained"
                  size="sm"
                  isLoading={confirming}
                  onClick={() => props.onConfirm?.()}
                >
                  {props.confrmLabel ?? 'Got it'}
                </Button>
              </Flex>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
