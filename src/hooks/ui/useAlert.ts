import { alertAtomWithPersistence } from '@/state/ui/alert';
import { useAtom } from 'jotai';

export function useAlert(name: string) {
  const [showAlert, setShowAlert] = useAtom(alertAtomWithPersistence(name));
  return [showAlert === 'true' || showAlert === true, setShowAlert] as const;
}
