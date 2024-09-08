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
import CachedIcon from '@mui/icons-material/Cached';
import AddCardIcon from '@mui/icons-material/AddCard';
import ManualDeposit from '../components/wallet/ManualDeposit';
import DepositHistory from '../components/wallet/DepositHistory';
import { checkBalance } from '../services/walletService';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import Withdraw from '../components/wallet/Withdraw';
import WithdrawHistory from '../components/wallet/WithdrawHistory';
import { useSearchParams } from "react-router-dom";

function WalletPage() {

  const [userData, setUserData] = useState({});
  const [reload, setReload] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  console.log('searchparams', searchParams);
  let currentPage = searchParams.get("type");

  console.log('currentPage', currentPage);

  const [currentTab, setCurrentTab] = useState(currentPage || 'manual');

  const [ balance, setBalance] = useState(0);

  

  


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
    }else if(currentTab === 'withdraw'){
      return <Withdraw reloadFn={reloadFn} reload={reload} userData={userData}/>
    }else if(currentTab === 'withdrawHistory'){
      return <WithdrawHistory reloadFn={reloadFn} reload={reload} userData={userData}/>
    }
  };

  useEffect(()=>{
    async function fetchData(){
      let response = await checkBalance();
      console.log('response', response);
      setBalance(response.balance)
    }
    fetchData();
  },[reload,currentPage])


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

      <Box sx={{width:'100%', display:'flex', flexDirection:'row', alignItems:'center'}}>
        <Typography variant='h5' sx={{my:2}}> Total Balance : {balance} $</Typography>
        <IconButton onClick={()=>{
          setReload(true)
          setTimeout(() => setReload(false), 1000);
          }} sx={{p:2, m:0}}>
        <CachedIcon 
        sx={{
          m: 0,
          color: 'primary',
          animation: reload ? 'rotate 1s linear infinite' : 'none',
          '@keyframes rotate': {
            '0%': {
              transform: 'rotate(0deg)',
            },
            '100%': {
              transform: 'rotate(360deg)',
            },
          },
        }}
        color='primary'/>     
        </IconButton>
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
                <ListItemIcon><HistoryToggleOffIcon /></ListItemIcon>
                <ListItemText primary="Deposit History" />
              </ListItem>
              <ListItem button selected={currentTab==='withdraw'} onClick={()=>{setCurrentTab('withdraw')}}>
                <ListItemIcon><PriceCheckIcon /></ListItemIcon>
                <ListItemText primary="Withdraw" />
              </ListItem>
              <ListItem button selected={currentTab==='withdrawHistory'} onClick={()=>{setCurrentTab('withdrawHistory')}}>
                <ListItemIcon><HistoryToggleOffIcon /></ListItemIcon>
                <ListItemText primary="Withdraw History" />
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