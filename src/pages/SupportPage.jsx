import React, { useContext, useEffect, useState } from 'react';
import { TextField, Button, Grid, Typography, Box } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { UserContext } from '../context/userContext';
import { fetchProfileData } from '../services/fetchProfileData';
import axiosInstance from '../services/axiosInstance';

const SupportPage = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [documentFile, setDocumentFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');


 

  const user = useContext(UserContext);

    console.log('user', user);

  const handleFileUpload = (event) => {
    setDocumentFile(event.target.files[0]);
  };

  useEffect(()=>{
    async function fetchData(){
      const response =  await fetchProfileData(user.userData.userId)
      console.log('response', response);
      setEmail(response?.email);
    }
    fetchData();
  },[user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setStatusMessage('');

    // Create form data for sending
    const formData = new FormData();
    formData.append('email', email);
    formData.append('username', username);
    formData.append('message', message);
    formData.append('documentFile', documentFile);

    try {
        const response = await axiosInstance.post('/support', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log('response', response);
      console.log('Support form submitted:', { email, username, message, documentFile });
      setStatusMessage('Support request submitted successfully!');
    } catch (error) {
      setStatusMessage('Error submitting support request.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(()=>{
    setUsername(user?.userData?.userName);
  },[user.userData.userName])

  console.log('username', username)

  return (
    <div style={{marginTop:"100px"}}>
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Support - Contact Us
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
            //   type="email"
            />
          </Grid>

          <Grid item xs={12}>
            {console.log(user.userData?.userName)}
            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              required
            //   defaultChecked={true}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              fullWidth
              required
              multiline
              rows={4}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
            color='secondary'
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

          {statusMessage && (
            <Grid item xs={12}>
              <Typography variant="body2" color={statusMessage.includes('Error') ? 'error' : 'success'}>
                {statusMessage}
              </Typography>
            </Grid>
          )}
        </Grid>
      </form>
    </Box>
    </div>
  );
};

export default SupportPage;
