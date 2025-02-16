import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Paper, Avatar, Chip, Rating, Grid, List, ListItem, ListItemText, Divider, CircularProgress } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios';

function VillagerProfile() {
  const { villagerId } = useParams();
  const [villager, setVillager] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [myVillagers, setMyVillagers] = useState([]);

  useEffect(() => {
    // Using dummy data instead of API call
    const dummyVillager = {
      id: 'ace',
      name: 'Ace',
      image_url: 'https://dodo.ac/np/images/e/e2/Ace_NH.png',
      species: 'Bird',
      personality: 'Jock',
      gender: 'Male',
      birthday_month: 'August',
      birthday_day: '11',
      sign: 'Leo',
      phrase: 'ace',
      quote: "A bird in the hand is worth two in the bush!",
      favorite_song: 'K.K. Condor',
      favorite_color: 'Blue',
      hobby: 'Fitness',
      friendship: 4
    };

    setVillager(dummyVillager);
    setLoading(false);
  }, [villagerId]);


  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !villager) {
    return (
      <Box sx={{ maxWidth: 1200, mx: 'auto', py: 6, px: 3 }}>
        <Typography variant="h4" color="error" sx={{ textAlign: 'center' }}>
          {error || 'Villager not found'}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', py: 6, px: 3 }}>
      <Paper
        sx={{
          p: 4,
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
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <Avatar
                src={villager.image_url}
                alt={villager.name}
                sx={{ width: 200, height: 200 }}
              />
              <Typography variant="h4" component="h1" gutterBottom>
                {villager.name}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Chip label={villager.species} />
                <Chip label={villager.personality} />
              </Box>
              <Rating
                name="friendship-level"
                value={villager.friendship}
                readOnly
                icon={<FavoriteIcon fontSize="inherit" />}
                emptyIcon={<FavoriteIcon fontSize="inherit" />}
              />
            </Box>
          </Grid>
          
          <Grid item xs={12} md={8}>
            <List>
              <ListItem>
                <ListItemText
                  primary="Birthday"
                  secondary={`${villager.birthday_month} ${villager.birthday_day}`}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Catchphrase"
                  secondary={villager.phrase}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Gender"
                  secondary={villager.gender}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Personality"
                  secondary={villager.personality}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Sign"
                  secondary={villager.sign}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Quote"
                  secondary={villager.quote}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default VillagerProfile;