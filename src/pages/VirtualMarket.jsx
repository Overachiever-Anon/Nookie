import React, { useState } from 'react';
import { Box, Typography, Grid, Paper, TextField, Button, Card, CardContent, CardMedia, CardActions, Chip, IconButton, InputAdornment, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const mockItems = [
  {
    id: 1,
    name: 'Nook Miles Ticket',
    category: 'Special',
    price: 2000,
    image: 'https://acnhcdn.com/latest/MenuIcon/NMTicket.png',
    seller: 'Nook Inc.',
    stock: 10,
    rating: 4.8
  },
  {
    id: 2,
    name: 'Gold Nugget',
    category: 'Materials',
    price: 10000,
    image: 'https://acnhcdn.com/latest/MenuIcon/Gold.png',
    seller: 'Daisy Mae',
    stock: 5,
    rating: 4.9
  },
  {
    id: 3,
    name: 'Star Fragment',
    category: 'Materials',
    price: 5000,
    image: 'https://acnhcdn.com/latest/MenuIcon/StarPiece.png',
    seller: 'Celeste',
    stock: 15,
    rating: 4.7
  }
];

const categories = ['All', 'Special', 'Materials', 'Furniture', 'Clothing', 'Tools'];

function VirtualMarket() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('price');

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const filteredItems = mockItems
    .filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === 'All' || item.category === selectedCategory)
    )
    .sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', py: 6, px: 3 }}>
      <Typography 
        variant="h1" 
        gutterBottom 
        sx={{
          textAlign: 'center',
          mb: 4,
          background: 'linear-gradient(45deg, #4ADE80 30%, #2563EB 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Nook's Virtual Market
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search items..."
              value={searchQuery}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory}
                onChange={handleCategoryChange}
                label="Category"
              >
                {categories.map(category => (
                  <MenuItem key={category} value={category}>{category}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                onChange={handleSortChange}
                label="Sort By"
              >
                <MenuItem value="price">Price</MenuItem>
                <MenuItem value="rating">Rating</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        {filteredItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 6
                }
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={item.image}
                alt={item.name}
                sx={{ objectFit: 'contain', p: 2, bgcolor: 'rgba(0, 0, 0, 0.04)' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {item.name}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Chip
                    label={item.category}
                    size="small"
                    sx={{
                      bgcolor: '#4ADE80',
                      color: 'white'
                    }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    ⭐ {item.rating}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Seller: {item.seller}
                </Typography>
                <Typography variant="h6" color="primary" gutterBottom>
                  {item.price.toLocaleString()} Bells
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Stock: {item.stock} available
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<ShoppingCartIcon />}
                  sx={{
                    bgcolor: '#4ADE80',
                    '&:hover': {
                      bgcolor: '#22C55E'
                    }
                  }}
                >
                  Add to Cart
                </Button>
                <IconButton
                  sx={{
                    color: '#EF4444',
                    '&:hover': {
                      bgcolor: 'rgba(239, 68, 68, 0.04)'
                    }
                  }}
                >
                  <FavoriteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default VirtualMarket;