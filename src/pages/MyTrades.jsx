import React, { useEffect } from 'react';
import { Container, Grid, Typography, Paper, TextField, Button, Box, Divider, Stack, Avatar, List, ListItem, ListItemText, ListItemIcon, Card, CardContent, CardActions } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { mySellTrades, myTrades } from '../services/myTradesService';

const MyTrades = () => {

    const [tradeData, setTradeData] = useState([]);
    const [sellTradeData, setSellTradeData] = useState([]);

    useEffect(()=>{

        async function fetchData(){
            const data = await myTrades();
            console.log('data', data);
            setTradeData(data);
            const sellData = await mySellTrades();
            setSellTradeData(sellData)
        }
        fetchData();

    },[]);



    return (
        <div style={{ marginTop: 100 }}>
            <Container sx={{ mt: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                    My Current Trades
                </Typography>
                <Typography variant='h5' component="h4" gutterBottom>Buy Trades</Typography>
                <Grid container spacing={3}>
                    {tradeData.map((trade) => (
                        <Grid item xs={12} sm={6} md={4} key={trade.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        Seller: {trade.sellerName}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        Price: ${trade.amount}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        Exchange Rate: {trade.exchangeRate}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button 
                                        size="small" 
                                        color="primary"
                                        onClick={() => {
                                            window.location.href = `/tradeChat/${trade.tradeId}/${trade._id}`;
                                        }}
                                    >
                                        View Details
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Typography variant='h5' sx={{my:2}} component="h4" gutterBottom>Sell Trades</Typography>
                <Grid container spacing={3}>
                    {sellTradeData.map((trade) => (
                        <Grid item xs={12} sm={6} md={4} key={trade.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        Buyer: {trade.buyer}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        Price: ${trade.amount}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        Exchange Rate: {trade.exchangeRate}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button 
                                        size="small" 
                                        color="primary"
                                        onClick={() => {
                                            window.location.href = `/tradeChat/${trade.tradeId}/${trade._id}`;
                                        }}
                                    >
                                        View Details
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    );
};

export default MyTrades;
