import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper, Avatar, Rating, Chip, IconButton, Tabs, Tab, TextField, CircularProgress } from '@mui/material';
import VillagerSkeleton from '../components/VillagerSkeleton';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import GiftIcon from '@mui/icons-material/CardGiftcard';
import HistoryIcon from '@mui/icons-material/History';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const mockVillagers = [
  {
    id: 1,
    name: 'Marshal',
    species: 'Squirrel',
    personality: 'Smug',
    birthday: 'September 29',
    catchphrase: 'sulky',
    friendship: 4,
    image: 'https://dodo.ac/np/images/9/91/Marshal_NH.png',
    gifts: [
      { date: '2023-09-01', item: 'Elegant Chair', reaction: 'Love' },
      { date: '2023-09-02', item: 'Coffee Cup', reaction: 'Like' },
    ]
  },
  {
    id: 2,
    name: 'Raymond',
    species: 'Cat',
    personality: 'Smug',
    birthday: 'October 1',
    catchphrase: 'crisp',
    friendship: 5,
    image: 'https://dodo.ac/np/images/2/2a/Raymond_NH.png',
    gifts: [
      { date: '2023-09-01', item: 'Business Suit', reaction: 'Love' },
      { date: '2023-09-02', item: 'Round Glasses', reaction: 'Like' },
    ]
  },
];

function Villagers() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [allVillagers, setAllVillagers] = useState([]);
  const [myVillagers, setMyVillagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const [lastFetchTime, setLastFetchTime] = useState(null);

  useEffect(() => {
    const fetchVillagers = async () => {
      const TIMEOUT_DURATION = 15000; // 15 seconds timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_DURATION);

      try {
        // Check if we have cached data and it's less than 24 hours old
        const cachedData = localStorage.getItem('villagerDatabase');
        const cachedTime = localStorage.getItem('villagerDatabaseTime');
        
        if (cachedData && cachedTime) {
          const timeDiff = Date.now() - parseInt(cachedTime);
          if (timeDiff < 24 * 60 * 60 * 1000) { // 24 hours
            setAllVillagers(JSON.parse(cachedData));
            setLoading(false);
            clearTimeout(timeoutId);
            return;
          }
        }
    
        const apiKey = import.meta.env.VITE_NOOKIPEDIA_API_KEY;
        if (!apiKey) {
          throw new Error('API key is not configured');
        }

        const response = await axios.get('https://api.nookipedia.com/villagers', {
          headers: {
            'X-API-KEY': apiKey,
            'Accept': 'application/json'
          },
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        // Cache the new data
        localStorage.setItem('villagerDatabase', JSON.stringify(response.data));
        localStorage.setItem('villagerDatabaseTime', Date.now().toString());
        
        setAllVillagers(response.data);
        setLoading(false);
      } catch (err) {
        clearTimeout(timeoutId);
        console.error('Failed to fetch villagers:', err);
        setError(
          err.name === 'AbortError'
            ? 'Request timed out. Please check your internet connection and try again.'
            : err.response?.status === 401
            ? 'Invalid API key. Please check your configuration.'
            : 'Failed to fetch villagers. Please try again later.'
        );
        setLoading(false);
      }
    };
  
    fetchVillagers();
  
    // Load saved villagers from localStorage
    const savedVillagers = localStorage.getItem('myVillagers');
    if (savedVillagers) {
      setMyVillagers(JSON.parse(savedVillagers));
    }
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleVillagerClick = (villager) => {
    navigate(`/villagers/${encodeURIComponent(villager.id.toLowerCase())}`);
  };

  const handleAddVillager = (e, villager) => {
    e.stopPropagation(); // Prevent triggering the card click
    if (!myVillagers.some(v => v.id === villager.id)) {
      const updatedVillagers = [...myVillagers, { ...villager, friendship: 1 }];
      setMyVillagers(updatedVillagers);
      localStorage.setItem('myVillagers', JSON.stringify(updatedVillagers));
    }
  };

  const handleRemoveVillager = (e, villagerId) => {
    e.stopPropagation();
    const updatedVillagers = myVillagers.filter(v => v.id !== villagerId);
    setMyVillagers(updatedVillagers);
    localStorage.setItem('myVillagers', JSON.stringify(updatedVillagers));
  };

  const filteredVillagers = allVillagers.filter(villager =>
    villager.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    villager.personality.toLowerCase().includes(searchQuery.toLowerCase()) ||
    villager.species.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', py: 6, px: 3 }}>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        centered
        sx={{
          mb: 4,
          '& .MuiTabs-indicator': {
            backgroundColor: '#FF6B8B'
          }
        }}
      >
        <Tab label="Database" />
        <Tab label="My Villagers" />
      </Tabs>
      <Typography 
        variant="h1" 
        color="primary" 
        gutterBottom 
        sx={{
          textAlign: 'center',
          mb: 3,
          background: 'linear-gradient(45deg, #FF6B8B 30%, #FF8E9E 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {activeTab === 0 ? 'Villager Database' : 'My Villagers'}
      </Typography>

      {activeTab === 0 ? (
        <Box>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search villagers by name, personality, or species..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ mb: 4 }}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
            }}
          />
          {loading ? (
            <Grid container spacing={4}>
              {[...Array(9)].map((_, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <VillagerSkeleton />
                </Grid>
              ))}
            </Grid>
          ) : error ? (
            <Typography color="error" sx={{ textAlign: 'center', py: 4 }}>
              {error}
            </Typography>
          ) : (
            <Grid container spacing={4}>
              {filteredVillagers.map((villager) => (
                <Grid item xs={12} sm={6} md={4} key={villager.id}>
                  <Paper
                    sx={{
                      p: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 2,
                      background: 'rgba(255, 255, 255, 0.7)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      position: 'relative',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 24px rgba(255, 107, 139, 0.15)'
                      }
                    }}
                    onClick={() => handleVillagerClick(villager)}
                  >
                    <IconButton
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        bgcolor: 'rgba(255, 107, 139, 0.1)',
                        '&:hover': {
                          bgcolor: 'rgba(255, 107, 139, 0.2)'
                        }
                      }}
                      onClick={(e) => handleAddVillager(e, villager)}
                      disabled={myVillagers.some(v => v.id === villager.id)}
                    >
                      <AddIcon sx={{ color: myVillagers.some(v => v.id === villager.id) ? 'text.disabled' : '#FF6B8B' }} />
                    </IconButton>
                    <Avatar
                      src={villager.image_url}
                      alt={villager.name}
                      sx={{ width: 120, height: 120 }}
                    />
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" gutterBottom>
                        {villager.name}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', mb: 1 }}>
                        <Chip label={villager.species} size="small" />
                        <Chip label={villager.personality} size="small" />
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        Birthday: {villager.birthday_month} {villager.birthday_day}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      ) : (
        <Box>
          <Grid container spacing={4}>
            {myVillagers.map((villager) => (
              <Grid item xs={12} md={6} key={villager.id}>
                <Paper
                  sx={{
                    p: 3,
                    display: 'flex',
                    gap: 3,
                    alignItems: 'center',
                    background: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 24px rgba(255, 107, 139, 0.15)',
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
                      background: 'linear-gradient(135deg, #FF6B8B 0%, #FF8E9E 100%)',
                      opacity: 0.9
                    }
                  }}
                  onClick={() => handleVillagerClick(villager)}
                >
                  <IconButton
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      bgcolor: 'rgba(255, 107, 139, 0.1)',
                      '&:hover': {
                        bgcolor: 'rgba(255, 107, 139, 0.2)'
                      }
                    }}
                    onClick={(e) => handleRemoveVillager(e, villager.id)}
                  >
                    <RemoveIcon sx={{ color: '#FF6B8B' }} />
                  </IconButton>
                  <Avatar
                    src={villager.image_url}
                    alt={villager.name}
                    sx={{ width: 80, height: 80 }}
                  />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                      {villager.name}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                      <Chip label={villager.species} size="small" />
                      <Chip label={villager.personality} size="small" />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Rating
                        name={`friendship-${villager.id}`}
                        value={villager.friendship}
                        readOnly
                        icon={<FavoriteIcon fontSize="small" />}
                        emptyIcon={<FavoriteIcon fontSize="small" />}
                      />
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton size="small">
                          <GiftIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small">
                          <HistoryIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
}

export default Villagers;