import { Button, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import { updateProfileData } from '../../services/updateProfileData';

const AccountSetting = ({userData, reloadFn}) => {


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
      <Typography variant="h6" sx={{ mb: 1 }}>Complete your profile</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid component="form" onSubmit={handleSubmit} container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                defaultValue={userData?.username}
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
                defaultValue={userData?.email}
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
                defaultValue={userData?.phone}
                margin="normal"
                required
                fullWidth
                size="small"
                id="phone"
                label="Phone no."
                name="phone"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                defaultValue={userData?.firstName}
                margin="normal"
                required
                fullWidth
                size="small"
                id="firstName"
                label="First Name"
                name="firstName"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                defaultValue={userData?.lastName}
                margin="normal"
                required
                fullWidth
                size="small"
                id="lastName"
                label="Last Name"
                name="lastName"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                defaultValue={userData?.city}
                margin="normal"
                required
                fullWidth
                size="small"
                id="city"
                label="City"
                name="city"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Button 
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
                Update
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default AccountSetting