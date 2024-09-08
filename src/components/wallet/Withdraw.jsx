import { Button, Grid, TextField, Typography,Paper } from '@mui/material'
import React from 'react';
import { manualDeposit } from '../../services/depositService';
import { withdraw } from '../../services/withdrawService';

const Withdraw = ({userData, reloadFn}) => {


    console.log(userData);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const body = {
          amount: data.get('amount'),
          transactionMode: "manual",
          transactionRef: data.get('transactionRef'),
        };

        await withdraw(body);
        // reloadFn();
        console.log('body', body);
      };
  return (
    <div>
      <Typography variant="h6" sx={{ mb: 1 }}>Withdraw</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
        <Paper sx={{ p: 2, mb: 2 }}>
                <Grid container alignItems="center" spacing={1}>
                    <Grid item xs>
                    <Typography variant="body2">
                          Kindly please enter your wallet address below. payment will be proccessed in 1 working day.
                    </Typography>
                    </Grid>
                </Grid>
            </Paper>
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
                id="transactionRef"
                label="Wallet address"
                name="transactionRef"
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
                withdraw
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default Withdraw