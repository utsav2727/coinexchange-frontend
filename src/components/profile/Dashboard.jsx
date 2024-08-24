import { ContentCopy, Notifications } from '@mui/icons-material'
import { Grid, IconButton, Paper, TextField, Typography } from '@mui/material'
import React from 'react'

const Dashboard = () => {
    return (
        <div>
            <Paper sx={{ p: 2, mb: 2 }}>
                <Grid container alignItems="center" spacing={1}>
                    <Grid item><Notifications color="primary" /></Grid>
                    <Grid item xs>
                        <Typography variant="h6">Please Allow / Reset Browser Notification</Typography>
                        <Typography variant="body2">
                            If you want to get push notification then you have to allow notification from your browser
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>

            {/* Referral Link */}
            <Typography variant="h6" sx={{ mb: 1 }}>Referral Link</Typography>
            <Paper sx={{ p: 2, mb: 2 }}>
                <Grid container alignItems="center">
                    <Grid item xs>
                        <TextField
                            fullWidth
                            variant="outlined"
                            value="https://script.viserlab.com/localcoins/demo?reference=cmdhawan"
                            InputProps={{ readOnly: true }}
                        />
                    </Grid>
                    <Grid item>
                        <IconButton color="primary">
                            <ContentCopy />
                        </IconButton>
                    </Grid>
                </Grid>
            </Paper>

            {/* Cryptocurrency Info */}
            <Typography variant="h6" sx={{ mb: 1 }}>Conversion Rate</Typography>
            <Grid container spacing={2}>
                {['BTC', 'ETH', 'USDT'].map((crypto) => (
                    <Grid item xs={12} sm={4} key={crypto}>
                        <Paper sx={{ p: 2, textAlign: 'center' }}>
                            <Typography variant="h6">{crypto}</Typography>
                            {/* Add more details here */}
                        </Paper>
                    </Grid>
                ))}
            </Grid>

        </div>
    )
}

export default Dashboard