'use client';
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Header = ({ headerTitle, headerButtons }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        bgcolor: '#fff',
        position: 'fixed',
        right: 0,
        left: 0,
        top: 0,
        px: 3,
        py: 2,
      }}
    >
      <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
        {headerTitle}
      </Typography>
      {headerButtons}
    </Box>
  );
};

export default Header;