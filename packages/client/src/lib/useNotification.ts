import { useEffect } from 'react';

const useNotification = () => {
  const requestPermission = () => {
    if (!('Notification' in window)) {
      console.error('This browser does not support notifications.');
      return;
    }
    if (
      Notification.permission !== 'granted' &&
      Notification.permission !== 'denied'
    ) {
      Notification.requestPermission();
    }
  };

  const showNotification = (title: string, options?: NotificationOptions) => {
    if (Notification.permission === 'granted') {
      new Notification(title, options);
    } else {
      console.warn('Notifications are not permitted.');
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);

  return { showNotification };
};

export default useNotification;
