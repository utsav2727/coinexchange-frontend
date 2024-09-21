import React, { useState, useEffect, useContext, useRef } from "react";
import { Paper, Typography, TextField, Button, IconButton, Box, Grid, Stack, Card, Avatar, ListItemText, Container, List, ListItem, Divider, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import { UserContext } from "../context/userContext";
import { useParams } from "react-router-dom";
import { chatMsgs, createMsg } from "../services/chatServices";
import { formatDate } from "../helper/DateUtils";
import { tradeById, tradeItemsById, cancelTradeLineItem, paidTradeLineItem, receivedTradeLineItem } from "../services/tradeService";
import Footer from "../components/Footer";
import CachedIcon from '@mui/icons-material/Cached';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import SendIcon from '@mui/icons-material/Send';
import io from "socket.io-client";

const socket = io("http://localhost:6002");


const ChatWindow = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [tradeData, setTradeData] = useState({});
    const [reload, setReload] = useState(false);
    const [sellerMsg, setSellerMsg] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [openCancelDialog, setOpenCancelDialog] = useState(false);
    const [tradeStatus, setTradeStatus] = useState("Inprogress");

    const [whoamI, setWhoamI] = useState('buyer');

    const {tradeId, tradeItemId} = useParams();
    console.log('tradeId', tradeId, tradeItemId);

    const user = useContext(UserContext);

    console.log('user', user);

    console.log('message', messages);

    useEffect(() => {
        async function getData(){

            let tradeData = await tradeById(tradeId);
            setTradeData(tradeData);

            const tradeItemData = await tradeItemsById(tradeItemId);
            console.log("tradeItemData", tradeItemData);
            setTradeStatus(tradeItemData.status);

            console.log('Utsav1', user);

            console.log('Utsav1', tradeItemData.buyer);
            console.log('Utsav1', user.userData.userId);

            if(tradeItemData.buyer == user.userData.userId){
                setWhoamI('buyer');
            }else{
                setWhoamI('seller');
            }
            console.log('tradeDtaa', tradeData);
            let data = await chatMsgs(tradeId, tradeItemId);
            console.log('data', data);
            const combineMsg = [];
            setSellerMsg(data.tradeChat.message);

            console.log('data.tradeChat.attachment', data.lineItemChats);
            combineMsg.push({text: data.tradeChat.message,from: data.tradeChat.from, attachment:data.tradeChat.attachment || undefined , timestamp: formatDate(data.tradeChat.createdAt)})
        
            for(let item of data.lineItemChats){
                combineMsg.push({text: item.message,from: item.from, attachment:item.attachment || undefined, timestamp: formatDate(item.createdAt)})
            }
            console.log('combineMsg ', combineMsg);

            setMessages(combineMsg);
        }
        
        getData();
    }, [reload,user]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
    };

    console.log('imageFile', imageFile);
    
    const handleSendMessage = async (e) => {
        e.preventDefault();
        
        // Check if it's a text message or an image message
        if (newMessage.trim() || imageFile) {
            
            let formData = new FormData();
            formData.append('message', newMessage);  // Append the message as text
            formData.append('tradeLineItem', tradeItemId);  // Append tradeLineItem ID
            if (imageFile) {
                formData.append('image', imageFile);  // Attach the image file
            }
    
            let response;
            // Just pass formData to createMsg, no need to send individual arguments
            if (tradeData.type === "buy") {
                formData.append('to', tradeData.buyer._id);  // Append the recipient's ID
            } else {
                formData.append('to', tradeData.seller._id);
            }
    
            // Pass the complete formData to the API call
            response = await createMsg(formData);

            try {
                socket.emit("sendMessage", {
                    tradeItemId,
                    message:{attachment: undefined,
                    from:{
                        _id:user.userData.userId,
                        username:user.userData.username
                    },
                    text:newMessage,
                    timestamp:Date.now()}
                });
            } catch (error) {
                console.log(error);
            }

            
            
            if (response) {
                setReload((prev) => !prev);
                setNewMessage("");
                setImageFile(null);  // Clear the image file
            }
        }
    };

    const chatBoxRef = useRef(null);
    useEffect(() => {
            if (chatBoxRef.current) {
              chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
            }
          }, [messages]);

    useEffect(() => {
        socket.emit("joinRoom", { tradeItemId, userId: user.userData.userId });

        // Listen for messages in the room
        socket.on("receiveMessage", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
        });

        socket.on("statusUpdate", (message) => {
            setTradeStatus(message);
            });

        return () => {
              socket.off("receiveMessage");
              socket.off("statusUpdate");
            };
    }, []);      

    // Function to handle cancel trade action
    const handleCancelTrade = async () => {
        const response = await cancelTradeLineItem(tradeItemId);
        socket.emit("statusUpdate", {
            tradeItemId,
            message:"Cancelled"
        });
        if (response) {
            setReload((prev) => !prev);  // Reload data after cancelling
        }
        setOpenCancelDialog(false);  // Close dialog after action
    };

    // Open confirmation dialog for cancelling trade
    const handleOpenCancelDialog = () => {
        setOpenCancelDialog(true);
    };

    // Close the cancel dialog without action
    const handleCloseCancelDialog = () => {
        setOpenCancelDialog(false);
    };      

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
                        {console.log('message', message)}
                    {message.text && <Typography variant="body2">{message.text}</Typography>}
                    {message.attachment && (
                        <img
                            src={`${(process.env.REACT_APP_ENV=='development')? 'http://localhost:6001':process.env.REACT_APP_BACKEND_CONTEXT}/${message.attachment}`}  // Display the uploaded image
                            alt="Sent"
                            style={{ maxWidth: '200px', maxHeight: '200px' }}
                        />
                    )}
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

    const handlePaid = async ()=>{
        await paidTradeLineItem(tradeItemId);
        socket.emit("statusUpdate", {
            tradeItemId,
            message:"Buyer Paid"
        });
    }

    const handleReceived = async ()=>{
        let data = await receivedTradeLineItem(tradeItemId);
        if(data){
            socket.emit("statusUpdate", {
                tradeItemId,
                message:"Closed"
            });
        }
    }

    return (
        <div style={{ marginTop: "100px" }}>
            <Container sx={{ mt: 4, mb:4 }}>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={8}>
                        <Paper style={{ padding: 16, height: "680px", display: 'flex', flexDirection: 'column' }}>
                            <Stack direction={'row'} paddingY={1} alignItems={'center'} justifyContent={'space-between'}>
                            <Typography variant="h6" gutterBottom style={{ color: "primary" }}>
                                {user.userData?.userName}
                            </Typography>
                            <IconButton sx={{padding:1}} onClick={()=>{setReload((prev)=> !prev)}} color="primary">
                                <CachedIcon />
                            </IconButton>
                            </Stack>
                            <RenderChat/>
                            {tradeStatus!=="Cancelled" && <form style={{ display: "flex", alignItems: "end", marginTop: 'auto', gap:4, flexWrap:'wrap' }} onSubmit={handleSendMessage}>
                                <Box sx={{ width: { xs: '100%', md: '70%' } }}>
                                    {imageFile &&  <Typography variant="caption">Image is added!</Typography>}
                                <TextField
                                    fullWidth
                                    placeholder="Type here"
                                    variant="outlined"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    style={{ marginRight: 8 }}
                                />
                                </Box>
                                <input
                                    accept="image/*"
                                    id="image-upload"
                                    type="file"
                                    style={{ display: 'none' }}
                                    onChange={(e) => handleImageUpload(e)}
                                />
                                <label htmlFor="image-upload">
                                    <Button variant="outlined" component="span" style={{ marginRight: 8 }}>
                                        <CameraAltIcon/>
                                    </Button>
                                </label>
                                <Button type="submit" variant="contained" color="primary" style={{ backgroundColor: "#ff9800" }}>
                                    Send <SendIcon fontSize="s" sx={{mx:1}}/>
                                </Button>
                            </form>}
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Box
                            component={Card}
                            variant='outlined'
                            textAlign={"center"}
                        >

                            <ListItem >
                                {whoamI=="buyer" && <ListItemText sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} primary="Seller Id:" secondary={tradeData?.seller?.username} />}
                                {whoamI=="seller" && <ListItemText sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} primary="Buyer Id:" secondary={tradeData?.buyer?.username} />}
                                
                            </ListItem>
                            <Divider sx={{ mb: 2 }} />

                            <Box
                                component={Card}
                                variant='outlined'
                                textAlign={"center"}
                                marginx={"6px"}
                                color="error"
                            >
                                <h5>Trade Message: </h5>
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
                                <ListItemText sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width:'100%' }} primary="Trade Status" secondary={tradeStatus}/>
                            </ListItem>         
                            </Box>

                           { (tradeStatus!=="Cancelled" && tradeStatus!=="Closed") && <div style={{ display: "flex", flexDirection:'column', padding:8 }}>
                                {whoamI === "buyer" && tradeStatus !=="Buyer Paid" && (
                                        <>
                                            <Typography variant="caption" sx={{ mb: 1 }}>
                                                <b>Note: </b> Once you have paid the seller, click the button below to notify the seller for payment release.
                                            </Typography>
                                            <Button onClick={()=>{handlePaid()}}  variant="contained" color="secondary" fullWidth sx={{ mt: 2 }} size="small" style={{ marginRight: 5 }}>
                                                I Have Paid
                                            </Button>
                                        </>
                                        )}
                                {whoamI === "seller" && (
                                    <>
                                        <Typography variant="caption" sx={{ mb: 1 }}>
                                            <b>Note: </b>After verification from your side, release payment to the buyer by clicking the button below.
                                        </Typography>
                                        <Button onClick={()=>{handleReceived()}} variant="contained" color="secondary" fullWidth sx={{ mt: 2 }} size="small" style={{ marginRight: 5 }}>
                                            I Have Received
                                        </Button>
                                    </>
                                )}
                                {tradeStatus !=="Buyer Paid" && <Button variant="contained" onClick={handleOpenCancelDialog} color="error" fullWidth sx={{ mt: 2 }} size="small" style={{ marginRight: 5 }}>
                                    Cancel
                                </Button>}
                                <Button variant="contained" onClick={()=>{ window.location.href = '/support'}} color="info" fullWidth sx={{ mt: 2 }} size="small" style={{ marginRight: 5 }}>
                                    Contact to Support
                                </Button>
                                
                            </div>}
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <Divider />
            <Footer />
            {/* Cancel Confirmation Dialog */}
            <Dialog
                open={openCancelDialog}
                onClose={handleCloseCancelDialog}
                aria-labelledby="cancel-dialog-title"
                aria-describedby="cancel-dialog-description"
            >
                <DialogTitle id="cancel-dialog-title">Cancel Trade</DialogTitle>
                <DialogContent>
                    <DialogContentText id="cancel-dialog-description">
                        Are you sure you want to cancel this trade item? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseCancelDialog} color="primary">No</Button>
                    <Button onClick={handleCancelTrade} color="error" autoFocus>Yes</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ChatWindow;

