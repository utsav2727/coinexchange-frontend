// src/notifications.js
export const registerServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
        });
        console.log('Service Worker Registered');
        return registration;
      } catch (error) {
        console.error('Service Worker Registration Failed', error);
      }
    }
  };
  
  export const subscribeToPushNotifications = async (registration) => {
    const publicVapidKey = 'BFAADld1xChQ3kyQmiwrMHuB9jhWJHLJht8pz4UXCL2ql2mdK1AXvc97YtAnFfl4nJjIKcLqgF6XJk_Z_XPhftU';
    const convertedVapidKey = urlBase64ToUint8Array(publicVapidKey);
  
    try {
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidKey,
      });
  
      // Send subscription to your server
      await fetch('http://localhost:6001/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log('User is subscribed to push notifications');
    } catch (error) {
      console.error('Failed to subscribe to push notifications', error);
    }
  };
  
  function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
  