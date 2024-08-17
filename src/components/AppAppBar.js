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
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import { Avatar, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Popover, Popper, Stack } from '@mui/material';
import { logout } from '../services/logout';
import AppBarOptions from './AppBarOptions';


const logoStyle = {
  width: '140px',
  height: 'auto',
  cursor: 'pointer',
};

function AppAppBar({ mode, toggleColorMode }) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const userMenu = Boolean(anchorEl);
  const id = userMenu ? 'simple-popover' : undefined;


  const user = useContext(UserContext);

  console.log('user', user);

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
    window.location.href='/'
  };


  const butOptions = ['BTC', 'BCH','BNB','DOG','ETH','LTC','XMR','LUNA','USDT']


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
            sx={{ width: '100%', marginTop: 1, maxWidth: 360, borderRadius: 10 }}
            component="nav"
          >
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
                src={
                  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg'
                }
                style={logoStyle}
                alt="logo of sitemark"
                onClick={() => { handleHome() }}
              />
              <Box sx={{ display: { xs: 'none', md: 'flex' }, marginLeft:{md:5} }}>
                <MenuItem
                  onClick={() => {handleHome()}}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    Home
                  </Typography>
                </MenuItem>
                <AppBarOptions name={'Buy'} options={butOptions}/>
                <AppBarOptions name={'Sell'} options={butOptions}/>
                <MenuItem
                  onClick={() => scrollToSection('testimonials')}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    Testimonials
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => scrollToSection('highlights')}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    Highlights
                  </Typography>
                </MenuItem>
                {/* <MenuItem
                  onClick={() => scrollToSection('pricing')}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    Pricing
                  </Typography>
                </MenuItem> */}
                <MenuItem
                  onClick={() => scrollToSection('faq')}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    FAQ
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => scrollToSection('testimonials')}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    Contact
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
                  <Typography variant='body1' color='Highlight'>Hello {user.userData.userName}!</Typography>
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
                    minWidth: '60dvw',
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
                  <MenuItem>
                  {user.isLoggedIn ?
                <Stack direction='row' gap={2} alignItems={'center'}>
                  <Typography variant='body1' color='Highlight'>Hello {user.userData.userName}!</Typography>
                  <Avatar aria-describedby={id} onClick={(e) => { handleClick(e) }} sx={{ bgcolor: 'text.primary' }}>{user.userData.userName.slice(0, 1)}</Avatar>
                </Stack> :
                null}
                  </MenuItem>
                  <MenuItem>
                    <AppBarOptions name={'Buy'} options={butOptions}/>
                  </MenuItem>
                  <MenuItem>
                    <AppBarOptions name={'Sell'} options={butOptions}/>
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
                  </MenuItem>: null}
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
                  </MenuItem>: null}
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