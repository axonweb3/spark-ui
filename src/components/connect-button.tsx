import { useConnect } from '@/hooks/useConnect';
import Button, { IButtonProps } from './common/button';

export type IConnectButtonProps = IButtonProps;

export function ConnectButton(props: IConnectButtonProps) {
  const { isConnected } = useConnect();
  return <Button {...props} disabled={!isConnected} />;
}
