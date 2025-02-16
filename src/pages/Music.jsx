import React, { useState } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';

const dummySongs = [
  { id: 1, title: "K.K. Cruisin'", video: "/videos/kk/performances/Cruisin.mp4" }
];

function Music() {
  const [selectedSong, setSelectedSong] = useState(null);

  const handleSongClick = (song) => {
    setSelectedSong(song);
  };

  const handleCloseVideo = () => {
    setSelectedSong(null);
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', py: 6, px: 3 }}>
      <Typography 
        variant="h1" 
        color="primary" 
        gutterBottom 
        sx={{
          textAlign: 'center',
          mb: 3,
          background: 'linear-gradient(45deg, #FF69B4 30%, #FFB6C1 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        K.K. Slider's Music Collection
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {dummySongs.map((song) => (
          <Grid item xs={12} sm={6} md={3} key={song.id}>
            <Paper
              sx={{
                p: 4,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                '&:hover': {
                  transform: 'translateY(-8px) scale(1.02)',
                  boxShadow: '0 20px 40px rgba(255, 105, 180, 0.2)',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7))',
                },
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: 'linear-gradient(135deg, #FF69B4 0%, #FFB6C1 100%)',
                  opacity: 0.9
                }
              }}
              onClick={() => handleSongClick(song)}
            >
              <Typography 
                variant="h5" 
                component="h2" 
                gutterBottom 
                sx={{ 
                  fontWeight: 600,
                  color: 'text.primary'
                }}
              >
                {song.title}
              </Typography>
              <Typography 
                color="text.secondary"
                sx={{ 
                  lineHeight: 1.6,
                  fontSize: '0.95rem'
                }}
              >
                Click to watch performance
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {selectedSong && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            bgcolor: 'black',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={handleCloseVideo}
        >
          <video
            autoPlay
            controls
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            src={selectedSong.video}
          />
        </Box>
      )}
    </Box>
  );
}

export default Music;