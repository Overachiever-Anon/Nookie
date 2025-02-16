import React, { useState } from 'react';
import { Box, Typography, Grid, Paper, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Switch, FormControlLabel } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShareIcon from '@mui/icons-material/Share';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import TimelineIcon from '@mui/icons-material/Timeline';
import NotificationsIcon from '@mui/icons-material/Notifications';
import TurnipChart from '../components/TurnipChart';

const mockPrices = [
  { day: 'Monday', amPrice: 108, pmPrice: 142 },
  { day: 'Tuesday', amPrice: 127, pmPrice: 164 },
  { day: 'Wednesday', amPrice: 155, pmPrice: null },
  { day: 'Thursday', amPrice: null, pmPrice: null },
  { day: 'Friday', amPrice: null, pmPrice: null },
  { day: 'Saturday', amPrice: null, pmPrice: null }
];

function TurnipPrices() {
  const [buyPrice, setBuyPrice] = useState('');
  const [selectedDay, setSelectedDay] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [showChart, setShowChart] = useState(true);

  return (
    <Box sx={{ 
      maxWidth: 1200, 
      mx: 'auto', 
      py: 6, 
      px: 3,
      bgcolor: darkMode ? '#1a1a1a' : 'background.default',
      minHeight: '100vh',
      color: darkMode ? '#fff' : 'text.primary'
    }}>
      <Typography 
        variant="h1" 
        color="primary" 
        gutterBottom 
        sx={{
          textAlign: 'center',
          mb: 3,
          background: darkMode ? 'linear-gradient(45deg, #00ff88 30%, #00ffcc 90%)' : 'linear-gradient(45deg, #4ADE80 30%, #6EE7A0 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Turnip Stop Market
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 4,
              height: '100%',
              position: 'relative',
              overflow: 'hidden',
              bgcolor: darkMode ? '#2d2d2d' : 'background.paper',
              color: darkMode ? '#fff' : 'text.primary',
              border: darkMode ? '1px solid #404040' : '1px solid rgba(0, 0, 0, 0.12)',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(135deg, #4ADE80 0%, #6EE7A0 100%)',
                opacity: 0.9
              }
            }}
          >
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
              Market Overview
            </Typography>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <FormControlLabel
                control={<Switch checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} />}
                label="Dark Mode"
                sx={{ color: darkMode ? '#fff' : 'text.primary' }}
              />
              <Button
                variant="outlined"
                startIcon={<NotificationsIcon />}
                sx={{
                  borderColor: darkMode ? '#404040' : 'primary.main',
                  color: darkMode ? '#fff' : 'primary.main'
                }}
              >
                Set Alert
              </Button>
            </Box>
            {showChart && <TurnipChart prices={mockPrices} darkMode={darkMode} />}
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label="Opening Price (Sunday)"
                InputProps={{
                  sx: { 
                    color: darkMode ? '#fff' : 'inherit',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: darkMode ? '#404040' : 'rgba(0, 0, 0, 0.23)'
                    }
                  }
                }}
                InputLabelProps={{
                  sx: { color: darkMode ? '#fff' : 'inherit' }
                }}
                type="number"
                value={buyPrice}
                onChange={(e) => setBuyPrice(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                startIcon={<TrendingUpIcon />}
                fullWidth
                sx={{
                  bgcolor: darkMode ? '#00ff88' : '#4ADE80',
                  color: darkMode ? '#000' : '#fff',
                  '&:hover': {
                    bgcolor: darkMode ? '#00cc6a' : '#3ECE70'
                  }
                }}
              >
                Analyze Market Patterns
              </Button>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <Button
                variant="outlined"
                startIcon={<ShowChartIcon />}
                sx={{
                  borderColor: darkMode ? '#404040' : 'primary.main',
                  color: darkMode ? '#fff' : 'primary.main'
                }}
                onClick={() => setShowChart(!showChart)}
              >
                {showChart ? 'Hide Chart' : 'Show Chart'}
              </Button>
              <Button
                variant="outlined"
                startIcon={<TimelineIcon />}
                sx={{
                  borderColor: darkMode ? '#404040' : 'primary.main',
                  color: darkMode ? '#fff' : 'primary.main'
                }}
              >
                Trend Analysis
              </Button>
            </Box>
            <TableContainer>
              <Table sx={{ '& .MuiTableCell-root': { color: darkMode ? '#fff' : 'inherit', borderColor: darkMode ? '#404040' : 'inherit' } }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Day</TableCell>
                    <TableCell align="right">AM Price</TableCell>
                    <TableCell align="right">PM Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockPrices.map((row) => (
                    <TableRow key={row.day}>
                      <TableCell component="th" scope="row">
                        {row.day}
                      </TableCell>
                      <TableCell align="right">
                        {row.amPrice || '-'}
                      </TableCell>
                      <TableCell align="right">
                        {row.pmPrice || '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 4,
              height: '100%',
              position: 'relative',
              overflow: 'hidden',
              bgcolor: darkMode ? '#2d2d2d' : 'background.paper',
              color: darkMode ? '#fff' : 'text.primary',
              border: darkMode ? '1px solid #404040' : '1px solid rgba(0, 0, 0, 0.12)',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(135deg, #60A5FA 0%, #7AB8FF 100%)',
                opacity: 0.9
              }
            }}
          >
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
              Community Prices
            </Typography>
            <Typography color="text.secondary" paragraph>
              Share your prices with the community and see the best selling opportunities!
            </Typography>
            <Button
              variant="contained"
              startIcon={<ShareIcon />}
              fullWidth
              sx={{
                bgcolor: '#60A5FA',
                '&:hover': {
                  bgcolor: '#4A95EA'
                }
              }}
            >
              Share My Prices
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default TurnipPrices;