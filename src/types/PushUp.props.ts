export type PushUpProps = {
  message: string;
  type: 'success' | 'warn';
  duration?: number;
  onClose: () => void;
  showProgress?: boolean;
};