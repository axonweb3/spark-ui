import { useConnect } from '@/hooks/useConnect';
import Button, { IButtonProps } from './common/button';

export interface IConnectButtonProps extends IButtonProps {}

export function ConnectButton(props: IConnectButtonProps) {
  const { isDisconnected, connect } = useConnect();
  if (isDisconnected) {
    const { variant, size } = props;
    return (
      <Button
        variant={variant}
        size={size}
        onClick={() => connect()}
        disabled={false}
      >
        Connect Wallet
      </Button>
    );
  }

  return <Button {...props} />;
}
