import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Alert,
  Card,
  CardContent,
  InputAdornment,
  IconButton,
  alpha,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoginIcon from '@mui/icons-material/Login';
import api from '../../api/api.js';
import { AuthContext } from '../../context/AuthContext.js';

const LoginCard = styled(Card)(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  borderRadius: 24,
  backdropFilter: 'blur(20px)',
  backgroundColor: theme.palette.mode === 'light'
    ? 'rgba(255, 255, 255, 0.9)'
    : 'rgba(30, 41, 59, 0.9)',
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: theme.palette.mode === 'light'
    ? '0px 20px 60px rgba(15, 23, 42, 0.15)'
    : '0px 20px 60px rgba(0, 0, 0, 0.5)',
}));

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const theme = useTheme();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    if (!username.trim() || !password.trim()) {
      setError('Veuillez remplir tous les champs');
      return;
    }
    try {
      const response = await api.post('/auth/login', { username, password });
      if (response.data && response.data.token) {
        login(response.data.token);
        navigate('/admin/dashboard');
      } else {
        setError('Réponse invalide du serveur');
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Erreur lors de la connexion');
      }
    }
  }

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <LoginCard>
        <CardContent sx={{ p: 5 }}>
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: theme.palette.mode === 'light'
                  ? 'linear-gradient(135deg, #FF6B35 0%, #FF9F1C 100%)'
                  : 'linear-gradient(135deg, #FF8C61 0%, #FFB84D 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                boxShadow: theme.palette.mode === 'light'
                  ? '0px 8px 24px rgba(255, 107, 53, 0.3)'
                  : '0px 8px 24px rgba(255, 140, 97, 0.4)',
              }}
            >
              <LockIcon sx={{ fontSize: 40, color: 'white' }} />
            </Box>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 700,
                background: theme.palette.mode === 'light'
                  ? 'linear-gradient(135deg, #FF6B35 0%, #FF9F1C 100%)'
                  : 'linear-gradient(135deg, #FF8C61 0%, #FFB84D 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Connexion
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
              Accédez au tableau de bord administrateur
            </Typography>
          </Box>

          {/* Error Alert */}
          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                borderRadius: 3,
                backdropFilter: 'blur(10px)',
              }}
            >
              {error}
            </Alert>
          )}

          {/* Login Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Nom d'utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Mot de passe"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              sx={{ mb: 4 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              endIcon={<LoginIcon />}
              sx={{
                py: 1.5,
                borderRadius: 3,
                fontWeight: 700,
                fontSize: '1.125rem',
                textTransform: 'none',
                background: theme.palette.mode === 'light'
                  ? 'linear-gradient(135deg, #FF6B35 0%, #FF9F1C 100%)'
                  : 'linear-gradient(135deg, #FF8C61 0%, #FFB84D 100%)',
                boxShadow: theme.palette.mode === 'light'
                  ? '0px 8px 20px rgba(255, 107, 53, 0.3)'
                  : '0px 8px 20px rgba(255, 140, 97, 0.4)',
                '&:hover': {
                  background: theme.palette.mode === 'light'
                    ? 'linear-gradient(135deg, #E85A2A 0%, #E88A00 100%)'
                    : 'linear-gradient(135deg, #FF6B35 0%, #FF9F1C 100%)',
                  boxShadow: theme.palette.mode === 'light'
                    ? '0px 12px 28px rgba(255, 107, 53, 0.4)'
                    : '0px 12px 28px rgba(255, 140, 97, 0.5)',
                },
              }}
            >
              Se connecter
            </Button>
          </Box>
        </CardContent>
      </LoginCard>
    </Container>
  );
}

export default AdminLogin;
