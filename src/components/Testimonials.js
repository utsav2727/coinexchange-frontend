import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/system';

const userTestimonials = [
  {
    avatar: <Avatar alt="Alice Johnson" src="/static/images/avatar/1.jpg" />,
    name: 'Alice Johnson',
    occupation: 'Crypto Investor',
    testimonial:
      "The security features on this platform are top-notch. I've never felt more confident in trading and storing my assets. The user interface is intuitive, making it easy to manage my portfolio and execute trades efficiently.",
  },
  {
    avatar: <Avatar alt="Michael Lee" src="/static/images/avatar/2.jpg" />,
    name: 'Michael Lee',
    occupation: 'Blockchain Developer',
    testimonial:
      "As a developer, I appreciate the seamless integration of advanced tools on this exchange. The real-time data and customizable charts have significantly enhanced my trading strategies.",
  },
  {
    avatar: <Avatar alt="Sara Kim" src="/static/images/avatar/3.jpg" />,
    name: 'Sara Kim',
    occupation: 'Financial Analyst',
    testimonial:
      "This platform offers some of the best rates and lowest fees I've encountered. The customer support is responsive and knowledgeable, which makes a huge difference when dealing with financial transactions.",
  },
  {
    avatar: <Avatar alt="John Doe" src="/static/images/avatar/4.jpg" />,
    name: 'John Doe',
    occupation: 'Entrepreneur',
    testimonial:
      "I value the transparency and reliability of this exchange. The detailed analytics and reports have been invaluable for tracking my investments and making informed decisions.",
  },
  {
    avatar: <Avatar alt="Emma Brown" src="/static/images/avatar/5.jpg" />,
    name: 'Emma Brown',
    occupation: 'Day Trader',
    testimonial:
      "The speed and efficiency of transactions on this platform are unparalleled. I can execute trades quickly without worrying about delays or slippage, which is crucial for day trading.",
  },
  {
    avatar: <Avatar alt="David Smith" src="/static/images/avatar/6.jpg" />,
    name: 'David Smith',
    occupation: 'Crypto Enthusiast',
    testimonial:
      "This exchange offers a wide variety of cryptocurrencies, allowing me to diversify my portfolio easily. The mobile app is also fantastic for trading on the go.",
  },
];

const whiteLogos = [
  'https://example.com/white-logo1.svg',
  'https://example.com/white-logo2.svg',
  'https://example.com/white-logo3.svg',
  'https://example.com/white-logo4.svg',
  'https://example.com/white-logo5.svg',
  'https://example.com/white-logo6.svg',
];

const darkLogos = [
  'https://example.com/dark-logo1.svg',
  'https://example.com/dark-logo2.svg',
  'https://example.com/dark-logo3.svg',
  'https://example.com/dark-logo4.svg',
  'https://example.com/dark-logo5.svg',
  'https://example.com/dark-logo6.svg',
];

const logoStyle = {
  width: '64px',
  opacity: 0.3,
};

export default function Testimonials() {
  const theme = useTheme();
  const logos = theme.palette.mode === 'light' ? darkLogos : whiteLogos;

  return (
    <Container
      id="testimonials"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
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
        <Typography component="h2" variant="h4" color="text.primary">
          What Our Users Say
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Discover why our users trust us with their crypto trading. From robust security to exceptional user experience, here's what they have to say.
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {userTestimonials.map((testimonial, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex' }}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flexGrow: 1,
                p: 1,
              }}
            >
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {testimonial.testimonial}
                </Typography>
              </CardContent>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  pr: 2,
                }}
              >
                <CardHeader
                  avatar={testimonial.avatar}
                  title={testimonial.name}
                  subheader={testimonial.occupation}
                />
                {/* <img
                  src={logos[index]}
                  alt={`Logo ${index + 1}`}
                  style={logoStyle}
                /> */}
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
