import { getToken, onMessage } from 'firebase/messaging';
import messaging from './FirebaseInit';
import { notificationToken } from './services/notification';

export const initializePushNotifications = () => {
  // Request permission for push notifications
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      // Get the token from the messaging service
      return getToken(messaging, {vapidKey: "BOL8JXNM-HzTzJxFGqQ9SVg1915qtqyu9FzYHG0SYsDwokgfvR3qTW0kNwrvTRT7TBvDg_lM-NDJs8kVwwxf4lo"});
    } else {
      console.log('Unable to get permission to notify.');
    }
  }).then((token) => {
    console.log('FCM Token:', token);
    if(token != null || token != undefined || token !=""){
      notificationToken({token});
    }
    
    // Send this token to your server to associate it with the user
  }).catch((err) => {
    console.error('Error getting notification permission:', err);
  });

  // Handle incoming messages
  onMessage(messaging, (payload) => {
    console.log('Message received:', payload);
    // Display notification using Notification API
    if (Notification.permission === 'granted') {
      new Notification(payload.notification.title, {
        body: payload.notification.body,
        icon: payload.notification.icon
      });
    }
  });
};
