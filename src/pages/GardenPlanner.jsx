import React, { useState } from 'react';
import { Box, Typography, Grid, Paper, IconButton, Tooltip, Menu, MenuItem } from '@mui/material';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import DeleteIcon from '@mui/icons-material/Delete';
import AgricultureIcon from '@mui/icons-material/Agriculture';

const plantTypes = [
  { id: 'rose', name: 'Rose', colors: ['red', 'white', 'yellow', 'pink', 'orange', 'purple', 'black', 'blue', 'gold'] },
  { id: 'tulip', name: 'Tulip', colors: ['red', 'white', 'yellow', 'pink', 'orange', 'purple', 'black'] },
  { id: 'cosmos', name: 'Cosmos', colors: ['red', 'white', 'yellow', 'pink', 'orange', 'black'] },
  { id: 'lily', name: 'Lily', colors: ['red', 'white', 'yellow', 'pink', 'orange', 'black'] },
  { id: 'pumpkin', name: 'Pumpkin', colors: ['orange', 'white', 'yellow', 'green'] },
  { id: 'tomato', name: 'Tomato', colors: ['red'] },
  { id: 'potato', name: 'Potato', colors: ['brown'] },
  { id: 'carrot', name: 'Carrot', colors: ['orange'] },
];

function GardenPlanner() {
  const [selectedTool, setSelectedTool] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [grid, setGrid] = useState(Array(8).fill(Array(8).fill(null)));

  const handlePlantClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePlantClose = () => {
    setAnchorEl(null);
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
          background: 'linear-gradient(45deg, #4ADE80 30%, #6EE7A0 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Garden Planner
      </Typography>

      <Paper
        sx={{
          p: 4,
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '0.5px solid rgba(0, 0, 0, 0.1)',
          position: 'relative',
          mb: 4,
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.85)',
          }
        }}
      >
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Tooltip title="Add Plant">
            <IconButton 
              onClick={handlePlantClick}
              sx={{
                bgcolor: selectedTool === 'plant' ? 'primary.light' : 'transparent',
                '&:hover': { bgcolor: 'primary.light' }
              }}
            >
              <LocalFloristIcon />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handlePlantClose}
          >
            {plantTypes.map((plant) => (
              <MenuItem key={plant.id} onClick={handlePlantClose}>
                {plant.name}
              </MenuItem>
            ))}
          </Menu>
          <Tooltip title="Water">
            <IconButton>
              <WaterDropIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Harvest">
            <IconButton>
              <AgricultureIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Remove">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <Grid container spacing={1} sx={{ maxWidth: 600, mx: 'auto' }}>
          {grid.map((row, i) => (
            <Grid container item key={i} spacing={1}>
              {row.map((cell, j) => (
                <Grid item xs={1.5} key={`${i}-${j}`}>
                  <Paper
                    sx={{
                      paddingTop: '100%',
                      position: 'relative',
                      cursor: 'pointer',
                      border: '2px dashed rgba(0, 0, 0, 0.1)',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        borderColor: 'primary.main',
                        transform: 'scale(1.05)'
                      }
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        Breeding Guide
      </Typography>
      <Grid container spacing={3}>
        {plantTypes.slice(0, 4).map((plant) => (
          <Grid item xs={12} sm={6} md={3} key={plant.id}>
            <Paper
              sx={{
                p: 2,
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
              }}
            >
              <Typography variant="subtitle1" gutterBottom>
                {plant.name} Colors
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {plant.colors.map((color) => (
                  <Box
                    key={color}
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      bgcolor: color,
                      border: '2px solid white',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                  />
                ))}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default GardenPlanner;