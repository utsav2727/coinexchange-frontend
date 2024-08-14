import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';

const items = [
  {
    icon: <SettingsSuggestRoundedIcon />,
    title: 'High Performance',
    description:
      'Our exchange platform is optimized for high-speed transactions, ensuring you never miss an opportunity.',
  },
  {
    icon: <ConstructionRoundedIcon />,
    title: 'Security and Stability',
    description:
      'Built with top-tier security protocols, our platform offers unmatched stability and protection for your assets.',
  },
  {
    icon: <ThumbUpAltRoundedIcon />,
    title: 'User-Friendly Interface',
    description:
      'Navigate the market with ease using our intuitive design, tailored for both beginners and experienced traders.',
  },
  {
    icon: <AutoFixHighRoundedIcon />,
    title: 'Cutting-Edge Technology',
    description:
      'Stay ahead of the curve with our innovative features and advanced trading tools, designed to enhance your experience.',
  },
  {
    icon: <SupportAgentRoundedIcon />,
    title: '24/7 Customer Support',
    description:
      'Our dedicated support team is available around the clock to assist you with any questions or issues.',
  },
  {
    icon: <QueryStatsRoundedIcon />,
    title: 'Real-Time Analytics',
    description:
      'Make informed decisions with access to real-time data and detailed market analysis.',
  },
];

export default function Highlights() {
  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: 'white',
        bgcolor: '#06090a',
      }}
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: '100%', md: '60%' },
            textAlign: { sm: 'left', md: 'center' },
          }}
        >
          <Typography component="h2" variant="h4">
            Why Choose Us
          </Typography>
          <Typography variant="body1" sx={{ color: 'grey.400' }}>
            Discover what makes our cryptocurrency exchange stand out: unparalleled performance, cutting-edge security, user-centric design, and continuous support. Elevate your trading experience with our real-time analytics and innovative technology.
          </Typography>
        </Box>
        <Grid container spacing={2.5}>
          {items.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Stack
                direction="column"
                color="inherit"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  p: 3,
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'grey.800',
                  background: 'transparent',
                  backgroundColor: 'grey.900',
                }}
              >
                <Box sx={{ opacity: '50%' }}>{item.icon}</Box>
                <div>
                  <Typography fontWeight="medium" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'grey.400' }}>
                    {item.description}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
