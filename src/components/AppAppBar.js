import * as React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import ToggleColorMode from './ToogleColorMode';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import { Accordion, AccordionDetails, AccordionSummary, Avatar, List, ListItemButton, ListItemText, Popper, Stack } from '@mui/material';
import { logout } from '../services/logout';
import AppBarOptions from './AppBarOptions';
import { useState } from 'react';
import { useEffect } from 'react';
import axiosInstance from '../services/axiosInstance';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



const logoStyle = {
  padding:'2px',
  marginLeft:'2px',
  width: '140px',
  height: 'auto',
  cursor: 'pointer',
};

function AppAppBar({ mode, toggleColorMode }) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const { pathname } = useLocation();

  // console.log('locations', location);


  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const userMenu = Boolean(anchorEl);
  const id = userMenu ? 'simple-popover' : undefined;

  const user = useContext(UserContext);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
      setOpen(false);
    }
  };

  const handleHome = () => {
    window.location.href = '/'
  };

  const handleNavigate = (page) => {
    if (page === 'profile') {
      navigate('/profile')
    } else if (page === 'deposit') {
      window.location.href = '/wallet?type=depositHistory';
    } else if (page === 'withdraw') {
      window.location.href = '/wallet?type=withdrawHistory';
    }else if(page === "transaction"){
      window.location.href = '/transactions'
    }else if(page === "contact"){
      window.location.href = '/support'
    }
  }

  // const butOptions = ['BTC', 'BCH','BNB','DOG','ETH','LTC','XMR','LUNA','USDT']


  const [buyOptions, setOptions] = useState([]);

  useEffect(() => {
    async function fetchCurrency() {
      let data = await axiosInstance.get('/currency');
      console.log('data', data.data);
      let options = data.data.map((item) => {
        return { tag: item.tag, symbol: item.symbol };
      });
      setOptions(options);
    }
    fetchCurrency()
  }, [])


  return (
    <div>

      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          mt: 2,
        }}
      >
        <Popper
          id={id}
          open={userMenu}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <List
            sx={{ width: '100%', marginTop: 1, backgroundColor: 'primary.light', maxWidth: 360, p: 1, borderRadius: 2 }}
            component="nav"
          >
            <ListItemButton onClick={(e) => { handleNavigate('profile') }} sx={{ borderRadius: 5, bgcolor: 'secondary', color: "text.secondary" }}>
              <ListItemText primary="Profile" />
            </ListItemButton>
            <ListItemButton onClick={(e) => { handleNavigate('deposit') }} sx={{ borderRadius: 5, bgcolor: 'secondary', color: "text.secondary" }}>
              <ListItemText primary="Deposits" />
            </ListItemButton>
            <ListItemButton onClick={(e) => { handleNavigate('transaction') }} sx={{ borderRadius: 5, bgcolor: 'secondary', color: "text.secondary" }}>
              <ListItemText primary="Transactions" />
            </ListItemButton>
            <ListItemButton onClick={(e) => { handleNavigate('withdraw') }} sx={{ borderRadius: 5, bgcolor: 'secondary', color: "text.secondary" }}>
              <ListItemText primary="Withdrawals" />
            </ListItemButton>
            <ListItemButton onClick={(e) => { }} sx={{ borderRadius: 5, bgcolor: 'secondary', color: "text.secondary" }}>
              <ListItemText primary="Support Tickets" />
            </ListItemButton>
            <ListItemButton onClick={(e) => { logout() }} sx={{ borderRadius: 5, backgroundColor: 'grey[100]', color: "text.secondary" }}>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </List>
        </Popper>
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              borderRadius: '999px',
              bgcolor:
                theme.palette.mode === 'light'
                  ? 'rgba(255, 255, 255, 0.4)'
                  : 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(24px)',
              maxHeight: 40,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow:
                theme.palette.mode === 'light'
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
            })}
          >

            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                ml: '-18px',
                px: 0,
              }}
            >
              <img
                src={process.env.REACT_APP_LOGO}
                style={logoStyle}
                alt="logo of sitemark"
                onClick={() => { handleHome() }}
              />
              <Box sx={{ display: { xs: 'none', md: 'flex' }, marginLeft: { md: 5 } }}>
                <MenuItem
                  onClick={() => { handleHome() }}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    Home
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => { window.location.href = '/trade?req=buy' }}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="primary">
                    Buy
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => { window.location.href = '/trade?req=sell' }}
                  sx={{ py: '6px', px: '12px', color: 'primary' }}
                >
                  <Typography variant="body2" color="primary">
                    Sell
                  </Typography>
                </MenuItem>
                {pathname == "/" && <MenuItem
                  onClick={() => scrollToSection('testimonials')}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    Testimonials
                  </Typography>
                </MenuItem>}
                {pathname == "/" && <MenuItem
                  onClick={() => scrollToSection('highlights')}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    Highlights
                  </Typography>
                </MenuItem>}
                {pathname == "/" && <MenuItem
                  onClick={() => scrollToSection('faq')}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    FAQ
                  </Typography>
                </MenuItem>}
                {pathname == "/" && <MenuItem
                  onClick={() => handleNavigate('contact')}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    Contact
                  </Typography>
                </MenuItem>}
                <MenuItem
                  onClick={() => window.location.href = '/mytrades'}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    Trades
                  </Typography>
                </MenuItem>
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 0.5,
                alignItems: 'center',
              }}
            >
              {/* <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} /> */}
              {!user.isLoggedIn ? <Button
                color="primary"
                variant="text"
                size="small"
                component="a"
                // href="/signin"
                target="_blank"
                onClick={() => { navigate("/signin") }}
              >
                Sign in
              </Button> : null}
              {!user.isLoggedIn ? <Button
                color="primary"
                variant="contained"
                size="small"
                component="a"
                // href="/signup"
                target="_blank"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </Button> : null}
              {user.isLoggedIn ?
                <Stack direction='row' gap={2} alignItems={'center'}>
                  <Typography variant='body1' color='primary'>Hello {user.userData.userName}!</Typography>
                  <Button variant='outlined' onClick={() => { navigate("/wallet") }}>Wallet</Button>
                  <Avatar aria-describedby={id} onClick={(e) => { handleClick(e) }} sx={{ bgcolor: 'text.primary' }}>{user.userData.userName.slice(0, 1)}</Avatar>
                </Stack> :
                null}
            </Box>
            <Box sx={{ display: { sm: '', md: 'none' } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: '30px', p: '4px' }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    maxWidth: '60vw',
                    p: 2,
                    backgroundColor: 'background.paper',
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'end',
                      flexGrow: 1,
                    }}
                  >
                    <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
                  </Box>
                  {/* <MenuItem> */}
                  {user.isLoggedIn ?
                    <Box sx={{ display: 'flex' }}>
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1-content"
                          id="panel1-header"
                        >
                          <Typography variant='body1' color='primary'>Hello {user.userData.userName}!</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <ListItemButton onClick={(e) => { handleNavigate('profile'); setOpen(false); }} sx={{ borderRadius: 5, bgcolor: 'secondary', color: "text.secondary" }}>
                            <ListItemText primary="Profile" />
                          </ListItemButton>
                          <ListItemButton onClick={(e) => { handleNavigate('deposit');setOpen(false); }} sx={{ borderRadius: 5, bgcolor: 'secondary', color: "text.secondary" }}>
                            <ListItemText primary="Deposits" />
                          </ListItemButton>
                          <ListItemButton onClick={(e) => {handleNavigate('transaction'); setOpen(false); }} sx={{ borderRadius: 5, bgcolor: 'secondary', color: "text.secondary" }}>
                            <ListItemText primary="Transactions" />
                          </ListItemButton>
                          <ListItemButton onClick={(e) => { handleNavigate('withdraw');setOpen(false); }} sx={{ borderRadius: 5, bgcolor: 'secondary', color: "text.secondary" }}>
                            <ListItemText primary="Withdrawals" />
                          </ListItemButton>
                          <ListItemButton onClick={(e) => {setOpen(false); }} sx={{ borderRadius: 5, bgcolor: 'secondary', color: "text.secondary" }}>
                            <ListItemText primary="Support Tickets" />
                          </ListItemButton>
                          <ListItemButton onClick={(e) => { logout();setOpen(false); }} sx={{ borderRadius: 5, backgroundColor: 'grey[100]', color: "text.secondary" }}>
                            <ListItemText primary="Logout" />
                          </ListItemButton>
                        </AccordionDetails>
                      </Accordion></Box> :
                    null}
                  {/* </MenuItem> */}
                  <Button variant='outlined' sx={{mt:2}} fullWidth onClick={() => { navigate("/wallet") }}>Wallet</Button>
                  <MenuItem onClick={() => { window.location.href = '/trade?req=buy' }}>
                    Buy
                  </MenuItem>
                  <MenuItem onClick={() => { window.location.href = '/trade?req=sell' }}>
                    Sell
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection('features')}>
                    Features
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection('testimonials')}>
                    Testimonials
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection('highlights')}>
                    Highlights
                  </MenuItem>
                  {/* <MenuItem onClick={() => scrollToSection('pricing')}>
                    Pricing
                  </MenuItem> */}
                  <MenuItem onClick={() => scrollToSection('faq')}>FAQ</MenuItem>
                  <Divider />
                  {!user.isLoggedIn ? <MenuItem>
                    <Button
                      color="primary"
                      variant="contained"
                      component="a"
                      // href="/signup"
                      // target="_blank"
                      sx={{ width: '100%' }}
                      onClick={() => navigate("/signup")}
                    >
                      Sign up
                    </Button>
                  </MenuItem> : null}
                  {!user.isLoggedIn ? <MenuItem>
                    <Button
                      color="primary"
                      variant="outlined"
                      component="a"
                      // href="/signin"
                      // target="_blank"
                      sx={{ width: '100%' }}
                      onClick={() => navigate("/signin")}
                    >
                      Sign in
                    </Button>
                  </MenuItem> : null}
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

AppAppBar.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default AppAppBar;