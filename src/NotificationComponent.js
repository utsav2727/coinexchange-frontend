import React, { useEffect } from 'react';
import { registerServiceWorker, subscribeToPushNotifications } from './notifications';

const NotificationComponent = () => {
  useEffect(() => {
    const setupPushNotifications = async () => {
      const registration = await registerServiceWorker();
      if (registration) {
        await subscribeToPushNotifications(registration);
      }
    };
    setupPushNotifications();
  }, []);

  return (
    <div>
      <h1>Push Notifications Demo</h1>
      <p>Check your browser for a push notification!</p>
    </div>
  );
};

export default NotificationComponent;
