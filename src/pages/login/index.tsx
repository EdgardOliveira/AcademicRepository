import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MailIcon from "@mui/icons-material/Mail";
import PasswordIcon from "@mui/icons-material/Password";
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FilledInput, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Image from "next/image";

const theme = createTheme();

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter();

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      event.preventDefault();
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    console.log({
      email: email,
      password: password,
    });

    if(email === "edgard@gmail.com" && password === "teste123"){
        router.push("/articles");
    }

    if(email === "zaida@fametro.edu.br" && password === "teste123"){
        router.push("/articles");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(sede.jpeg)',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Image
              priority
              src="/password.png"
              height={128}
              width={128}
              alt="logotipo credenciais"
            />
            <Typography component="h1" variant="h5">
              Identifique-se
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  label="E-mail"
                  type={"email"}
                  fullWidth
                  variant="filled"
                  size="small"
                  placeholder={"Insira o e-mail aqui"}
                  InputLabelProps={{ shrink: true }}
                  name="email"
                  id="email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <FormControl fullWidth size="small" variant="filled">
                  <InputLabel htmlFor="filled-adornment-password">
                    Senha
                  </InputLabel>
                  <FilledInput
                    type={showPassword ? "text" : "password"}
                    placeholder={"Insira a senha aqui"}
                    id="password"
                    name="password"
                    startAdornment={
                      <InputAdornment position="start">
                        <IconButton aria-label="password-icon" edge="start">
                          <PasswordIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="exibir a senha"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <FormHelperText id="standard-weight-helper-text" error>
                  </FormHelperText>
                </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Verificar
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}