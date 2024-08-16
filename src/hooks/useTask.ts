import { useState, useEffect } from 'react';

export function useTask<T extends any[]>(
    callback: (...args: T) => void | Promise<void>
): [boolean, (...args: T) => Promise<void>] {
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => () => setIsRunning(false), []);

  async function execute(...args: T) {
    if (isRunning) {
      return;
    }
    setIsRunning(true);

    /*
        Wrapped into setTimeout to emulate network delay
     */
    setTimeout(async () => {
      try {
        await callback(...args);
      } finally {
        setIsRunning(false);
      }
    }, 3500);
  }

  return [isRunning, execute];
}
