import { useConnect } from '@/hooks/useConnect';
import Button, { IButtonProps } from './common/button';

export type IConnectButtonProps = IButtonProps;

export function ConnectButton(props: IConnectButtonProps) {
  const { isConnected } = useConnect();
  // if (!isConnected) {
  //   const { variant, size } = props;
  //   return (
  //     <Button variant={variant} size={size} onClick={() => connect()} disabled={false}>
  //       Connect Wallet
  //     </Button>
  //   );
  // }

  return <Button {...props} disabled={!isConnected} />;
}
