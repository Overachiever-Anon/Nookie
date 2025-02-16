import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AudioProvider } from './contexts/AudioContext';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Home from './pages/Home';
import Layout from './components/Layout';
import MyIsland from './pages/MyIsland';
import Villagers from './pages/Villagers';
import GardenPlanner from './pages/GardenPlanner';
import Trading from './pages/Trading';
import TurnipPrices from './pages/TurnipPrices';
import VirtualMarket from './pages/VirtualMarket';
import VillagerProfile from './pages/VillagerProfile';
import Music from './pages/Music';
import IslandDesigner from './components/IslandDesigner/IslandDesigner';

// Create a custom theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#007AFF', // macOS blue
      light: '#47A1FF',
    },
    secondary: {
      main: '#FF9500', // macOS orange
      light: '#FFB44C',
    },
    background: {
      default: '#F5F5F7', // macOS light background
      paper: 'rgba(255, 255, 255, 0.8)', // macOS translucent white
    },
  },
  typography: {
    fontFamily: '"-apple-system", "SF Pro Text", "Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.75rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.6))',
          backdropFilter: 'blur(20px)',
          borderRadius: 10,
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          border: '0.5px solid rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          textTransform: 'none',
          fontWeight: 500,
          boxShadow: 'none',
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'none',
            boxShadow: 'none',
            opacity: 0.8,
          },
        },
      },
    },
  },
});

function App() {
  return (
    <AudioProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/my-island" element={<MyIsland />} />
              <Route path="/villagers" element={<Villagers />} />
              <Route path="/villagers/:villagerId" element={<VillagerProfile />} />
              <Route path="/garden" element={<GardenPlanner />} />
              <Route path="/trading" element={<Trading />} />
              <Route path="/turnip-prices" element={<TurnipPrices />} />
              <Route path="/island-map" element={<IslandDesigner />} />
              <Route path="/music" element={<Music />} />
              <Route path="/museum" element={<div>Museum</div>} />
              <Route path="/virtual-market" element={<VirtualMarket />} />
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </AudioProvider>
  );
}

export default App;