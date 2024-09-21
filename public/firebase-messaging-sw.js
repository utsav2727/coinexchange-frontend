if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../firebase-messaging-sw.js')
    .then(function(registration) {
      console.log('Registration successful, scope is:', registration.scope);
    }).catch(function(err) {
      console.log('Service worker registration failed, error:', err);
    });
  }

// ----------------------------- BELOW PART OF GET NOTIFICATION on website configuration ---------------------------------

  // Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyDDf6R5AD4jRrQW2TT0nrzwERAWyBqdxsw",
  authDomain: "*",
  projectId: "push-notification-5bc5b",
  storageBucket: "push-notification-5bc5b.appspot.com",
  messagingSenderId: "471408167586",
  appId: "1:471408167586:web:4b917eeeef5d3e182f65fb"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
console.log('Received background message ', payload);

const notificationTitle = payload.notification.title;
const notificationOptions = {
  body: payload.notification.body,
};

self.registration.showNotification(notificationTitle,
  notificationOptions);
});
