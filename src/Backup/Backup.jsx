import React from 'react';
import { Box, Typography, Fade } from '@mui/material';
import { Backup } from '@mui/icons-material';

const BackupPage = () => (
  <Fade in>
    <Box sx={{
      minHeight: '70vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(120deg, #6366f1 0%, #f59e0b 100%)',
      borderRadius: 6,
      boxShadow: 6,
      p: 6,
      mt: 4,
    }}>
      <Backup sx={{ fontSize: 80, color: '#fff', mb: 2, filter: 'drop-shadow(0 4px 16px #f59e0b)' }} />
      <Typography variant="h3" color="#fff" fontWeight={700} gutterBottom>
        Backup & Restore
      </Typography>
      <Typography variant="h6" color="#e0e7ff" textAlign="center">
        Securely backup and restore your data.<br />
        (Full feature UI coming soon!)
      </Typography>
    </Box>
  </Fade>
);

export default BackupPage; 