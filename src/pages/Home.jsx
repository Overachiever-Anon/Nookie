import React from 'react';
import { Box, Typography, Grid, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PetsIcon from '@mui/icons-material/Pets';
import MapIcon from '@mui/icons-material/Map';
import MuseumIcon from '@mui/icons-material/Museum';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const featureCards = [
  {
    title: 'Villagers',
    description: 'Track and manage your island residents',
    icon: <PetsIcon sx={{ fontSize: 40 }} />,
    path: '/villagers',
    color: '#FF6B8B',
    gradient: 'linear-gradient(135deg, #FF6B8B 0%, #FF8E9E 100%)'
  },
  {
    title: 'Island Map',
    description: 'Design and customize your island layout',
    icon: <MapIcon sx={{ fontSize: 40 }} />,
    path: '/island-map',
    color: '#4ADE80',
    gradient: 'linear-gradient(135deg, #4ADE80 0%, #6EE7A0 100%)'
  },
  {
    title: 'Museum',
    description: 'Monitor your museum donations and exhibits',
    icon: <MuseumIcon sx={{ fontSize: 40 }} />,
    path: '/museum',
    color: '#C084FC',
    gradient: 'linear-gradient(135deg, #C084FC 0%, #D4A6FF 100%)'
  },
  {
    title: 'Virtual Market',
    description: 'Shop for items and trade with other players',
    icon: <ShoppingCartIcon sx={{ fontSize: 40 }} />,
    path: '/virtual-market',
    color: '#2563EB',
    gradient: 'linear-gradient(135deg, #2563EB 0%, #60A5FA 100%)'
  }
];

function Home() {
  const navigate = useNavigate();

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', py: 6, px: 3 }}>
      <Typography 
        variant="h1" 
        color="primary" 
        gutterBottom 
        sx={{
          textAlign: 'center',
          mb: 3,
          background: 'linear-gradient(45deg, #4CAF50 30%, #81C784 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Welcome to Nookpedia Companion
      </Typography>
      <Typography 
        variant="h6" 
        color="text.secondary" 
        paragraph 
        sx={{ 
          textAlign: 'center',
          mb: 6,
          maxWidth: 600,
          mx: 'auto'
        }}
      >
        Your all-in-one companion for Animal Crossing: New Horizons
      </Typography>

      <Grid container spacing={4}>
        {featureCards.map((card) => (
          <Grid item xs={12} sm={6} md={4} key={card.title}>
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
                  transform: 'translateY(-12px) scale(1.02)',
                  boxShadow: `0 20px 40px ${card.color}20`,
                  background: `linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7)), ${card.gradient}`,
                  '& .card-icon': {
                    transform: 'scale(1.3) rotate(8deg)'
                  }
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
                  background: card.gradient,
                  opacity: 0.9
                }
              }}
              onClick={() => navigate(card.path)}
            >
              <Box 
                sx={{ 
                  color: card.color, 
                  mb: 3,
                  transform: 'scale(1.2)',
                  transition: 'transform 0.3s ease'
                }}
              >
                {card.icon}
              </Box>
              <Typography 
                variant="h5" 
                component="h2" 
                gutterBottom 
                sx={{ 
                  fontWeight: 600,
                  color: 'text.primary'
                }}
              >
                {card.title}
              </Typography>
              <Typography 
                color="text.secondary"
                sx={{ 
                  lineHeight: 1.6,
                  fontSize: '0.95rem'
                }}
              >
                {card.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Home;