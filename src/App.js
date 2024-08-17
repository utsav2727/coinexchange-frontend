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

function App() {
  const [mode, setMode] = useState('light');
  const LPtheme = createTheme(getLPTheme(mode));
  const [userData, setUserData] = useState({isLoggedIn:false, userData:{}})

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };


  useEffect(()=>{
    async function fetchUser(){
      let response = await verifyToken();
      if(response){
        setUserData({
          isLoggedIn:true,
          userData:response.user
        })
      }
    }
    fetchUser();
  },[])


  return (
    <ThemeProvider theme={LPtheme}>
      <CssBaseline />
      <UserContext.Provider value={userData}>
        <BrowserRouter>
          <ToastContainer
            position="top-right"
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
    </ThemeProvider>
  );
}

export default App;
