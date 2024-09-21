import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { mypostedTrade, mySellTrades, myTrades } from '../services/myTradesService';
import { formatDate } from '../helper/DateUtils';

const MyTrades = () => {
  const [tradeData, setTradeData] = useState([]);
  const [sellTradeData, setSellTradeData] = useState([]);
  const [mytrades, setMytrades] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await myTrades();
      setTradeData(data);

      const sellData = await mySellTrades();
      setSellTradeData(sellData);

      const mypostedTradeData = await mypostedTrade();
      setMytrades(mypostedTradeData);
    }
    fetchData();
  }, []);

  const tradeColumns = [
    { field: 'sellerName', headerName: 'Seller', flex: 1 },
    { field: 'amount', headerName: 'Price', flex: 1 },
    { field: 'exchangeRate', headerName: 'Exchange Rate', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: (params) => (
        <Button
          size="small"
          color="primary"
          onClick={() => {
            window.location.href = `/tradeChat/${params.row.tradeId}/${params.row._id}`;
          }}
        >
          View Details
        </Button>
      ),
    },
  ];

  const sellTradeColumns = [
    { field: 'buyer', headerName: 'Buyer', flex: 1 },
    { field: 'amount', headerName: 'Price', flex: 1 },
    { field: 'exchangeRate', headerName: 'Exchange Rate', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: (params) => (
        <Button
          size="small"
          color="primary"
          onClick={() => {
            window.location.href = `/tradeChat/${params.row.tradeId}/${params.row._id}`;
          }}
        >
          View Details
        </Button>
      ),
    },
  ];

  const myTradesColumns = [
    { field: 'type', headerName: 'Type', flex: 1 },
    { field: 'sourceAmount', headerName: 'Price', flex: 1 },
    { field: 'exchangeRate', headerName: 'Exchange Rate', flex: 1 },
    { field: 'createdAt', headerName: 'Posted Date', flex: 1, valueGetter: (params) => formatDate(params.value) },
    { field: 'status', headerName: 'Status', flex: 1, valueGetter: (params) => params.row?.status?.name },
  ];

  return (
    <div style={{ marginTop: 100 }}>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Current Trades
        </Typography>

        {/* Ongoing Buy Trades */}
        <Typography variant="h5" component="h4" gutterBottom>
          Ongoing Buy Trades
        </Typography>
        {tradeData.length === 0 ? (
          <Box sx={{ my: 4 }}><Typography>No records found!</Typography></Box>
        ) : (
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={tradeData}
              columns={tradeColumns}
              getRowId={(row) => row._id}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </Box>
        )}

        {/* Ongoing Sell Trades */}
        <Typography variant="h5" sx={{ my: 2 }} component="h4" gutterBottom>
          Ongoing Sell Trades
        </Typography>
        {sellTradeData.length === 0 ? (
          <Box sx={{ my: 4 }}><Typography>No records found!</Typography></Box>
        ) : (
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={sellTradeData}
              columns={sellTradeColumns}
              getRowId={(row) => row._id}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </Box>
        )}

        {/* Posted Trades */}
        <Typography sx={{ my: 1 }} variant="h5" component="h4" gutterBottom>
          Posted Trades
        </Typography>
        {mytrades.length === 0 ? (
          <Box sx={{ my: 4 }}><Typography>No records found!</Typography></Box>
        ) : (
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={mytrades}
              columns={myTradesColumns}
              getRowId={(row) => row._id}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </Box>
        )}
      </Container>
    </div>
  );
};

export default MyTrades;
