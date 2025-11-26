import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Container,
  Skeleton,
  Alert,
  Button,
  Chip,
  Paper,
  TextField,
  MenuItem,
  Pagination,
  Stack,
  alpha,
  useTheme,
  InputAdornment,
  IconButton,
  Fade,
  Zoom,
} from '@mui/material';
import { styled, css } from '@mui/material/styles';
import { motion } from 'framer-motion';
import api from '../../api/api';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import SpeedIcon from '@mui/icons-material/Speed';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

// === Palette Saraya - Orange & Bleu Foncé ===
const COLORS = {
  primary: '#FF6B35',    // Saraya Orange
  secondary: '#FF9F1C',  // Orange Vif pour accents
  accent: '#1A2332',     // Saraya Bleu Foncé
  success: '#10B981',
  backgroundLight: '#F8FAFC',
  backgroundDark: '#0D1B2A',
};

// === Composants stylisés Soft UI + Glassmorphism ===
const GlassContainer = styled(Container)(({ theme }) => ({
  background: theme.palette.mode === 'light'
    ? 'rgba(248, 250, 252, 0.85)'
    : 'rgba(15, 23, 42, 0.85)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  minHeight: '100vh',
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(10),
}));

const HeroSection = styled(Box)(({ theme }) => ({
  background: theme.palette.mode === 'light'
    ? 'linear-gradient(135deg, rgba(255, 107, 53, 0.12) 0%, rgba(255, 159, 28, 0.1) 100%)'
    : 'linear-gradient(135deg, rgba(255, 140, 97, 0.25) 0%, rgba(255, 159, 28, 0.2) 100%)',
  borderRadius: 32,
  padding: theme.spacing(10, 6),
  marginBottom: theme.spacing(6),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  boxShadow: theme.palette.mode === 'light'
    ? '0 20px 40px rgba(99, 102, 241, 0.08)'
    : '0 20px 40px rgba(0, 0, 0, 0.4)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.secondary})`,
  },
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(8, 4),
  },
}));

const StyledCard = styled(motion.div)(({ theme }) => ({
  height: '100%',
  borderRadius: 28,
  overflow: 'hidden',
  background: theme.palette.mode === 'light'
    ? 'rgba(255, 255, 255, 0.75)'
    : 'rgba(30, 41, 59, 0.7)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: `1px solid ${alpha(theme.palette.divider, 0.15)}`,
  boxShadow: theme.palette.mode === 'light'
    ? '0 8px 32px rgba(15, 23, 42, 0.08)'
    : '0 8px 32px rgba(0, 0, 0, 0.4)',
  transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
  '&:hover': {
    transform: 'translateY(-12px) scale(1.02)',
    boxShadow: theme.palette.mode === 'light'
      ? '0 25px 60px rgba(255, 107, 53, 0.25)'
      : '0 25px 60px rgba(255, 140, 97, 0.35)',
  },
}));

const StyledCardMedia = styled(CardMedia)({
  height: 240,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
    background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 100%)',
  },
});

const PriceTag = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  bottom: 16,
  right: 16,
  padding: '10px 18px',
  borderRadius: 16,
  fontWeight: 800,
  fontSize: '1.1rem',
  background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`,
  color: 'white',
  boxShadow: `0 8px 25px ${alpha(COLORS.primary, 0.5)}`,
  zIndex: 2,
}));

const FilterBar = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 24,
  background: theme.palette.mode === 'light'
    ? 'rgba(255, 255, 255, 0.8)'
    : 'rgba(30, 41, 59, 0.7)',
  backdropFilter: 'blur(20px)',
  border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
  boxShadow: theme.palette.mode === 'light'
    ? '0 10px 30px rgba(0, 0, 0, 0.08)'
    : '0 10px 30px rgba(0, 0, 0, 0.4)',
}));

const FILTER_OPTIONS = {
  make: ['Toutes', 'Peugeot', 'Renault', 'Volkswagen', 'BMW', 'Audi', 'Mercedes', 'Toyota', 'Citroën'],
  priceRange: [
    { value: '0-10000', label: 'Moins de 10 000 €' },
    { value: '10000-20000', label: '10 000 € - 20 000 €' },
    { value: '20000-35000', label: '20 000 € - 35 000 €' },
    { value: '35000-999999', label: 'Plus de 35 000 €' },
  ],
  sortBy: [
    { value: 'price-asc', label: 'Prix croissant' },
    { value: 'price-desc', label: 'Prix décroissant' },
    { value: 'year-desc', label: 'Plus récent d\'abord' },
    { value: 'mileage-asc', label: 'Moins de km' },
  ],
};

function HomePage() {
  const theme = useTheme();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    make: 'Toutes',
    priceRange: '',
    sortBy: 'price-asc',
    searchQuery: '',
  });

  const CARS_PER_PAGE = 9;

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const response = await api.get('/cars');
        setCars(response.data);
      } catch (err) {
        setError('Impossible de charger les véhicules. Veuillez réessayer.');
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  const filteredCars = useMemo(() => {
    let result = [...cars];

    if (filters.make && filters.make !== 'Toutes') {
      result = result.filter(car => car.make === filters.make);
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      result = result.filter(car => car.price >= min && (max ? car.price <= max : true));
    }

    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      result = result.filter(car =>
        `${car.make} ${car.model} ${car.year} ${car.series || ''}`.toLowerCase().includes(q)
      );
    }

    const [field, direction] = filters.sortBy.split('-');
    result.sort((a, b) => {
      if (field === 'year' || field === 'mileage' || field === 'price') {
        return direction === 'asc' ? a[field] - b[field] : b[field] - a[field];
      }
      return 0;
    });

    return result;
  }, [cars, filters]);

  const pageCount = Math.ceil(filteredCars.length / CARS_PER_PAGE);
  const paginatedCars = filteredCars.slice((page - 1) * CARS_PER_PAGE, page * CARS_PER_PAGE);

  const formatPrice = (price) =>
    new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(price);

  const clearSearch = () => setFilters(prev => ({ ...prev, searchQuery: '' }));

  // === Rendu ===
  if (loading) {
    return (
      <GlassContainer maxWidth="lg">
        <Grid container spacing={4}>
          {[...Array(9)].map((_, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Skeleton variant="rectangular" height={380} sx={{ borderRadius: 7, bgcolor: 'rgba(255,255,255,0.1)' }} />
            </Grid>
          ))}
        </Grid>
      </GlassContainer>
    );
  }

  if (error) {
    return (
      <GlassContainer maxWidth="sm">
        <Alert severity="error" sx={{ mt: 4 }}>{error}</Alert>
        <Button variant="contained" onClick={() => window.location.reload()} sx={{ mt: 3 }}>
          Réessayer
        </Button>
      </GlassContainer>
    );
  }

  return (
    <GlassContainer maxWidth="lg">
      {/* Hero */}
      <Fade in timeout={800}>
        <HeroSection>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.8rem', md: '4rem' },
              fontWeight: 900,
              background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
            }}
          >
            Trouvez votre prochaine voiture
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 700, fontWeight: 500 }}>
            Véhicules d’occasion premium, inspectés 150 points et garantis jusqu’à 24 mois.
          </Typography>
        </HeroSection>
      </Fade>

      {/* Filtres */}
      <FilterBar elevation={0}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={5}>
            <TextField
              fullWidth
              placeholder="Rechercher (marque, modèle, année...)"
              value={filters.searchQuery}
              onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: filters.searchQuery && (
                  <InputAdornment position="end">
                    <IconButton onClick={clearSearch} size="small">
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 4,
                  background: alpha(theme.palette.background.paper, 0.6),
                  backdropFilter: 'blur(10px)',
                },
              }}
            />
          </Grid>

          <Grid item xs={6} sm={4} md={2}>
            <TextField select fullWidth label="Marque" value={filters.make} name="make" onChange={(e) => setFilters(prev => ({ ...prev, make: e.target.value }))}>
              {FILTER_OPTIONS.make.map(m => <MenuItem key={m} value={m}>{m}</MenuItem>)}
            </TextField>
          </Grid>

          <Grid item xs={6} sm={4} md={2}>
            <TextField select fullWidth label="Prix" value={filters.priceRange} name="priceRange" onChange={(e) => setFilters(prev => ({ ...prev, priceRange: e.target.value }))}>
              <MenuItem value="">Tous</MenuItem>
              {FILTER_OPTIONS.priceRange.map(r => (
                <MenuItem key={r.value} value={r.value}>{r.label}</MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={4} md={3}>
            <TextField select fullWidth label="Trier par" value={filters.sortBy} name="sortBy" onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}>
              {FILTER_OPTIONS.sortBy.map(o => (
                <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </FilterBar>

      {/* Résultats */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" fontWeight={600} color="text.primary">
          {filteredCars.length} véhicule{filteredCars.length > 1 ? 's' : ''} disponible{filteredCars.length > 1 ? 's' : ''}
        </Typography>
      </Box>

      {/* Grille de cartes */}
      <Grid container spacing={{ xs: 3, md: 4 }}>
        {paginatedCars.map((car, index) => {
          const imageUrl = car.photos?.[0] || `https://source.unsplash.com/random/800x600/?${car.make}+${car.model}`;

          return (
            <Grid item xs={12} sm={6} md={4} key={car.id}>
              <Zoom in timeout={300 + index * 100}>
                <StyledCard
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                >
                  <Link to={`/cars/${car.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                    <Box sx={{ position: 'relative' }}>
                      <StyledCardMedia image={imageUrl} title={`${car.make} ${car.model}`} />
                      <PriceTag elevation={6}>
                        <AttachMoneyIcon fontSize="small" sx={{ mr: 0.5 }} />
                        {formatPrice(car.price)}
                      </PriceTag>
                    </Box>

                    <CardContent sx={{ pt: 3 }}>
                      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                        <Typography variant="h6" fontWeight={700} noWrap>
                          {car.make} {car.model}
                        </Typography>
                        <Chip
                          label={car.condition === 'new' ? 'Neuf' : 'Occasion'}
                          size="small"
                          color={car.condition === 'new' ? 'primary' : 'default'}
                          sx={{ fontWeight: 600 }}
                        />
                      </Box>

                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {car.year} • {car.mileage?.toLocaleString('fr')} km
                      </Typography>

                      <Stack direction="row" spacing={1} mt={2} flexWrap="wrap" gap={1}>
                        <Chip icon={<LocalGasStationIcon fontSize="small" />} label={car.fuelType || 'N/A'} size="small" variant="outlined" />
                        <Chip icon={<SpeedIcon fontSize="small" />} label={car.transmission || 'Auto'} size="small" variant="outlined" />
                      </Stack>

                      <Button
                        variant="contained"
                        fullWidth
                        sx={{
                          mt: 3,
                          py: 1.5,
                          borderRadius: 3,
                          textTransform: 'none',
                          fontWeight: 600,
                          background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`,
                        }}
                      >
                        Voir le véhicule
                      </Button>
                    </CardContent>
                  </Link>
                </StyledCard>
              </Zoom>
            </Grid>
          );
        })}
      </Grid>

      {/* Pagination */}
      {pageCount > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={(_, p) => setPage(p)}
            size="large"
            color="primary"
            sx={{
              '& .MuiPaginationItem-root': {
                borderRadius: 3,
                fontWeight: 600,
              },
            }}
          />
        </Box>
      )}

      {/* Aucun résultat */}
      {filteredCars.length === 0 && !loading && (
        <Box textAlign="center" py={10}>
          <DirectionsCarIcon sx={{ fontSize: 80, color: 'text.disabled', mb: 3 }} />
          <Typography variant="h5" gutterBottom>
            Aucun véhicule trouvé
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 4 }}>
            Modifiez vos filtres pour voir plus de résultats.
          </Typography>
          <Button variant="outlined" size="large" onClick={() => setFilters({
            make: 'Toutes', priceRange: '', sortBy: 'price-asc', searchQuery: ''
          })}>
            Réinitialiser
          </Button>
        </Box>
      )}
    </GlassContainer>
  );
}

export default HomePage;