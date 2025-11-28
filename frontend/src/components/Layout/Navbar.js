import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Tooltip,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
} from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { useThemeMode } from '../../context/ThemeContext';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const { t } = useTranslation();
  const { currentUser, logout } = useAuth();
  const { mode, toggleTheme } = useThemeMode();
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [anchorEl, setAnchorEl] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
    navigate('/');
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { label: t('nav.home'), path: '/' },
    { label: t('nav.about'), path: '/about' },
    { label: t('nav.contact'), path: '/contact' },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        {t('nav.brandName')}
      </Typography>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <Button
              component={Link}
              to={item.path}
              fullWidth
              sx={{
                color: 'text.primary',
                justifyContent: 'flex-start',
                px: 3,
              }}
            >
              <ListItemText primary={item.label} />
            </Button>
          </ListItem>
        ))}
        {!currentUser && (
          <ListItem disablePadding>
            <Button
              component={Link}
              to="/admin/login"
              fullWidth
              sx={{
                color: 'primary.main',
                justifyContent: 'flex-start',
                px: 3,
              }}
            >
              <ListItemText primary={t('nav.adminLogin')} />
            </Button>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar
      position="sticky"
      elevation={scrolled ? 4 : 0}
      sx={{
        backgroundColor: scrolled
          ? (theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(26, 35, 50, 0.8)')
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? `1px solid ${theme.palette.divider}` : 'none',
        transition: 'all 0.3s ease',
        color: 'text.primary',
      }}
    >
      <Box sx={{ px: { xs: 2, sm: 3, md: 4, lg: 6 }, width: '100%' }}>
        <Toolbar disableGutters>
          {/* Logo */}
          <DirectionsCarIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: 'primary.main' }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Outfit',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              flexGrow: 1,
            }}
          >
            {t('nav.brandName')}
          </Typography>

          {/* Mobile Menu Icon */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleDrawerToggle}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Mobile Logo */}
          <DirectionsCarIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, color: 'primary.main' }} />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 'auto',
              display: { xs: 'flex', md: 'none' },
              fontFamily: 'Outfit',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {t('nav.brandName')}
          </Typography>

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
            {menuItems.map((item) => (
              <Button
                key={item.label}
                component={Link}
                to={item.path}
                sx={{
                  my: 2,
                  color: location.pathname === item.path ? 'primary.main' : 'text.primary',
                  display: 'block',
                  fontWeight: 600,
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                {item.label}
              </Button>
            ))}

            <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
              {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>

            <LanguageSwitcher />

            {currentUser ? (
              <Box sx={{ flexGrow: 0, ml: 2 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleMenu} sx={{ p: 0 }}>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      {currentUser.username ? currentUser.username.charAt(0).toUpperCase() : currentUser.email.charAt(0).toUpperCase()}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem disabled>
                    <Typography textAlign="center">{currentUser.email}</Typography>
                  </MenuItem>
                  {currentUser.role === 'admin' && (
                    <MenuItem onClick={() => { handleClose(); navigate('/admin/dashboard'); }}>
                      <ListItemIcon>
                        <DashboardIcon fontSize="small" />
                      </ListItemIcon>
                      {t('nav.adminDashboard')}
                    </MenuItem>
                  )}
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <ExitToAppIcon fontSize="small" />
                    </ListItemIcon>
                    {t('nav.logout')}
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Button
                component={Link}
                to="/admin/login"
                variant="contained"
                sx={{ ml: 2, borderRadius: 2 }}
              >
                {t('nav.adminLogin')}
              </Button>
            )}
          </Box>
        </Toolbar>
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;