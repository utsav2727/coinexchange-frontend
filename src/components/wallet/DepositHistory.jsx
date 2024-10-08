import { Button, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import { updateProfileData } from '../../services/updateProfileData';
import CustomTable from '../CustomTable';
import { useEffect } from 'react';
import { depositHistory } from '../../services/depositService';
import { useState } from 'react';

const DepositHistory = () => {

  const columns = [
    { field: '_id', headerName: 'ID' },
    { field: 'transactionRef', headerName: 'Transaction Ref' },
    { field: 'currencyId', headerName: 'Currency' },
    { field: 'status', headerName: 'Status' },
    { field: 'amount', headerName: 'Amount' },
    { field: 'transactionMode', headerName: 'Transaction Mode' },
    { field: 'createdAt', headerName: 'Submitted On' }
  ];

  const [rows, setRows] = useState([]);

  useEffect(()=>{

    async function fetchData(){
      let data = await depositHistory();
      console.log('data', data);
      setRows(data);
    }

    fetchData();

  },[])


  return (
    <div>
      <Typography variant="h6" sx={{ mb: 1 }}>Deposit History</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CustomTable rows={rows} columns={columns}/>
        </Grid>
      </Grid>
    </div>
  )
}

export default DepositHistory