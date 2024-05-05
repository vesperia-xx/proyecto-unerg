import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

const LeftPanelContainer = ({ window }) => {
  const { container } = window !== undefined ? { container: () => window().document.body } : {};

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
    </Box>
  );
};

LeftPanelContainer.propTypes = {
  window: PropTypes.func,
};

export default LeftPanelContainer;
