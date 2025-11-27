import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, Container, CssBaseline } from '@mui/material';
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
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />

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

          <Footer />
        </Box>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
