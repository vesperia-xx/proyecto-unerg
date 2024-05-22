'use client';

import React from 'react';
import { createTheme, ThemeProvider, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container } from '@mui/material';
import Image from 'next/image';
import { useAuthStore } from '@/hooks/useAuthStore';
import { useForm } from '@/hooks/useForm';

// Define el tema personalizado
const theme = createTheme();

const registerFormFields = {
  name: '',
  lastName: '',
  CI: '',
  phoneNumber: '',
  email: '',
  image: '',
  password: '',
}

export default function SignUp() {

  const { startRegister } = useAuthStore()
  const { email, lastName, name, CI, phoneNumber, password, image, onInputChange } = useForm(registerFormFields);

  function handleSubmit(event) {
    event.preventDefault();
    startRegister({ name, email, password, lastName, CI, phoneNumber })
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Image src='/logo_unerg.png' width={180} height={90} alt='el logo' />
          <Typography component="h1" variant="h5">
            Registro
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  value={name}
                  label="Nombres"
                  onChange={onInputChange}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  value={lastName}
                  label="Apellidos"
                  name="lastName"
                  onChange={onInputChange}
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={CI}
                  label="Cédula"
                  name="CI"
                  onChange={onInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={phoneNumber}
                  label="Número de Teléfono"
                  name="phoneNumber"
                  onChange={onInputChange}
                  InputProps={{
                    inputProps: { pattern: '[0-9]*' },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={email}
                  label="Correo Electrónico"
                  name="email"
                  onChange={onInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  value={password}
                  onChange={onInputChange}
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registrarse
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/auth/login" variant="body2">
                  ¿Ya tienes una cuenta? Inicia sesión
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <br />

      </Container>


    </ThemeProvider>
  );
}