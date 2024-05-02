'use client';

import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button, CssBaseline, TextField, Link, Paper, Box, Grid, Typography } from "@mui/material";
import Image from "next/image";

function SignInSide() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

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
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
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
