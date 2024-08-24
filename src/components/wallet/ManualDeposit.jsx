import { Button, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import { updateProfileData } from '../../services/updateProfileData';

const ManualDeposit = ({userData, reloadFn}) => {


    console.log(userData);

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
      <Typography variant="h6" sx={{ mb: 1 }}>Manual Deposit</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid component="form" onSubmit={handleSubmit} container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                value={userData?.username||""}
                margin="normal"
                required
                fullWidth
                size="small"
                id="username"
                label="User name"
                name="username"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                value={userData?.email || ""}
                margin="normal"
                required
                fullWidth
                size="small"
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                size="small"
                id="transation"
                label="Transaction Id"
                name="transactionId"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                size="small"
                id="amount"
                label="Amount"
                name="amount"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Button 
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
                Add
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default ManualDeposit