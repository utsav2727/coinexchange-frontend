import React, { useEffect, useState } from 'react';
import { Box, Container, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Footer from '../components/Footer';
import { transactionList } from '../services/transactionService';

const Transactions = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await transactionList();
      setData(response); // Assuming your API returns the transaction data array
      console.log('data', response);
    }
    fetchData();
  }, []);

  return (
    <div style={{ marginTop: '100px' }}>
      <Container sx={{ mt: 4, mb: 4 }}>
        <TableContainer component={Box} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Table sx={{ minWidth: 650, maxWidth: 800 }} aria-label="transactions table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Transaction ID</TableCell>
                <TableCell align="center">User name</TableCell>
                <TableCell align="center">Amount</TableCell>
                <TableCell align="center">Type</TableCell>
                <TableCell align="center">Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((transaction) => (
                <TableRow key={transaction._id}>
                  <TableCell align="center">{transaction._id}</TableCell>
                  <TableCell align="center">{transaction.username}</TableCell>
                  <TableCell align="center">{transaction.amount}</TableCell>
                  <TableCell align="center">{transaction.type}</TableCell>
                  <TableCell align="center">{new Date(transaction.createdAt).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Divider />
      <Footer />
    </div>
  );
};

export default Transactions;
