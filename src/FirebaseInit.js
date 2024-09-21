import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyDDf6R5AD4jRrQW2TT0nrzwERAWyBqdxsw",
    authDomain: "*",
    projectId: "push-notification-5bc5b",
    storageBucket: "push-notification-5bc5b.appspot.com",
    messagingSenderId: "471408167586",
    appId: "1:471408167586:web:4b917eeeef5d3e182f65fb"
  };
  

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export default messaging;