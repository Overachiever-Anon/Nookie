import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';

function MyIsland() {
  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', py: 6, px: 3 }}>
      <Typography 
        variant="h1" 
        color="primary"
        gutterBottom 
        sx={{
          textAlign: 'center',
          mb: 3,
          background: 'linear-gradient(45deg, #00C9A7 30%, #4ADE80 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        My Island Dashboard
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 4,
              height: '100%',
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(135deg, #00C9A7 0%, #4ADE80 100%)',
                opacity: 0.9
              }
            }}
          >
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
              Island Overview
            </Typography>
            <Typography color="text.secondary">
              Welcome to your island! Here you can track your progress and manage your island.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 4,
              height: '100%',
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(135deg, #FF6B8B 0%, #FF8E9E 100%)',
                opacity: 0.9
              }
            }}
          >
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
              Current Villagers
            </Typography>
            <Typography color="text.secondary">
              Keep track of your island residents and their happiness levels.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default MyIsland;