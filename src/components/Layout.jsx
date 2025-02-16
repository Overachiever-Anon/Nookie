import React, { useState } from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import { useAudio, SOUNDTRACKS } from '../contexts/AudioContext';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import HomeIcon from '@mui/icons-material/Home';
import RadioIcon from '@mui/icons-material/Radio';

const menuItems = [
  { icon: <HomeIcon />, path: '/', tooltip: 'Home' },
  { icon: <SwapHorizIcon />, path: '/trading', tooltip: 'Trading Plaza' },
  { icon: <TrendingUpIcon />, path: '/turnip-prices', tooltip: 'Turnip Market' },
  { icon: <AttachMoneyIcon />, path: '/virtual-market', tooltip: 'Prices' },
  { icon: <RadioIcon />, path: '/music', tooltip: 'Music' },
];

function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isBackgroundMusicEnabled, toggleBackgroundMusic, selectedSoundtrack, setSelectedSoundtrack, isAmbientEnabled, toggleAmbientSound } = useAudio();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleSoundtrackMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSoundtrackMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSoundtrackChange = (soundtrack) => {
    setSelectedSoundtrack(soundtrack);
    handleSoundtrackMenuClose();
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: '100%',
          bgcolor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '0.5px solid rgba(0, 0, 0, 0.1)',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
          '& .MuiToolbar-root': {
            minHeight: '48px',
          }
        }}
      >
        <Toolbar>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {menuItems.map((item) => (
              <IconButton
                key={item.path}
                color={location.pathname === item.path ? 'primary' : 'default'}
                onClick={() => navigate(item.path)}
                sx={{
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  }
                }}
              >
                {item.icon}
              </IconButton>
            ))}
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              color="primary"
              onClick={handleSoundtrackMenuOpen}
              endIcon={isBackgroundMusicEnabled ? <VolumeUpIcon /> : <VolumeOffIcon />}
              sx={{ textTransform: 'none' }}
            >
              {SOUNDTRACKS[selectedSoundtrack]}
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleSoundtrackMenuClose}
            >
              {Object.entries(SOUNDTRACKS).map(([key, name]) => (
                <MenuItem
                  key={key}
                  onClick={() => handleSoundtrackChange(key)}
                  selected={selectedSoundtrack === key}
                >
                  {name}
                </MenuItem>
              ))}
            </Menu>
            <IconButton
              color="primary"
              onClick={toggleBackgroundMusic}
              aria-label="toggle background music"
            >
              {isBackgroundMusicEnabled ? <VolumeUpIcon /> : <VolumeOffIcon />}
            </IconButton>
            <IconButton
              color="primary"
              onClick={toggleAmbientSound}
              aria-label="toggle ambient sound"
              sx={{
                opacity: isAmbientEnabled ? 1 : 0.6,
                transition: 'opacity 0.2s'
              }}
            >
              <WaterDropIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: '100%',
          transition: 'margin 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
          minHeight: '100vh',
          bgcolor: 'background.default',
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

export default Layout;