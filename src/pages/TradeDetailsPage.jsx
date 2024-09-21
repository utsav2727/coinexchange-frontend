import React, { useEffect } from 'react';
import { Container, Grid, Typography, Paper, TextField, Button, Box, Divider, Stack, Avatar, List, ListItem, ListItemText, ListItemIcon, Card } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { createChatBuyService, tradeById } from '../services/tradeService';
import Footer from '../components/Footer';

const TradeDetailPage = () => {

    const params= useParams();
    console.log('params', params);

    const tradeId = params.tradeId;

    console.log('tradeId', tradeId);


    const [tradeData, setTradeData] = useState({});
    const [inputMsg, setInputMsg] = useState("");


    useEffect(()=>{

        async function fetchData(){

            const response = await tradeById(tradeId);
            console.log('response', response);
            setTradeData(response);
        }
        fetchData();

    },[]);

    console.log('tradeData', tradeData);

    const tradeRequest = async ()=>{

        const seller = tradeData.seller._id;
        const tradeId = tradeData._id;

        const body = {
            "message":inputMsg,
            "tradeId": tradeId,
            "seller":seller
          }
        await createChatBuyService(body);
    };


    return (
        <div style={{ marginTop: 100 }}>
            <Container sx={{ my: 4 }}>
                {/* Trade Details Section */}
                <Grid container spacing={1} >
                    <Box elevation={3} sx={{ p: 2, width: "100%" }}>
                        <Typography variant="h5" gutterBottom>
                            Buy {tradeData?.sourceAmount} USDT - Rate: {tradeData?.exchangeRate} INR/ USDT
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                            {tradeData?.seller?.username} wishes to sell to you.
                        </Typography>
                        {/* <Divider sx={{ mb: 2 }} /> */}
                    </Box>
                    <Grid item xs={12} md={8}>
                        <Box
                        component={Card}
                        variant='outlined'
                        >
                            <List>
                                <ListItem >
                                    <ListItemText sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} primary="Rate" secondary={`${tradeData?.exchangeRate} INR/ USDT`} />
                                </ListItem>
                                <Divider sx={{ mb: 2 }} />
                                <ListItem>
                                    <ListItemText sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} primary="Payment Method" secondary={`${tradeData.prefferedpaymentType || 'Not Specified'}`} />
                                </ListItem>
                                <Divider sx={{ mb: 2 }} />
                                <ListItem>
                                    <ListItemText sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} primary="User" secondary={`${tradeData?.seller?.username}`} />
                                </ListItem>
                                <Divider sx={{ mb: 2 }} />
                                <ListItem>
                                    <ListItemText sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} primary="Trade Value" secondary={`${tradeData?.sourceAmount}`} />
                                </ListItem>
                                <Divider sx={{ mb: 2 }} />
                                <ListItem>
                                    <ListItemText sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} primary="Payment Window" secondary={`${tradeData?.paymentWindow} minutes`} />
                                </ListItem>
                                <Divider sx={{ mb: 2 }} />
                                <ListItem>
                                    <ListItemText sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} primary="Avg. Trade Speed" secondary="0 Minutes" />
                                </ListItem>
                            </List>
                        </Box>
                    </Grid>

                    {/* Right Column in a separate Paper */}
                    <Grid item xs={12} md={4}>
                        <Box 
                        component={Card}
                        variant='outlined'
                        elevation={3} sx={{ p: 3 }}>
                            <Stack direction="column" alignItems="center" spacing={1}>
                                <Avatar sx={{ width: 56, height: 56 }}>A</Avatar>
                                <Typography variant="h6">{tradeData?.seller?.username}</Typography>
                                <ListItemText primary="Email Address Verified" />
                                <ListItemText primary="Mobile Number Verified" />
                                <ListItemText primary="Avg. Speed: 0 Minutes / Trade" />
                            </Stack>
                        </Box>
                    </Grid>
                </Grid>


                {/* Trade Form Section */}
                <Box component={Card} variant='outlined' elevation={3} sx={{ p: 3, mt: 2 }}>
                    <Typography variant="h6" gutterBottom sx={{mb:2}}>
                        Do you wish to buy?
                    </Typography>
                    {/* <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={5}>
                            <TextField
                                fullWidth
                                label="I will pay"
                                variant="outlined"
                                size='small'
                                InputProps={{ endAdornment: <Typography sx={{ ml: 1 }}>INR</Typography> }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2} textAlign="center">
                            <Typography>=</Typography>
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <TextField
                                fullWidth
                                label="And receive"
                                variant="outlined"
                                size='small'
                                InputProps={{ endAdornment: <Typography sx={{ ml: 1 }}>BTC</Typography> }}
                            />
                        </Grid>
                    </Grid> */}
                    <Stack direction={'column'} gap={2}>
                    <Typography variant='body1' fontWeight={600}>Seller message:</Typography>
                    <Typography variant='body2'>{(tradeData.chats && tradeData?.chats[0].message) || null}</Typography>
                    </Stack>
                    <TextField
                    value={inputMsg}
                    onChange={(e)=>{setInputMsg(e.target.value)}}
                        fullWidth
                        label="Write your contact message and other information for the trade here..."
                        variant="outlined"
                        multiline
                        rows={4}
                        sx={{ my: 2 }}
                    />
                    <Typography variant="caption" color="error">
                        Remember to write about your convenient payment methods in the message.
                    </Typography>
                    <Button onClick={()=> {tradeRequest()}} variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Send Trade Request
                    </Button>
                </Box>
            </Container>
            <Divider />
            <Footer />
        </div>
    );
};

export default TradeDetailPage;
