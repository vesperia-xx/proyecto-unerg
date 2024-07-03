// components/NoAccess.js
import React from 'react';
import { Button, Container, Typography } from '@mui/material';

const NoAccess = () => {
  const handleGoBack = () => {
    window.location.href = '/'; // Redirect to home page
  };

  return (
    <Container component="main" maxWidth="xs" style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>
        Acceso Denegado
      </Typography>
      <Typography variant="body1" gutterBottom>
        No tienes permiso para acceder a esta página.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleGoBack}
        style={{ marginTop: '20px' }}
      >
        Volver a la página principal
      </Button>
    </Container>
  );
};

export default NoAccess;

