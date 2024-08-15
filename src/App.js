import { ThemeProvider } from '@emotion/react';
import './App.css';
import { createTheme, CssBaseline } from '@mui/material';
import getLPTheme from './getLPTheme';
import AppAppBar from './components/AppAppBar';
import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import RoutePage from './routes/Routes';
import ReactDOM from 'react-dom/client';

function App() {
  const [mode, setMode] = useState('light');
  const LPtheme = createTheme(getLPTheme(mode));

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={LPtheme}>
      <CssBaseline />
      <BrowserRouter>
        <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
        <RoutePage/>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
