import { ThemeProvider } from '@emotion/react';
import './App.css';
import { createTheme, CssBaseline } from '@mui/material';
import getLPTheme from './getLPTheme';
import AppAppBar from './components/AppAppBar';
import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import RoutePage from './routes/Routes';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from './context/userContext';
import { useEffect } from 'react';
import axios from 'axios';
import { verifyToken } from './services/verifyToken';
import { registerServiceWorker, subscribeToPushNotifications } from './notifications';
import { initializePushNotifications } from './Pushnotification';
import { LoadingProvider } from './LoadingContext';
import GlobalLoadingIndicator from './GlobalLoadingIndicator';
import { useAxiosInterceptors } from './services/axiosInstance';
import AxiosInterceptorProvider from './AxiosIntercepterProvider';

// import { initializeApp } from 'firebase/app';
// import { getMessaging, getToken, onMessage } from 'firebase/messaging';

function App() {
  const [mode, setMode] = useState('light');
  const LPtheme = createTheme(getLPTheme(mode));
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState({});


  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // useAxiosInterceptors(); 


function requestPermission() {
  console.log('Requesting permission...');
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      // getToken(messaging, { vapidKey: 'BFAADld1xChQ3kyQmiwrMHuB9jhWJHLJht8pz4UXCL2ql2mdK1AXvc97YtAnFfl4nJjIKcLqgF6XJk_Z_XPhftU' })
      //   .then((currentToken) => {
      //     if (currentToken) {
      //       console.log('Token:', currentToken);
      //       // Send the token to your server
      //     } else {
      //       console.log('No registration token available.');
      //     }
      //   })
      //   .catch((err) => {
      //     console.log('An error occurred while retrieving token. ', err);
      //   });
    } else {
      console.log('Permission denied');
    }
  });
}



  const setLoggedOut = ()=>{

    setIsLoggedin(false);
    setUserData({})

  }

  useEffect(()=>{
    async function fetchUser(){
      let response = await verifyToken();
      if(response){
        setIsLoggedin(true);
        setUserData(response.user);
      }else{
        setIsLoggedin(false);
        setUserData({});
      }
    }
    fetchUser();
  },[])

  useEffect(() => {
    initializePushNotifications();
}, []);


  return (
    <ThemeProvider theme={LPtheme}>
      <LoadingProvider>
      <CssBaseline />
      <AxiosInterceptorProvider>
        <GlobalLoadingIndicator/>
      <UserContext.Provider value={{isLoggedIn:isLoggedin, userData: userData, setLoggedIn:setIsLoggedin, setLoggedOut:setLoggedOut}}>
        <BrowserRouter>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            icon={true}
          />
          <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
          <RoutePage />
        </BrowserRouter>
      </UserContext.Provider>
      </AxiosInterceptorProvider>
      </LoadingProvider>
    </ThemeProvider>
  );
}

export default App;
