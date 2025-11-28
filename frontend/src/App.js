import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, Container, CssBaseline, CircularProgress } from '@mui/material';
import './i18n'; // Initialize i18n
import HomePage from './components/Public/HomePage.js';
import CarDetails from './components/Public/CarDetails.js';
import About from './components/Public/About.js';
import Contact from './components/Public/Contact.js';
import AdminLogin from './components/Admin/AdminLogin.js';
import AdminDashboard from './components/Admin/AdminDashboard.js';
import AdminCarDetails from './components/Admin/AdminCarDetails.js';
import CreateCar from './components/Admin/CreateCar.js';
import EditCar from './components/Admin/EditCar.js';
import PrivateRoute from './components/Admin/PrivateRoute.js';
import { AuthProvider } from './context/AuthContext.js';
import { ThemeProvider } from './context/ThemeContext.js';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';

function App() {
  return (
    <Suspense fallback={
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    }>
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
              }}
            >
              <Routes>
                {/* Public routes - HomePage sans Container pour pleine largeur */}
                <Route path="/" element={<HomePage />} />

                {/* Autres routes publiques avec Container */}
                <Route path="/cars/:id" element={
                  <Container maxWidth="lg" sx={{ py: 4 }}>
                    <CarDetails />
                  </Container>
                } />
                <Route path="/about" element={
                  <Container maxWidth="lg" sx={{ py: 4 }}>
                    <About />
                  </Container>
                } />
                <Route path="/contact" element={
                  <Container maxWidth="lg" sx={{ py: 4 }}>
                    <Contact />
                  </Container>
                } />

                {/* Admin routes avec Container */}
                <Route path="/admin/login" element={
                  <Container maxWidth="lg" sx={{ py: 4 }}>
                    <AdminLogin />
                  </Container>
                } />
                <Route
                  path="/admin/dashboard"
                  element={
                    <PrivateRoute>
                      <Container maxWidth="lg" sx={{ py: 4 }}>
                        <AdminDashboard />
                      </Container>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin/details/:id"
                  element={
                    <PrivateRoute>
                      <Container maxWidth="lg" sx={{ py: 4 }}>
                        <AdminCarDetails />
                      </Container>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin/create"
                  element={
                    <PrivateRoute>
                      <Container maxWidth="lg" sx={{ py: 4 }}>
                        <CreateCar />
                      </Container>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin/edit/:id"
                  element={
                    <PrivateRoute>
                      <Container maxWidth="lg" sx={{ py: 4 }}>
                        <EditCar />
                      </Container>
                    </PrivateRoute>
                  }
                />

                {/* Redirect unknown routes */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Box>

            <Footer />
          </Box>
        </AuthProvider>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
