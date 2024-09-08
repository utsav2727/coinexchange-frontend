import React, { useState, useEffect, useContext, useRef } from "react";
import { Paper, Typography, TextField, Button, IconButton, Box, Grid, Stack, Card, Avatar, ListItemText, Container, List, ListItem, Divider } from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import { UserContext } from "../context/userContext";
import { useParams } from "react-router-dom";
import { chatMsgs, createMsg } from "../services/chatServices";
import { formatDate } from "../helper/DateUtils";
import { tradeById } from "../services/tradeService";
import Footer from "../components/Footer";
import CachedIcon from '@mui/icons-material/Cached';

const ChatWindow = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [tradeData, setTradeData] = useState({});
    const [reload, setReload] = useState(false);
    const [sellerMsg, setSellerMsg] = useState("");

    const {tradeId, tradeItemId} = useParams();
    console.log('tradeId', tradeId, tradeItemId);

    const user = useContext(UserContext);

    console.log('user', user);

    useEffect(() => {
        async function getData(){
            let tradeData = await tradeById(tradeId);
            setTradeData(tradeData);
            console.log('tradeDtaa', tradeData);
            let data = await chatMsgs(tradeId, tradeItemId);
            console.log('data', data);
            const combineMsg = [];
            setSellerMsg(data.tradeChat.message);
            combineMsg.push({text: data.tradeChat.message,from: data.tradeChat.from, timestamp: formatDate(data.tradeChat.createdAt)})
        
            for(let item of data.lineItemChats){
                combineMsg.push({text: item.message,from: item.from, timestamp: formatDate(item.createdAt)})
            }
            console.log('combineMsg ', combineMsg);

            setMessages(combineMsg);
        }
        
        getData();
    }, [reload]);

    const handleSendMessage =async (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            const response = await createMsg(tradeData.seller._id, newMessage, tradeItemId);
            if(response != null)
                setReload((prev)=> !prev);
            setNewMessage("");
            // setMessages([...messages, { text: newMessage, timestamp: new Date().toISOString() }]);
            // setNewMessage("");
        }
    };

    const chatBoxRef = useRef(null);


        useEffect(() => {
            if (chatBoxRef.current) {
              chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
            }
          }, [messages]);

    const RenderChat = ()=>{
        
        return (
            <Box
              component={Card}
              variant="outlined"
              ref={chatBoxRef}
              sx={{
                minHeight:500,
                flex: 1,
                overflowY: "auto",
                marginBottom: 1,
                paddingX:2,
                display: 'flex',
                flexDirection: 'column-reverse'
              }}
            >
              {messages.slice().reverse().map((message, index) => {
                let myMsg = message.from._id === user.userData.userId;
                return (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      marginBottom: 1,
                      padding: 1,
                      alignItems: 'center',
                      justifyContent: myMsg ? 'flex-end' : 'flex-start'
                    }}
                  >
                    <Avatar sx={{ width: 28, height: 28, marginTop: 1, marginRight: 1 }}>
                      {message.from.username ? message.from.username[0].toUpperCase() : 'A'}
                    </Avatar>
                    <Paper sx={{ padding: 1 }}>
                      <Typography variant="body2">{message.text}</Typography>
                      <Typography variant="caption" display="block" fontSize="10px">
                        {message.timestamp}
                      </Typography>
                    </Paper>
                  </Box>
                );
              })}
            </Box>
          );
    }

    return (
        <div style={{ marginTop: "100px" }}>
            <Container sx={{ mt: 4, mb:4 }}>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={8}>
                        <Paper style={{ padding: 16, height: "620px", display: 'flex', flexDirection: 'column' }}>
                            <Stack direction={'row'} paddingY={1} alignItems={'center'} justifyContent={'space-between'}>
                            <Typography variant="h6" gutterBottom style={{ color: "primary" }}>
                                {user.userData?.userName}
                            </Typography>
                            <IconButton sx={{padding:1}} onClick={()=>{setReload((prev)=> !prev)}} color="primary">
                                <CachedIcon />
                            </IconButton>
                            </Stack>
                            <RenderChat/>
                            <form style={{ display: "flex", alignItems: "center", marginTop: 'auto' }}>
                                <TextField
                                    fullWidth
                                    placeholder="Type here"
                                    variant="outlined"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    style={{ marginRight: 8 }}
                                />
                                <Button type="submit" variant="contained" color="primary" onClick={(e)=>{handleSendMessage(e)}} style={{ backgroundColor: "#ff9800" }}>
                                    Send
                                </Button>
                            </form>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Box
                            component={Card}
                            variant='outlined'
                            textAlign={"center"}
                        >

                            <ListItem >
                                <ListItemText sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} primary="Seller Id:" secondary={tradeData?.seller?.username} />
                            </ListItem>
                            <Divider sx={{ mb: 2 }} />

                            <Box
                                component={Card}
                                variant='outlined'
                                textAlign={"center"}
                                marginx={"6px"}
                                color="error"
                            >
                                <h5>Seller Message: </h5>
                                <h5>{sellerMsg}</h5>
                            </Box>

                            <Box
                            component={Card}
                            variant='outlined'
                            textAlign={"left"}
                            marginTop={"15px"}
                            padding={2}
                            margin={"6px"}
                                color="error"
                            > 
                            <h5>Trade Informations</h5>
                            <ListItem sx={{ display: 'flex', justifyContent: 'space-between', flexDirection:'column', width:'100%' }}>
                                <ListItemText sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width:'100%' }} primary="Trade Amount" secondary={tradeData.sourceAmount}/>
                                <ListItemText sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width:'100%' }} primary="Exchange Rate" secondary={tradeData.exchangeRate}/>
                                <ListItemText sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width:'100%' }} primary="Posted Date" secondary={formatDate(tradeData.createdAt)}/>
                            </ListItem>         
                            </Box>

                            <div style={{ display: "flex", flexDirection:'column', padding:8 }}>
                                <Button variant="contained" color="secondary" fullWidth sx={{ mt: 2 }} size="small" style={{ marginRight: 5 }}>
                                    I Have Paid
                                </Button>
                                <Button variant="contained" color="error" fullWidth sx={{ mt: 2 }} size="small" style={{ marginRight: 5 }}>
                                    Cancel
                                </Button>
                                
                            </div>

                            
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <Divider />
            <Footer />
        </div>
    );
};

export default ChatWindow;

