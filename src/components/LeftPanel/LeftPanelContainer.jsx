import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

const LeftPanelContainer = ({ window, children }) => {
  const { container } = window !== undefined ? { container: () => window().document.body } : {};

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {children}
    </Box>
  );
};

LeftPanelContainer.propTypes = {
  window: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default LeftPanelContainer;