import { Box, Button, Card, Checkbox, Container, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControlLabel, FormGroup, Paper, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { createBuyTrade, createChatBuyServiceSell, createSellTrade, tradeList } from '../services/tradeService';
import Footer from '../components/Footer';
import { checkBalance } from '../services/walletService';

const TradePage = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const [tradeLists,setTradeLists] = useState([]);
  const [userBalance, setUserBalance]= useState(0);

  const [open, setOpen] = useState(false);
  const [selectedSell, setSelectedSell] = useState({});
  const [paymentDetails, setPaymentDetails] = useState('');

  const handleOpen = (item) => {
    setOpen(true);
    setSelectedSell(item);
  };
  const handleClose = () => setOpen(false);

  console.log('selected', selectedSell);
  // Handle form submit
  const handleSubmit = async () => {
    // Add your submit logic here
    console.log('Payment details:', paymentDetails);

    await tradeRequest(selectedSell);
    handleClose();
  };

  console.log('searchparams', searchParams);
  let currentPage = searchParams.get("req");
  const [selectedTab, setSelectedTab] = useState(currentPage || 'sell');

  const navigate = useNavigate();


  const setFields = (selectedTab)=>{
    if(selectedTab == 'buy'){
      return {title:'Create Buy Ad', buttonText:'Buy Now', listingTitle:'Sellers List'}
    }else{
      return {title:'Create Sell Ad', buttonText:'Sell Now', listingTitle:'Buyers Requests'}
    }
  }

  const tradeRequest = async (item)=>{

    console.log('item', item);
    const buyer = item.buyer._id;
    const tradeId = item._id;

    const body = {
        "message":paymentDetails,
        "tradeId": tradeId,
        "buyer":buyer
      }
    await createChatBuyServiceSell(body);
};

  const renderInputs = ()=>{
    if(selectedTab == 'buy'){
      return <Box component="form" onSubmit={buyTradeClick}>
      <Paper sx={{display:'flex',flexDirection:'column', width:'100%', px:4, py:2}}>
        <Box sx={{ display:'flex',flexDirection:{xs:'column', md:'row'},  gap:{xs:0, md:6},justifyContent:'space-between'}}>
      <TextField
          margin="normal"
          required
          fullWidth
          size="small"
          id="usdtamount"
          label="USDT Amount"
          name="USDT Amount"
          helperText="Enter your wish to buy USDT"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          size="small"
          id="inr"
          label="Enter your buying exchange Rate in INR"
          name="exchangeRate"
          helperText="Exchange Rate : example - 90"
        />
        </Box>
        <Box>
          <Button
          variant='contained'
          sx={{mt:2}}
          type='submit'
          >{setFields(selectedTab).buttonText}</Button>
        </Box>
      </Paper>
    </Box>
    }else{
      return <Box component="form" onSubmit={sellTradeClick} >
      <Paper sx={{display:'flex',flexDirection:'column', width:'100%', p:4}}>
        <Box sx={{ display:'flex',flexDirection:{xs:'column', md:'row'},  gap:{xs:0, md:6},justifyContent:'space-between'}}>
      <TextField
          margin="normal"
          required
          fullWidth
          size="small"
          id="usdtamount"
          label="USDT Amount"
          name="USDT Amount"
          helperText={`Available USDT Balance : ${userBalance}$`}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          size="small"
          id="inr"
          label="Enter Selling Price in INR"
          name="exchangeRate"
          helperText="Exchange Rate : example - 90"
        />
        </Box>
        <Box>
        <TextField
          margin="normal"
          required
          multiline={true}
          rows={2}
          fullWidth
          size="small"
          id="banking"
          label="Enter your Banking Details or Bank UPI Details"
          name="banking"
        />
        <Box sx={{ mt: 2, display:'flex', alignItems:'center', gap:2 }}>
            <Typography>Accept payment in</Typography>
            <FormGroup sx={{display:'flex', flexDirection:'row'}}>
              <FormControlLabel
                control={<Checkbox name="imps" />}
                label="IMPS"
                id="IMPS"
                name="IMPS"
              />
              <FormControlLabel
                control={<Checkbox name="bankTransfer" />}
                label="Bank"
                id="Bank"
                name="Bank"
              />
              <FormControlLabel
                control={<Checkbox name="neft" />}
                label="NEFT"
                id="NEFT"
                name="NEFT"
              />
            </FormGroup>
          </Box>
        </Box>
        <Box>
          <Button
          variant='contained'
          sx={{mt:2}}
          type='submit'
          >{setFields(selectedTab).buttonText}</Button>
        </Box>
      </Paper>
    </Box>
    }
  }

  const sellTradeClick = async (event)=>{

    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const imps= data.get('imps');
    const bankTransfer=data.get('bankTransfer');
    const neft=data.get('neft');
    console.log('data--', data.get('imps'));
    console.log('data--', data.get('bankTransfer'));
    console.log('data--', data.get('neft'));

    let acceptPayment ='';

    if(imps!= null){
      acceptPayment = acceptPayment + 'IMPS, ';
    }
    if(bankTransfer!= null){
      acceptPayment = acceptPayment + 'BANK Transfer, ';
    }
    if(neft!= null){
      acceptPayment = acceptPayment + 'NEFT';
    }

    console.log('acceptPayment',acceptPayment);

    const body = {
      "type":"sell",
      "sourceAmount":data.get('USDT Amount'),
      "exchangeRate":data.get('exchangeRate'),
      "message":data.get('banking'),
      "prefferedpaymentType":acceptPayment
    };
    console.log('sell ', body);

    const response = await createSellTrade(body);
    console.log('response', response);
  }

  const buyTradeClick = async (event)=>{
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = {
      "type":"buy",
      "sourceAmount":data.get('USDT Amount'),
      "exchangeRate":data.get('exchangeRate')
    };
    console.log('buy ', body);

    const response = await createBuyTrade(body);
    console.log('response', response);
  }

  const renderLists= ()=>{
    if(selectedTab == 'buy'){
      return <Box sx={{display:'flex', flexWrap:'wrap', gap:2}}>
      {
        tradeLists.map((item)=>
        <Box
      component={Card}
      variant="outlined" 
      sx={{
        backgroundColor:'primary.main',
        width:{ xs:'100%', md:'48%' }
      }}>
          <Box sx={{p:4, width:'100%'}}>
            <Stack sx={{justifyContent:'space-between', alignItems:'center'}} direction={'row'} spacing={2}>
              <Box sx={{display:'flex', flexDirection:'column'}}>
                <Typography variant='overline' color='secondary'>seller :   {item?.seller?.username}</Typography>
                <Typography variant='subtitle2'>{item.sourceAmount} USDT - Rate: {item.exchangeRate} INR/ USDT</Typography> 
                <Typography variant='overline'>Payable amount is {item.sourceAmount*item.exchangeRate} INR</Typography> 
              </Box>
              <Box>
                <Button
                variant='outlined'
                color='primary'
                onClick={()=>{window.location.href = `/trade-details/buy/${item._id}`}}
                >
                  Buy
                </Button>
              </Box>
            </Stack>
          </Box>    
      </Box>)}
      
    </Box>
    }else{
      return <Box sx={{display:'flex', flexWrap:'wrap', gap:2}}>
      {tradeLists.map((item)=><Box
      component={Card}
      variant="outlined" 
      sx={{
        backgroundColor:'primary.main',
        width:{ xs:'100%', md:'48%' }
      }}>
          <Box sx={{p:4, width:'100%'}}>
            <Stack sx={{justifyContent:'space-between', alignItems:'center'}} direction={'row'} spacing={2}>
              <Box sx={{display:'flex', flexDirection:'column'}}>
              <Typography variant='overline' color='secondary'>buyer :   {item?.buyer?.username}</Typography>
                <Typography variant='subtitle2'>{item.sourceAmount} USDT - Rate: {item.exchangeRate} INR/ USDT</Typography> 
                <Typography variant='overline'>Payout amount is {item.sourceAmount * item.exchangeRate} INR</Typography> 
              </Box>
              <Box>
                <Button
                variant='outlined'
                color='primary'
                onClick={()=>{handleOpen(item)}}
                >
                  Sell
                </Button>
              </Box>
            </Stack>
          </Box>    
      </Box>)}
    </Box>
    }
  }

  useEffect(()=>{
    async function fetchData (){

      let type;
      if(selectedTab =='buy'){
        type="sell";
      }else{
        type="buy";
      }

      const res = await tradeList(type);
      setTradeLists(res);
      console.log('res', res);

      const balance = await checkBalance();
      console.log('balance', balance)
      if(balance) setUserBalance(balance?.balance);
    }
    fetchData()
  },[selectedTab]);


  return (
    <div>
        <Box style={{marginTop:100}}>
        <Container sx={{my:4}}>
                <Stack>
                    <Box sx= {{display:'flex', gap:2, my:2}}>
                    <Button variant={ selectedTab =='sell'? 'contained': 'outlined'}
                    onClick={()=>{
                      navigate('/trade?sell')
                      setSelectedTab('sell')
                    }}
                    >
                          Sell
                        </Button>
                        <Button variant={ selectedTab =='buy'? 'contained': 'outlined'}
                        onClick={()=>{
                          navigate('/trade?buy')
                          setSelectedTab('buy')
                        }}
                        >
                          Buy
                        </Button>
                    </Box>
                    <Box>
                    <Typography variant="h4" sx={{ my: 2 }}>{setFields(selectedTab).title}</Typography>
                    </Box>
                    {renderInputs()}
                    <Box>
                    <Divider sx={{my:2, background:'black'}}/>
                      <Typography variant="h6" sx={{ my: 2 }}>{setFields(selectedTab).listingTitle}:</Typography>
                    </Box>
                    {renderLists()}
                </Stack>
                <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Sell Trade Information</DialogTitle>
        <DialogContent>
          <Typography variant='body2'>
            Note: For sell trade, you should have sufficient available trade balance. Your amount will go on hold till the trade is complete.
          </Typography>
          <Typography variant='body2' sx={{ mt: 2 }}>
            Current Balance: {userBalance} $
          </Typography>
          <Typography variant='body2' sx={{ mt: 2 }}>
            Buyer Request:  {selectedSell.sourceAmount ? selectedSell.sourceAmount : null}$
          </Typography>
          <TextField
          margin="normal"
          required
          multiline={true}
          rows={2}
          fullWidth
          size="small"
          id="banking"
          label="Enter your Banking Details or Bank UPI Details for payment"
          name="banking"
          onChange={(e) => setPaymentDetails(e.target.value)}
        />
        </DialogContent>
        {!(selectedSell.sourceAmount<=userBalance) ? <Typography sx={{ml:4, color:'red'}}>Insufficient balance</Typography>: null}
        <DialogActions>
          <Button onClick={handleClose} color='secondary'>Cancel</Button>
          <Button onClick={handleSubmit} disabled={!(selectedSell.sourceAmount<=userBalance)} variant='contained' color='primary'>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
        </Container>
        <Divider />
        <Footer />
        </Box>
    </div>
  )
}

export default TradePage