import { useState, useEffect } from 'react';

type PushUpMessage = {
  message: string;
  type: 'success' | 'warn';
  id: number;
};

export const usePushUp = () => {
  const [queue, setQueue] = useState<PushUpMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState<PushUpMessage | null>(null);
  const [nextId, setNextId] = useState(0);

  const showPushUp = (message: string, type: 'success' | 'warn') => {
    const newMessage = { message, type, id: nextId };
    setNextId(nextId + 1);
    
    setQueue(prevQueue => [...prevQueue, newMessage]);
  };

  const hidePushUp = () => {
    setCurrentMessage(null);
  };

  useEffect(() => {
    if (currentMessage === null && queue.length > 0) {
      setCurrentMessage(queue[0]);
      setQueue(prevQueue => prevQueue.slice(1));
    }
  }, [currentMessage, queue]);

  return { 
    currentMessage, 
    showPushUp, 
    hidePushUp,
    queueLength: queue.length
  };
};