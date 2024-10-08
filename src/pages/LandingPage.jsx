import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Hero from '../components/Hero';
import LogoCollection from '../components/LogoCollection';
import Highlights from '../components/Highlights';
import Pricing from '../components/Pricing';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';


export default function LandingPage() {
  // const [mode, setMode] = React.useState('light');
  // // const LPtheme = createTheme(getLPTheme(mode));

  // const toggleColorMode = () => {
  //   setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  // };

  return (
    <div>
      <Hero />
      <Box sx={{ bgcolor: 'background.default' }}>
        <LogoCollection />
        <Features />
        <Divider />
        <Testimonials />
        <Divider />
        <Highlights />
        <Divider />
        {/* <Pricing /> */}
        <Divider />
        <FAQ />
        <Divider />
        <Footer />
      </Box>
      </div>
  );
}