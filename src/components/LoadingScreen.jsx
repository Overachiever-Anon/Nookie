import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const LOADING_VIDEOS = [
  '/videos/ac_loading_1.mp4',
  '/videos/ac_loading_2.mp4',
  '/videos/ac_loading_3.mp4'
];

function LoadingScreen({ message = 'Loading...', isLoading = true }) {
  if (!isLoading) return null;
  
  const randomVideo = LOADING_VIDEOS[Math.floor(Math.random() * LOADING_VIDEOS.length)];

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        bgcolor: 'background.paper'
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          overflow: 'hidden'
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        >
          <source src={randomVideo} type="video/mp4" />
        </video>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(8px)'
          }}
        />
      </Box>
      
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center'
        }}
      >
        <CircularProgress
          size={60}
          thickness={4}
          sx={{
            color: (theme) => theme.palette.primary.main,
            mb: 3
          }}
        />
        <Typography
          variant="h6"
          sx={{
            color: 'primary.main',
            fontWeight: 600,
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          {message}
        </Typography>
      </Box>
    </Box>
  );
}

export default LoadingScreen;