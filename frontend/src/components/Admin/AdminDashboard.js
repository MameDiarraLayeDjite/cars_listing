import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useCurrency from '../../hooks/useCurrency';
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
  useTheme,
  TablePagination,
  TableFooter,
  TablePaginationProps,
  TablePaginationActionsProps,
  IconButtonProps
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import carApi from '../../api/carApi';
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

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function AdminDashboard() {
  const { t } = useTranslation();
  const currency = useCurrency();
  const [cars, setCars] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchVin, setSearchVin] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [carToDeleteId, setCarToDeleteId] = useState(null);
  const [pagination, setPagination] = useState({
    page: 0,
    rowsPerPage: 10,
    total: 0,
    totalPages: 0
  });

  const navigate = useNavigate();
  const theme = useTheme();

  const fetchCars = useCallback(async (filters = {}, page = 0, rowsPerPage = 10) => {
    try {
      setLoading(true);
      const params = {};

      if (filters.name) params.name = filters.name;
      if (filters.vin) params.vin = filters.vin;
      if (filters.location) params.location = filters.location;

      const response = await carApi.getCars(params, page + 1, rowsPerPage);

      setCars(response.data);
      setPagination(prev => ({
        ...prev,
        total: response.pagination.total,
        totalPages: response.pagination.totalPages,
        page,
        rowsPerPage
      }));

    } catch (err) {
      console.error('Error fetching cars:', err);
      setError(t('common.errorLoadingCars'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCars();
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    fetchCars(
      {
        name: searchName.trim(),
        vin: searchVin.trim(),
        location: searchLocation.trim()
      },
      0,
      pagination.rowsPerPage
    );
  }

  const handleDeleteClick = (id) => {
    setCarToDeleteId(id);
    setDeleteModalOpen(true);
  };

  const handleChangePage = (event, newPage) => {
    fetchCars(
      { name: searchName.trim(), vin: searchVin.trim() },
      newPage,
      pagination.rowsPerPage
    );
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    fetchCars(
      { name: searchName.trim(), vin: searchVin.trim() },
      0,
      newRowsPerPage
    );
  };

  const handleRefresh = () => {
    setSearchName('');
    setSearchVin('');
    setSearchLocation('');
    fetchCars({}, 0, pagination.rowsPerPage);
  };

  const handleConfirmDelete = async () => {
    if (!carToDeleteId) return;
    setDeleteModalOpen(false);
    try {
      await api.delete(`/cars/${carToDeleteId}`);
      setCars((prev) => prev.filter((car) => car.id !== carToDeleteId));
    } catch {
      alert(t('admin.dashboard.deleteError'));
    } finally {
      setCarToDeleteId(null);
    }
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
          {t('admin.dashboard.title')}
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500 }}>
          {t('admin.dashboard.welcome')}
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
            {t('admin.dashboard.addNewCar')}
          </Button>

          <Chip
            icon={<DirectionsCarIcon />}
            label={t('filters.vehiclesCount', { count: pagination.total })}
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
              placeholder={t('admin.dashboard.searchPlaceholder')}
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
              }}
            />
            <TextField
              fullWidth
              placeholder={t('admin.createCar.vin')}
              value={searchVin}
              onChange={(e) => setSearchVin(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
              }}
            />
            <TextField
              fullWidth
              placeholder={t('admin.createCar.location')}
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
              }}
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
                px: 6,
                whiteSpace: 'nowrap',
                textTransform: 'none',
                fontWeight: 600,
              }}
            >
              {t('filters.search')}
            </Button>
            <IconButton
              onClick={handleRefresh}
              sx={{
                borderRadius: 3,
                border: 1,
                borderColor: 'divider',
              }}
              title={t('filters.reset')}
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
      {!loading && cars.length === 0 ? (
        <DashboardCard sx={{ p: 8, textAlign: 'center' }}>
          <DirectionsCarIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            {t('admin.dashboard.noCars')}
          </Typography>
        </DashboardCard>
      ) : (
        <DashboardCard>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.9375rem' }}>{t('admin.createCar.stockNumber')}</TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.9375rem' }}>{t('footer.vehicles')}</TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.9375rem' }}>{t('admin.createCar.vin')}</TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.9375rem' }}>{t('admin.createCar.mileage')}</TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.9375rem' }}>{t('admin.createCar.fuelType')}</TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.9375rem' }}>{t('admin.createCar.transmission')}</TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.9375rem' }}>{t('admin.createCar.price')}</TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.9375rem' }}>Statut</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700, fontSize: '0.9375rem' }}>{t('admin.dashboard.actions')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cars.map((car) => {
                  const fullName = `${car.year} ${car.make} ${car.model} ${car.series || ''}`.trim();
                  const isAvailable = car.availability === 'available' || car.availability === 'Disponible';
                  const isSold = car.availability === 'sold' || car.availability === 'Vendu';

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
                          sx={{
                            fontWeight: 600,
                            borderRadius: 2,
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                          {fullName}
                        </Typography>
                        {/* <Typography variant="caption" color="text.secondary">
                          {car.body_type || 'N/A'}
                        </Typography> */}
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{
                            fontFamily: 'monospace',
                            fontSize: '0.75rem',
                            color: 'text.secondary'
                          }}
                        >
                          {car.vin || 'N/A'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {car.mileage ? `${car.mileage.toLocaleString('fr-FR')} km` : 'N/A'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={car.fuel_type || 'N/A'}
                          size="small"
                          sx={{
                            backgroundColor: alpha(theme.palette.success.main, 0.1),
                            color: 'success.main',
                            fontWeight: 600,
                            borderRadius: 2,
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={car.transmission || 'N/A'}
                          size="small"
                          sx={{
                            backgroundColor: alpha(theme.palette.info.main, 0.1),
                            color: 'info.main',
                            fontWeight: 600,
                            borderRadius: 2,
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: 'primary.main' }}>
                          {currency.format(car.sale_price || car.price)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={car.status === 'actif' ? 'Actif' : 'Inactif'}
                          size="small"
                          sx={{
                            backgroundColor: car.status === 'actif'
                              ? alpha(theme.palette.success.main, 0.15)
                              : alpha(theme.palette.warning.main, 0.15),
                            color: car.status === 'actif'
                              ? 'success.main'
                              : 'warning.main',
                            fontWeight: 700,
                            borderRadius: 2,
                            textTransform: 'capitalize'
                          }}
                        />
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
                            title={t('admin.dashboard.view')}
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
                            title={t('admin.dashboard.edit')}
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
                            title={t('admin.dashboard.delete')}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    colSpan={9}
                    count={pagination.total}
                    rowsPerPage={pagination.rowsPerPage}
                    page={pagination.page}
                    SelectProps={{
                      inputProps: {
                        'aria-label': 'lignes par page',
                      },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                    labelRowsPerPage="Lignes par page:"
                    labelDisplayedRows={({ from, to, count }) =>
                      `${from}-${to} sur ${count !== -1 ? count : `plus de ${to}`}`
                    }
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </DashboardCard>
      )}
      <ConfirmationModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title={t('admin.dashboard.delete') + "?"}
        message={t('admin.dashboard.confirmDelete')}
        confirmText={t('admin.dashboard.delete')}
      />
    </Container>
  );
}

export default AdminDashboard;
