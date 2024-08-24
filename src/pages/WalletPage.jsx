import React, { useEffect } from 'react';
import {
  AppBar, Toolbar, Typography, Grid, Paper, TextField, Button,
  List, ListItem, ListItemIcon, ListItemText, IconButton,
  Box,
  Container,
  Stack
} from '@mui/material';
import { Home, Person, Share, AdUnitsOutlined, Notifications, ContentCopy } from '@mui/icons-material';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import { fetchProfileData } from '../services/fetchProfileData';
import { useState } from 'react';
import Dashboard from '../components/profile/Dashboard';
import AccountSetting from '../components/profile/AccountSetting';
import AddCardIcon from '@mui/icons-material/AddCard';
import ManualDeposit from '../components/wallet/ManualDeposit';
import DepositHistory from '../components/wallet/DepositHistory';

function WalletPage() {

  const [userData, setUserData] = useState({});
  const [reload, setReload] = useState(false);

  const [currentTab, setCurrentTab] = useState('manual');


  const user = useContext(UserContext);
  useEffect(()=>{
    async function fetchData(){
      const response =  await fetchProfileData(user.userData.userId)
      setUserData(response);
    }
    fetchData();
  },[user]);

  console.log('userData', userData);
  
  const reloadFn = ()=>{
    setReload(!reload);
  }

  const getComponent = (userData)=>{
    if(currentTab==='manual'){
      return <ManualDeposit reloadFn={reloadFn} reload={reload} userData={userData}/>
    }else if(currentTab === 'depositHistory'){
      return <DepositHistory reloadFn={reloadFn} reload={reload} userData={userData}/>
    }
  };

  const getComponentName = ()=>{
    if(currentTab==='manual'){
      return 'Manual Deposit'
    }else if(currentTab === 'accountsetting'){
      return 'Account Settings'
    }
  }


  return (
    <Box style={{marginTop:100}}>
      <Container>
    <Grid container direction="column">
      {/* Header */}
      <AppBar position="static" color="transparent" elevation={0}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">{userData?.username}</Typography>
              <Typography variant="subtitle1">{userData?.email}</Typography>
            </Grid>
            <Grid item xs={12} md={6} container justifyContent="flex-end" spacing={2}>
              <Grid item>
                <Typography>Username</Typography>
                <Typography variant="body2">{userData?.username}</Typography>
              </Grid>
              {/* <Grid item>
                <Typography>Security</Typography>
                <Button color="error" size="small" variant="outlined">Less Secure</Button>
              </Grid> */}
              <Grid item>
                <Typography>Last Update</Typography>
                <Typography variant="body2">{userData?.updatedAt}</Typography>
              </Grid>
            </Grid>
          </Grid>
      </AppBar>

      <Box sx={{ width:'100%',display:'flex', justifyContent: 'center', alignItems:'center' }}>
      <Typography variant="h4" sx={{ my: 2 }}>Wallet</Typography>
      </Box>

      <Box sx={{width:'100%', display:'flex', flexDirection:'column'}}>
        <Typography variant='h5' sx={{my:2}}> Total Balance : 1000 $</Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Paper elevation={3}>
            <List>
              <ListItem button selected={currentTab==='manual'} onClick={()=>{setCurrentTab('manual')}}>
                <ListItemIcon><AddCardIcon /></ListItemIcon>
                <ListItemText primary="Manual Deposit" />
              </ListItem>
              <ListItem button selected={currentTab==='depositHistory'} onClick={()=>{setCurrentTab('depositHistory')}}>
                <ListItemIcon><Person /></ListItemIcon>
                <ListItemText primary="Deposit History" />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={9}>
            {getComponent(userData)}
        </Grid>
      </Grid>

        </Grid>
    </Container>
    </Box>
  );
}

export default WalletPage;