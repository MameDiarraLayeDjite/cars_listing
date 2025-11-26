import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, Container, CssBaseline } from '@mui/material';
import HomePage from './components/Public/HomePage.js';
import CarDetails from './components/Public/CarDetails.js';
import AdminLogin from './components/Admin/AdminLogin.js';
import AdminDashboard from './components/Admin/AdminDashboard.js';
import AdminCarDetails from './components/Admin/AdminCarDetails.js';
import CreateCar from './components/Admin/CreateCar.js';
import EditCar from './components/Admin/EditCar.js';
import PrivateRoute from './components/Admin/PrivateRoute.js';
import { AuthProvider } from './context/AuthContext.js';
import { ThemeProvider } from './context/ThemeContext.js';
import Navbar from './components/Layout/Navbar';

function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <AuthProvider>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            background: (theme) => theme.palette.background.gradient,
          }}
        >
          <Navbar />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              py: 4,
            }}
          >
            <Container maxWidth="lg">
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/cars/:id" element={<CarDetails />} />

                {/* Admin routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                  path="/admin/dashboard"
                  element={
                    <PrivateRoute>
                      <AdminDashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin/details/:id"
                  element={
                    <PrivateRoute>
                      <AdminCarDetails />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin/create"
                  element={
                    <PrivateRoute>
                      <CreateCar />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin/edit/:id"
                  element={
                    <PrivateRoute>
                      <EditCar />
                    </PrivateRoute>
                  }
                />

                {/* Redirect unknown routes */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Container>
          </Box>

          {/* Footer */}
          <Box
            component="footer"
            sx={{
              py: 4,
              px: 2,
              mt: 'auto',
              background: (theme) =>
                theme.palette.mode === 'light'
                  ? 'linear-gradient(135deg, rgba(255, 107, 53, 0.05) 0%, rgba(255, 159, 28, 0.05) 100%)'
                  : 'linear-gradient(135deg, rgba(255, 140, 97, 0.1) 0%, rgba(255, 184, 77, 0.1) 100%)',
              backdropFilter: 'blur(10px)',
              borderTop: (theme) => `1px solid ${theme.palette.divider}`,
            }}
          >
            <Container maxWidth="lg">
              <Box
                textAlign="center"
                color="text.secondary"
                sx={{
                  fontWeight: 500,
                  fontSize: '0.9375rem',
                }}
              >
                <p>© {new Date().getFullYear()} AutoMarket. Tous droits réservés.</p>
              </Box>
            </Container>
          </Box>
        </Box>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
