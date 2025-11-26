import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useThemeMode } from '../../context/ThemeContext';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Avatar,
  IconButton,
  useTheme,
  alpha,
  Stack,
  Tooltip
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const { mode, toggleTheme } = useThemeMode();
  const theme = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backdropFilter: 'blur(20px)',
        background: theme.palette.mode === 'light'
          ? 'linear-gradient(135deg, rgba(26, 35, 50, 0.98) 0%, rgba(44, 62, 80, 0.98) 100%)'
          : 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.98) 100%)',
        boxShadow: '0px 2px 24px rgba(0, 0, 0, 0.12)',
        borderBottom: `1px solid ${alpha(theme.palette.common.white, 0.08)}`,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: { xs: 70, md: 80 }, py: 1 }}>
          {/* Logo Section */}
          <Box
            component={Link}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              textDecoration: 'none',
              color: 'inherit',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
              },
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 3,
                background: 'linear-gradient(135deg, #FF6B35 0%, #FF9F1C 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(255, 107, 53, 0.4)',
              }}
            >
              <DirectionsCarIcon sx={{ fontSize: 28, color: 'white' }} />
            </Box>
            <Typography
              variant="h5"
              sx={{
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 800,
                background: 'linear-gradient(135deg, #FF6B35 0%, #FF9F1C 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em',
                display: { xs: 'none', sm: 'block' },
              }}
            >
              AutoMarket
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {/* Navigation Links */}
          <Stack direction="row" spacing={1} alignItems="center">
            <Button
              component={Link}
              to="/"
              startIcon={<HomeIcon />}
              sx={{
                color: 'white',
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.95rem',
                px: 2.5,
                py: 1,
                borderRadius: 2.5,
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: alpha(theme.palette.common.white, 0.12),
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <Box sx={{ display: { xs: 'none', md: 'block' } }}>Accueil</Box>
            </Button>

            {currentUser && (
              <Button
                component={Link}
                to="/admin/dashboard"
                startIcon={<DashboardIcon />}
                sx={{
                  color: 'white',
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  px: 2.5,
                  py: 1,
                  borderRadius: 2.5,
                  transition: 'all 0.3s ease',
                  display: { xs: 'none', sm: 'flex' },
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.common.white, 0.12),
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Dashboard
              </Button>
            )}

            {/* Theme Toggle */}
            <IconButton
              onClick={toggleTheme}
              sx={{
                color: 'white',
                width: 42,
                height: 42,
                borderRadius: 2.5,
                backgroundColor: alpha(theme.palette.common.white, 0.08),
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: alpha(theme.palette.common.white, 0.15),
                  transform: 'rotate(180deg)',
                },
              }}
              aria-label="toggle theme"
            >
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>

            {/* Auth Section */}
            {currentUser ? (
              <>
                <Tooltip title={currentUser.username || 'User'}>
                  <Avatar
                    sx={{
                      bgcolor: 'linear-gradient(135deg, #FF6B35 0%, #FF9F1C 100%)',
                      width: 42,
                      height: 42,
                      fontSize: '1rem',
                      fontWeight: 700,
                      boxShadow: '0 4px 14px rgba(255, 107, 53, 0.4)',
                      border: `2px solid ${alpha(theme.palette.common.white, 0.2)}`,
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'scale(1.1)',
                        boxShadow: '0 6px 20px rgba(255, 107, 53, 0.5)',
                      },
                    }}
                  >
                    {currentUser.username ? currentUser.username.charAt(0).toUpperCase() : 'U'}
                  </Avatar>
                </Tooltip>
                <Button
                  onClick={handleLogout}
                  startIcon={<LogoutIcon />}
                  sx={{
                    color: 'white',
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    px: 2.5,
                    py: 1,
                    borderRadius: 2.5,
                    border: `2px solid ${alpha(theme.palette.common.white, 0.2)}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: alpha(theme.palette.common.white, 0.4),
                      backgroundColor: alpha(theme.palette.common.white, 0.12),
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <Box sx={{ display: { xs: 'none', md: 'block' } }}>Déconnexion</Box>
                </Button>
              </>
            ) : (
              <Button
                component={Link}
                to="/admin/login"
                startIcon={<LoginIcon />}
                sx={{
                  color: 'white',
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  px: 2.5,
                  py: 1,
                  borderRadius: 2.5,
                  background: 'linear-gradient(135deg, #FF6B35 0%, #FF9F1C 100%)',
                  boxShadow: '0 4px 14px rgba(255, 107, 53, 0.4)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 6px 20px rgba(255, 107, 53, 0.5)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Connexion
              </Button>
            )}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}