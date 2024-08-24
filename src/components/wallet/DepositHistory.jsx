import { Button, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import { updateProfileData } from '../../services/updateProfileData';

const DepositHistory = ({userData, reloadFn}) => {

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const body = {
          username: data.get('username'),
          email: data.get('email'),
          phone: data.get('phone'),
          firstName: data.get('firstName'),
          lastName: data.get('lastName'),
          city: data.get('city'),
        };
        updateProfileData(userData._id, body);
        window.location.reload();
        console.log('body', body);
      };
  return (
    <div>
      <Typography variant="h6" sx={{ mb: 1 }}>Deposit History</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          Deposit History
        </Grid>
      </Grid>
    </div>
  )
}

export default DepositHistory