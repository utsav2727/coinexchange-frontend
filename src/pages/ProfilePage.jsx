import React, { useEffect } from 'react';
import {
  AppBar, Toolbar, Typography, Grid, Paper, TextField, Button,
  List, ListItem, ListItemIcon, ListItemText, IconButton,
  Box,
  Container
} from '@mui/material';
import { Home, Person, Share, AdUnitsOutlined, Notifications, ContentCopy } from '@mui/icons-material';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import { fetchProfileData } from '../services/fetchProfileData';
import { useState } from 'react';
import Dashboard from '../components/profile/Dashboard';
import AccountSetting from '../components/profile/AccountSetting';
import Referrals from '../components/profile/Referrals';
import Advertisements from '../components/profile/Advertisements';

function ProfilePage() {

  const [userData, setUserData] = useState({});
  const [reload, setReload] = useState(false);

  const [currentTab, setCurrentTab] = useState('dashboard');


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

  const getComponent = ()=>{
    if(currentTab==='dashboard'){
      return <Dashboard/>
    }else if(currentTab === 'accountsetting'){
      return <AccountSetting reloadFn={reloadFn} reload={reload} userData={userData}/>
    }else if(currentTab === 'referral'){
      return <Referrals/>
    }else if(currentTab === 'advertisements'){
      return <Advertisements/>
    }
  };

  const getComponentName = ()=>{
    if(currentTab==='dashboard'){
      return 'Dashboard'
    }else if(currentTab === 'accountsetting'){
      return 'Account Settings'
    }else if(currentTab === 'referral'){
      return 'Referrals'
    }else if(currentTab === 'advertisements'){
      return 'Advertisements'
    }
  }


  return (
    <Box style={{marginTop:100}}>
      <Container>
    <Grid container direction="column">
      {/* Header */}
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
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
        </Toolbar>
      </AppBar>

      <Typography variant="h4" sx={{ my: 2 }}>{getComponentName()}</Typography>

      <Grid container spacing={3}>
        {/* Sidebar */}
        <Grid item xs={12} md={3}>
          <Paper elevation={3}>
            <List>
              <ListItem button selected={currentTab==='dashboard'} onClick={()=>{setCurrentTab('dashboard')}}>
                <ListItemIcon><Home /></ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
              <ListItem button selected={currentTab==='accountsetting'} onClick={()=>{setCurrentTab('accountsetting')}}>
                <ListItemIcon><Person /></ListItemIcon>
                <ListItemText primary="Account Setting" />
              </ListItem>
              <ListItem button selected={currentTab==='referral'} onClick={()=>{setCurrentTab('referral')}}>
                <ListItemIcon><Share /></ListItemIcon>
                <ListItemText primary="Referral" />
              </ListItem>
              <ListItem button selected={currentTab==='advertisements'} onClick={()=>{setCurrentTab('advertisements')}}>
                <ListItemIcon><AdUnitsOutlined /></ListItemIcon>
                <ListItemText primary="Advertisements" />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={9}>
            {getComponent()}
        </Grid>
      </Grid>
    </Grid>
    </Container>
    </Box>
  );
}

export default ProfilePage;