import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, MenuItem, Typography, Box } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import axiosInstance from '../services/axiosInstance';

const KycVerify = () => {
  const [documentType, setDocumentType] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');
  const [documentFile, setDocumentFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const documentOptions = [
    { value: 'aadhar', label: 'Aadhar' },
    { value: 'identityCertificate', label: 'Identity Certificate' },
    { value: 'drivingLicense', label: 'Driving License' },
  ];

  const handleFileUpload = (event) => {
    setDocumentFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage('');

    const formData = new FormData();
    // formData.append('userId', 'your-user-id-here'); // Replace with actual user ID
    formData.append('documentType', documentType);
    formData.append('documentNumber', documentNumber);
    formData.append('documentFile', documentFile);

    try {
      const response = await axiosInstance.post('kyc/kyc', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error uploading KYC document.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ marginTop: 100 }}>
    <Box sx={{ maxWidth: 500, margin: 'auto', padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        KYC Document Verification
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              select
              label="Select Document Type"
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              fullWidth
              required
            >
              {documentOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Document Number"
              value={documentNumber}
              onChange={(e) => setDocumentNumber(e.target.value)}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              component="label"
              fullWidth
              startIcon={<CloudUpload />}
            >
              Upload Document
              <input
                type="file"
                hidden
                accept=".pdf,.jpeg,.jpg,.png"
                onChange={handleFileUpload}
              />
            </Button>
            {documentFile && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Selected file: {documentFile.name}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={isLoading}>
              {isLoading ? 'Submitting...' : 'Submit'}
            </Button>
          </Grid>
          
          {message && (
            <Grid item xs={12}>
              <Typography variant="body2" color={message.includes('Error') ? 'error' : 'success'}>
                {message}
              </Typography>
            </Grid>
          )}
        </Grid>
      </form>
    </Box>
    </div>
  );
};

export default KycVerify;
