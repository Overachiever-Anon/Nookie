import React, { useState } from 'react';
import { Box, Typography, Grid, Paper, Tabs, Tab, TextField, Button, Card, CardContent, CardMedia, CardActions } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import SearchIcon from '@mui/icons-material/Search';

const mockItems = [
  {
    id: 1,
    name: 'Royal Crown',
    type: 'item',
    price: 300000,
    image: 'https://acnhcdn.com/latest/FtrIcon/CapCrownA.png',
    seller: 'Tom',
    condition: 'New'
  },
  {
    id: 2,
    name: 'Marshal',
    type: 'villager',
    price: 'Trade Only',
    image: 'https://dodo.ac/np/images/9/91/Marshal_NH.png',
    seller: 'Jane',
    condition: 'Looking for Raymond'
  }
];

function Trading() {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
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
          background: 'linear-gradient(45deg, #FFB347 30%, #FFCC33 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Trading Plaza
      </Typography>

      <Paper sx={{ mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          centered
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: '#FFB347'
            }
          }}
        >
          <Tab label="Items" />
          <Tab label="Villagers" />
        </Tabs>
      </Paper>

      <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search items or villagers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
          }}
        />
        <Button
          variant="contained"
          startIcon={<SwapHorizIcon />}
          sx={{
            bgcolor: '#FFB347',
            '&:hover': {
              bgcolor: '#FFA333'
            }
          }}
        >
          Create Listing
        </Button>
      </Box>

      <Grid container spacing={3}>
        {mockItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)'
                }
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={item.image}
                alt={item.name}
                sx={{ objectFit: 'contain', p: 2 }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Type: {item.type}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: {item.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Seller: {item.seller}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Condition: {item.condition}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Contact Seller
                </Button>
                <Button size="small" color="primary">
                  Make Offer
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Trading;