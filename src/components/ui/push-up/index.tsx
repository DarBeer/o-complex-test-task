import React, { useEffect, useState } from 'react';
import styles from './PushUp.module.css';
import { PushUpProps } from '@/types/PushUp.props';

export const PushUp: React.FC<PushUpProps> = ({
  message,
  type,
  duration = 3000,
  onClose,
  showProgress = true,
}) => {
  const [progress, setProgress] = useState(100);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, duration);

    if (showProgress) {
      const interval = setInterval(() => {
        setProgress(prev => Math.max(0, prev - (100 / (duration / 50))));
      }, 50);

      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }

    return () => clearTimeout(timer);
  }, [duration, onClose, showProgress]);

  if (!isVisible) return null;

  const typeClass = type === 'success' ? styles.success : styles.warn;

  return (
    <div className={`${styles.pushUp} ${typeClass}`}>
      <div className={styles.message}>{message}</div>
      {showProgress && (
        <div className={styles.progressBar}>
          <div 
            className={styles.progress} 
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
      <button className={styles.closeButton} onClick={() => {
        setIsVisible(false);
        onClose();
      }}>
        &times;
      </button>
    </div>
  );
};
