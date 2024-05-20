'use client';

import React, { useContext } from 'react';
import { z } from 'zod';

import {
  Box,
  Button,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthContext } from '@/context/auth-context';

// Schemas
export const FormSchema = z.object({
  email: z.string().email('O tipo deve ser email'),
  password: z
    .string()
    .min(4, { message: 'A senha deve ter no mínimo 4 caracteres' }),
  incorretLogin: z.custom(),
});

// Types
type FormData = z.infer<typeof FormSchema>;

export default function Login() {
  const { handleLogin } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: FormData) => {
    const user = handleLogin(data.email, data.password);

    if (!user.isSigned) {
      setError('incorretLogin', {
        type: 'custom',
        message: 'Email ou senha incorretos.',
      });
    }
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          padding={{ lg: 20, md: 0, sm: 0, xs: 0 }}
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: 'bold', color: '#9D9D9D' }}
          >
            LOGO
          </Typography>

          <Typography variant="h5" mt={3}>
            Bem-vindo(a)
          </Typography>

          <Typography variant="h6" mt={1} color={'#6A6A6A'}>
            Acesse sua conta para iniciar a sessão
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              mt: 5,
              maxWidth: 500,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email"
              autoComplete="email"
              autoFocus
              {...register('email')}
              error={!!errors.email || !!errors.incorretLogin}
              helperText={
                errors.email?.message ||
                (errors.incorretLogin?.message as string)
              }
            />

            <TextField
              margin="normal"
              fullWidth
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              error={!!errors.password || !!errors.incorretLogin}
              helperText={
                errors.password?.message ||
                (errors.incorretLogin?.message as string)
              }
              {...register('password')}
            />

            <Link underline="none" color="#9747FF" mt={1}>
              Esqueceu a sua senha?
            </Link>

            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                mt: 5,
                mb: 2,
                width: 185,
                backgroundColor: '#9747FF',
                textTransform: 'none',
              }}
            >
              Acessar plataforma
            </Button>
          </Box>
        </Box>
      </Grid>

      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundColor: '#9747FF',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    </Grid>
  );
}
