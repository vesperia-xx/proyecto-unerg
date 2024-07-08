'use client';

import React, { useState } from 'react';
import { createTheme, ThemeProvider, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container } from '@mui/material';
import Image from 'next/image';
import { useAuthStore } from '@/hooks/useAuthStore';
import { useForm } from '@/hooks/useForm';
import Swal from "sweetalert2";

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
  const { startRegister } = useAuthStore();
  const { email, lastName, name, CI, phoneNumber, password, image, onInputChange } = useForm(registerFormFields);
  const [errors, setErrors] = useState({});

  async function handleSubmit(event) {
    event.preventDefault();

    // Validación del formulario
    const validationErrors = {};

    if (!name) {
      validationErrors.name = 'El nombre es obligatorio';
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
      validationErrors.name = 'El nombre solo debe contener letras';
    }

    if (!lastName) {
      validationErrors.lastName = 'El apellido es obligatorio';
    } else if (!/^[a-zA-Z\s]+$/.test(lastName)) {
      validationErrors.lastName = 'El apellido solo debe contener letras';
    }

    if (!CI) {
      validationErrors.CI = 'La cédula es obligatoria';
    } else if (!/^\d+$/.test(CI)) {
      validationErrors.CI = 'El CI debe ser un número';
    }

    if (!phoneNumber) {
      validationErrors.phoneNumber = 'El número de teléfono es obligatorio';
    } else if (!/^\d{11}$/.test(phoneNumber)) {
      validationErrors.phoneNumber = 'El número de teléfono debe tener 11 dígitos';
    }

    if (!email) {
      validationErrors.email = 'El email es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      validationErrors.email = 'El email no es válido';
    }

    if (!password) {
      validationErrors.password = 'La contraseña es obligatoria';
    } else if (password.length < 6) {
      validationErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await startRegister({ name, email, password, lastName, CI, phoneNumber });
      Swal.fire({
        icon: 'success',
        title: 'Registro Exitoso',
        text: 'Tu cuenta ha sido creada con éxito.',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error en el Registro',
        text: 'Hubo un problema al crear tu cuenta. Por favor, intenta de nuevo.',
      });
    }
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
                  error={!!errors.name}
                  helperText={errors.name}
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
                  error={!!errors.lastName}
                  helperText={errors.lastName}
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
                  error={!!errors.CI}
                  helperText={errors.CI}
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
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber}
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
                  error={!!errors.email}
                  helperText={errors.email}
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
                  error={!!errors.password}
                  helperText={errors.password}
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
