import React from 'react';
import { Paper, Box, Skeleton } from '@mui/material';

function VillagerSkeleton() {
  return (
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
        position: 'relative',
      }}
    >
      <Skeleton
        variant="circular"
        width={120}
        height={120}
        animation="wave"
        sx={{ bgcolor: 'rgba(255, 107, 139, 0.1)' }}
      />
      <Box sx={{ width: '100%', textAlign: 'center' }}>
        <Skeleton
          variant="text"
          width="60%"
          height={32}
          sx={{ mx: 'auto', bgcolor: 'rgba(255, 107, 139, 0.1)' }}
        />
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', mb: 1 }}>
          <Skeleton
            variant="rounded"
            width={60}
            height={24}
            sx={{ bgcolor: 'rgba(255, 107, 139, 0.1)' }}
          />
          <Skeleton
            variant="rounded"
            width={80}
            height={24}
            sx={{ bgcolor: 'rgba(255, 107, 139, 0.1)' }}
          />
        </Box>
        <Skeleton
          variant="text"
          width="40%"
          height={24}
          sx={{ mx: 'auto', bgcolor: 'rgba(255, 107, 139, 0.1)' }}
        />
      </Box>
    </Paper>
  );
}

export default VillagerSkeleton;