'use client';

import React, { useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button, CssBaseline, TextField, Link, Paper, Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { useAuthStore } from "@/hooks/useAuthStore";
import { useForm } from "@/hooks/useForm";
import Swal from "sweetalert2";
import { redirect } from "next/navigation";

const loginFormFields = {
  email: '',
  password: '',
}

function SignInSide() {

  const { email, password, onInputChange } = useForm(loginFormFields);
  const { startLogin, errorMessage, status, user } = useAuthStore();
  
  useEffect(() => {
    if (status === 'authenticated' && user && user.roles) {
      const roles = user.roles.map(role => role.name);
      if (roles.includes('AdminPasantias')) {
        window.location.href = '/admin/pasantias';
      } else if (roles.includes('User')) {
        window.location.href = '/student';
      } else if (roles.includes('AdminServicio')) {
        window.location.href = '/admin/servicio';
      }
    }
  }, [status, user]);

  const handleSubmit = (event) => {
    event.preventDefault();
    startLogin({ email, password })
    console.log({email,password})
  };

  useEffect(() => {
    if (errorMessage !== undefined) {
        Swal.fire('Error en la autenticacion', errorMessage, 'error');
        return;
    }
}, [errorMessage])

  // Define el tema personalizado
  const theme = createTheme();

  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid
          container
          component="main"
          sx={{ height: "100vh", overflowY: "none" }}
        >
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: "url(/unergimg.jpg)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: "cover",
              height: "100vh",
              backgroundPosition: "center",
            }}
          ></Grid>

          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
            sx={{
              height: "100vh",
              overflowY: "auto",
            }}
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Image src="/logo_unerg.png" width={180} height={90} alt="el logo" />

              <Typography component="h1" variant="h5">
                Iniciar sesión
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Correo electronico"
                  name="email"
                  value={email}
                  autoComplete="email"
                  onChange={onInputChange}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  value={password}
                  onChange={onInputChange}
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Ingresar
                </Button>
                <Grid container>
                  <Grid item xs></Grid>
                  <Grid item>
                    <Link href="/auth/registro" variant="body2">
                      {"¿Aún no tienes cuenta? Registrate"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}

export default SignInSide;
