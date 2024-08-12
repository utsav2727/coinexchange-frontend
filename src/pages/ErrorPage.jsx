import { Container, Typography } from '@mui/material'
import React from 'react'

const ErrorPage = () => {
  return (
    <div>
      <Container component="main" maxWidth="xs" sx={{
        mt:{
            xs:20
        }
      }}>
        <Typography
        component='h1'
        variant='h5'
        >
            404 Page Not Found!
        </Typography>
      </Container>
    </div>
  )
}

export default ErrorPage