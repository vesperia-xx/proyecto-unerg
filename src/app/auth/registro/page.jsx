'use client';

import React from 'react';
import { createTheme, ThemeProvider, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container } from '@mui/material';
import Image from 'next/image';

// Define el tema personalizado
const theme = createTheme();

function onlyNumbers(str) {
  return str.replace(/\D/g, '');
}

function validatePhoneNumber(phoneNumber) {
  const onlyDigits = onlyNumbers(phoneNumber);
  // Validar que el número tenga el formato correcto (58 seguido de al menos 10 dígitos)
  return /^58\d{10,}$/.test(onlyDigits);
}

function validateEmail(email) {
  // Validar que el correo tenga el formato correcto
  return /\S+@\S+\.\S+/.test(email);
}

function handleSubmit(event) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const phoneNumber = data.get('phoneNumber');
  if (!validatePhoneNumber(phoneNumber)) {
    alert('Por favor, ingrese un número de teléfono válido.');
    return;
  }
  const email = data.get('email');
  if (!validateEmail(email)) {
    alert('Por favor, ingrese un correo electrónico válido.');
    return;
  }
  console.log({
    name: data.get('firstName'),
    lastname: data.get('lastName'),
    ci: data.get('ci'),
    phoneNumber,
    email,
    password: data.get('password'),
  });
}

export default function SignUp() {
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
                  id="firstName"
                  label="Nombres"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Apellidos"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="ci"
                  label="Cédula"
                  name="ci"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Número de Teléfono"
                  name="phoneNumber"
                  InputProps={{
                    inputProps: { pattern: '[0-9]*' },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Correo Electrónico"
                  name="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
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