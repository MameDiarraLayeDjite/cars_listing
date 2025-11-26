import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Stack,
  Alert,
  Skeleton,
  alpha,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import VisibilityIcon from '@mui/icons-material/Visibility';
import api from '../../api/api.js';
import ConfirmationModal from '../Common/ConfirmationModal';

const DashboardCard = styled(Paper)(({ theme }) => ({
  borderRadius: 20,
  backdropFilter: 'blur(20px)',
  backgroundColor: theme.palette.mode === 'light'
    ? 'rgba(255, 255, 255, 0.8)'
    : 'rgba(30, 41, 59, 0.8)',
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: theme.palette.mode === 'light'
    ? '0px 8px 24px rgba(15, 23, 42, 0.08)'
    : '0px 8px 24px rgba(0, 0, 0, 0.3)',
}));

function AdminDashboard() {
  const [cars, setCars] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchVin, setSearchVin] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [carToDeleteId, setCarToDeleteId] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();

  async function fetchCars(filters = {}) {
    try {
      setLoading(true);
      const params = {};
      if (filters.name) params.name = filters.name;
      if (filters.vin) params.vin = filters.vin;

      const response = await api.get('/cars', { params });
      setCars(response.data);
    } catch (err) {
      setError('Erreur lors du chargement des voitures.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCars();
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    fetchCars({ name: searchName.trim(), vin: searchVin.trim() });
  }

  const handleDeleteClick = (id) => {
    setCarToDeleteId(id);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!carToDeleteId) return;
    setDeleteModalOpen(false);
    try {
      await api.delete(`/cars/${carToDeleteId}`);
      setCars((prev) => prev.filter((car) => car.id !== carToDeleteId));
    } catch {
      alert('Erreur lors de la suppression.');
    } finally {
      setCarToDeleteId(null);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 4, mb: 3 }} />
        <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 4 }} />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontFamily: 'Outfit, sans-serif',
            fontWeight: 800,
            background: theme.palette.mode === 'light'
              ? 'linear-gradient(135deg, #FF6B35 0%, #FF9F1C 100%)'
              : 'linear-gradient(135deg, #FF8C61 0%, #FFB84D 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Tableau de bord
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500 }}>
          Gérez votre inventaire de véhicules
        </Typography>
      </Box>

      {/* Actions Bar */}
      <DashboardCard sx={{ p: 3, mb: 4 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" justifyContent="space-between">
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/admin/create')}
            sx={{
              borderRadius: 3,
              px: 3,
              py: 1.5,
              fontWeight: 600,
              textTransform: 'none',
              background: theme.palette.mode === 'light'
                ? 'linear-gradient(135deg, #FF6B35 0%, #FF9F1C 100%)'
                : 'linear-gradient(135deg, #FF8C61 0%, #FFB84D 100%)',
            }}
          >
            Ajouter une voiture
          </Button>

          <Chip
            icon={<DirectionsCarIcon />}
            label={`${cars.length} véhicule${cars.length > 1 ? 's' : ''}`}
            color="primary"
            sx={{ fontWeight: 600, px: 2, py: 2.5 }}
          />
        </Stack>
      </DashboardCard>

      {/* Search Filters */}
      <DashboardCard sx={{ p: 3, mb: 4 }}>
        <Box component="form" onSubmit={handleSearch}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <TextField
              fullWidth
              placeholder="Recherche par nom..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                },
              }}
            />
            <TextField
              fullWidth
              placeholder="Recherche par VIN..."
              value={searchVin}
              onChange={(e) => setSearchVin(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                borderRadius: 3,
                px: 4,
                whiteSpace: 'nowrap',
                textTransform: 'none',
                fontWeight: 600,
              }}
            >
              Rechercher
            </Button>
            <IconButton
              onClick={() => {
                setSearchName('');
                setSearchVin('');
                fetchCars();
              }}
              sx={{
                borderRadius: 3,
                border: 1,
                borderColor: 'divider',
              }}
            >
              <RefreshIcon />
            </IconButton>
          </Stack>
        </Box>
      </DashboardCard>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 3 }}>
          {error}
        </Alert>
      )}

      {/* Cars Table */}
      {cars.length === 0 ? (
        <DashboardCard sx={{ p: 8, textAlign: 'center' }}>
          <DirectionsCarIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            Aucune voiture trouvée
          </Typography>
        </DashboardCard>
      ) : (
        <DashboardCard>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.9375rem' }}>Stock #</TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.9375rem' }}>Nom complet</TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.9375rem' }}>Prix</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700, fontSize: '0.9375rem' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cars.map((car) => {
                  const fullName = `${car.year} ${car.make} ${car.model} ${car.series || ''}`.trim();
                  return (
                    <TableRow
                      key={car.id}
                      sx={{
                        '&:hover': {
                          backgroundColor: alpha(theme.palette.primary.main, 0.05),
                        },
                      }}
                    >
                      <TableCell>
                        <Chip
                          label={car.stock_number}
                          size="small"
                          variant="outlined"
                          sx={{ fontWeight: 600 }}
                        />
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>{fullName}</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: 'primary.main' }}>
                        {formatPrice(car.sale_price || car.price)}
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                          <IconButton
                            size="small"
                            onClick={() => navigate(`/admin/details/${car.id}`)}
                            sx={{
                              color: 'info.main',
                              '&:hover': {
                                backgroundColor: alpha(theme.palette.info.main, 0.1),
                              },
                            }}
                            title="Voir les détails"
                          >
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => navigate(`/admin/edit/${car.id}`)}
                            sx={{
                              color: 'primary.main',
                              '&:hover': {
                                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                              },
                            }}
                            title="Modifier"
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteClick(car.id)}
                            sx={{
                              color: 'error.main',
                              '&:hover': {
                                backgroundColor: alpha(theme.palette.error.main, 0.1),
                              },
                            }}
                            title="Supprimer"
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </DashboardCard>
      )}
      <ConfirmationModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Supprimer le véhicule ?"
        message="Êtes-vous sûr de vouloir supprimer cette voiture ? Cette action est irréversible."
        confirmText="Supprimer"
      />
    </Container>
  );
}

export default AdminDashboard;
