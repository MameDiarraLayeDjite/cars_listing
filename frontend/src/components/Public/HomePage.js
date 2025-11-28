import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
  alpha,
  useTheme,
  InputAdornment,
  Fade,
  Zoom,
  Slider,
  Popover,
  Select,
  FormControl,
  InputLabel,
  Badge,
  Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../api/api';
import SearchIcon from '@mui/icons-material/Search';
import SpeedIcon from '@mui/icons-material/Speed';
import SortIcon from '@mui/icons-material/Sort';
import EuroIcon from '@mui/icons-material/Euro';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// === Couleurs Saraya ===
const COLORS = {
  primary: '#FF6B35',
  secondary: '#FF9F1C',
  accent: '#1A2332',
};

// === Hero Section Full Width ===
const HeroWrapper = styled(Box)({
  width: '100%',
  margin: 0,
  padding: 0,
  position: 'relative',
});

const HeroSection = styled(Box)(({ theme }) => ({
  width: '100%',
  position: 'relative',
  background: theme.palette.mode === 'light'
    ? 'linear-gradient(135deg, #F0F4F8 0%, #E2E8F0 100%)'
    : 'linear-gradient(135deg, #0F172A 0%, #000000 100%)',
  padding: '120px 0 100px',
  overflow: 'hidden',
  minHeight: 600,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.2)',
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: 'url("https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80") center 40% / cover no-repeat',
    filter: 'brightness(0.6) contrast(1.1)',
    opacity: theme.palette.mode === 'light' ? 0.35 : 0.45,
    zIndex: 0,
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: theme.palette.mode === 'light'
      ? 'linear-gradient(to bottom, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.72) 50%, rgba(255,255,255,0.88) 100%)'
      : 'linear-gradient(to bottom, rgba(15, 23, 42, 0.92) 0%, rgba(15, 23, 42, 0.78) 50%, rgba(15, 23, 42, 0.92) 100%)',
    zIndex: 1,
  },
  '& > *': {
    position: 'relative',
    zIndex: 2,
  }
}));

// === Filter Bar ===
const FilterBar = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3.5),
  borderRadius: 20,
  background: theme.palette.mode === 'light'
    ? 'rgba(255, 255, 255, 0.96)'
    : 'rgba(30, 41, 59, 0.92)',
  backdropFilter: 'blur(30px)',
  border: `2px solid ${alpha(theme.palette.divider, 0.08)}`,
  marginTop: -60,
  marginBottom: theme.spacing(6),
  position: 'relative',
  zIndex: 20,
  boxShadow: '0 20px 40px -10px rgba(0,0,0,0.15)',
}));

// === Card Styles - Hauteur et largeur fixes ===
const CarCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 16,
  overflow: 'hidden',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: '0 8px 30px -8px rgba(0, 0, 0, 0.12)',
  border: `1px solid ${alpha(theme.palette.divider, 0.06)}`,
  background: theme.palette.background.paper,
  minHeight: '550px',
  maxHeight: '550px',
  '&:hover': {
    transform: 'translateY(-8px) scale(1.01)',
    boxShadow: '0 20px 40px -8px rgba(255, 107, 53, 0.2)',
    borderColor: alpha(COLORS.primary, 0.3),
    '& .car-image': {
      transform: 'scale(1.08)',
    },
    '& .view-btn': {
      backgroundColor: COLORS.primary,
      color: '#fff',
      borderColor: COLORS.primary,
      transform: 'translateX(4px)',
    },
    '& .price-badge': {
      transform: 'scale(1.05)',
      background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)`,
    }
  }
}));

// === Hauteur d'image strictement fixe ===
const CarImage = styled(CardMedia)({
  height: '220px !important',
  minHeight: '220px !important',
  maxHeight: '220px !important',
  width: '100%',
  objectFit: 'cover',
  transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
  flexShrink: 0,
});

const PriceBadge = styled(Box)({
  position: 'absolute',
  top: 20,
  right: 20,
  background: 'rgba(26, 35, 50, 0.92)',
  color: 'white',
  padding: '10px 20px',
  borderRadius: 100,
  fontWeight: 800,
  fontSize: '1.1rem',
  backdropFilter: 'blur(12px)',
  boxShadow: '0 8px 20px rgba(0,0,0,0.25)',
  border: '2px solid rgba(255,255,255,0.15)',
  transition: 'all 0.3s ease',
  zIndex: 2,
});

const SpecBadge = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  color: theme.palette.text.secondary,
  fontSize: '0.9rem',
  fontWeight: 600,
  background: alpha(COLORS.primary, 0.06),
  padding: '10px 14px',
  borderRadius: 10,
  border: `1px solid ${alpha(COLORS.primary, 0.1)}`,
  transition: 'all 0.2s ease',
  '&:hover': {
    background: alpha(COLORS.primary, 0.1),
    transform: 'translateY(-2px)',
  }
}));

function HomePage() {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    make: 'all',
    priceRange: [0, 1000000],
    sortBy: 'price-asc',
    searchQuery: '',
  });
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 16,
    total: 0
  });

  const [priceAnchorEl, setPriceAnchorEl] = useState(null);
  const openPrice = Boolean(priceAnchorEl);

  const fetchCars = async (filters = {}, page = 1) => {
    try {
      setLoading(true);
      const params = {
        page,
        limit: pagination.pageSize,
        ...(filters.make && filters.make !== 'all' && { make: filters.make }),
        minPrice: filters.priceRange?.[0] || 0,
        maxPrice: filters.priceRange?.[1] || 1000000,
        ...(filters.searchQuery && { search: filters.searchQuery }),
        sortBy: filters.sortBy || 'price-asc'
      };

      const response = await api.get('/cars', { params });
      
      setCars(response.data.data || []);
      setPagination(prev => ({
        ...prev,
        page,
        total: response.data.pagination?.total || 0
      }));
    } catch (err) {
      console.error('Error fetching cars:', err);
      setError('Impossible de charger les véhicules. Veuillez réessayer.');
      setCars([]);
    } finally {
      setLoading(false);
    }
  };

  // Effet pour charger les données initiales
  useEffect(() => {
    fetchCars(filters, 1);
  }, []);

  // Effet pour gérer les changements de filtres avec debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCars(filters, 1);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [filters.make, filters.priceRange, filters.sortBy, filters.searchQuery]);

  // Gestion de la recherche depuis le champ de recherche
  const handleSearch = (e) => {
    e?.preventDefault();
    fetchCars(filters, 1);
  };

  const filteredCars = useMemo(() => {
    if (!cars || !Array.isArray(cars)) return [];

    let result = [...cars];

    if (filters.make && filters.make !== 'all') {
      result = result.filter(car => car.make === filters.make);
    }

    result = result.filter(
      car => car.price >= filters.priceRange[0] && car.price <= filters.priceRange[1]
    );

    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      result = result.filter(car =>
        `${car.make} ${car.model} ${car.year} ${car.series || ''} ${car.location || ''} ${car.location_city || ''}`.toLowerCase().includes(q)
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

  const handlePageChange = (event, newPage) => {
    fetchCars(filters, newPage);
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(price);

  const handlePriceChange = (event, newValue) => {
    setFilters(prev => ({ ...prev, priceRange: newValue }));
  };

  const clearFilters = () => {
    const newFilters = {
      make: 'all',
      priceRange: [0, 1000000],
      sortBy: 'price-asc',
      searchQuery: '',
    };
    setFilters(newFilters);
    fetchCars(newFilters, 1);
  };

  if (loading) {
    return (
      <Box>
        <Skeleton variant="rectangular" height={600} sx={{ width: '100%', mb: 4 }} />
        <Container maxWidth="xl">
          <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 6, mb: 6 }} />
          <Grid container spacing={3}>
            {[...Array(9)].map((_, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Skeleton variant="rectangular" height={480} sx={{ borderRadius: 4 }} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ mt: 10 }}>
        <Alert severity="error" variant="filled" sx={{ borderRadius: 4 }}>
          {error}
        </Alert>
        <Button
          variant="contained"
          onClick={() => window.location.reload()}
          sx={{ mt: 3 }}
        >
          Réessayer
        </Button>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', pb: 8, bgcolor: theme.palette.background.default }}>
      {/* Hero Section */}
      <HeroWrapper>
        <Fade in timeout={800}>
          <HeroSection>
            <Container maxWidth="lg">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
                style={{ textAlign: 'center' }}
              >
                <Chip
                  label={t('hero.newArrivals')}
                  sx={{
                    mb: 4,
                    fontWeight: 800,
                    px: 3,
                    py: 1.5,
                    height: 'auto',
                    fontSize: '0.9rem',
                    background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)`,
                    color: '#fff',
                    boxShadow: `0 8px 24px ${alpha(COLORS.primary, 0.5)}`,
                  }}
                />
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2.5rem', sm: '4rem', md: '6rem' },
                    fontWeight: 900,
                    lineHeight: 1.05,
                    mb: 4,
                    letterSpacing: '-0.03em',
                    background: theme.palette.mode === 'light'
                      ? `linear-gradient(135deg, ${COLORS.accent} 0%, #475569 100%)`
                      : 'linear-gradient(135deg, #ffffff 0%, #94a3b8 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {t('hero.title1')}
                  <br />
                  <Box component="span" sx={{ color: COLORS.primary, WebkitTextFillColor: 'initial' }}>
                    {t('hero.title2')}
                  </Box>
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color: theme.palette.text.secondary,
                    mb: 6,
                    fontWeight: 400,
                    maxWidth: 750,
                    mx: 'auto',
                    lineHeight: 1.7,
                    fontSize: { xs: '1.1rem', md: '1.45rem' },
                  }}
                >
                  {t('hero.subtitle')}
                </Typography>
              </motion.div>
            </Container>
          </HeroSection>
        </Fade>
      </HeroWrapper>

      {/* Content Section - Container pour marges équilibrées */}
      <Container maxWidth="xl" sx={{ mt: 0, px: { xs: 2, sm: 3, md: 4 } }}>
        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <FilterBar elevation={0}>
            <Grid container spacing={2} alignItems="center">
              {/* Recherche */}
              <Grid item xs={12} md={2.5}>
                <TextField
                  fullWidth
                  placeholder={t('filters.search')}
                  value={filters.searchQuery}
                  onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: COLORS.primary }} />
                      </InputAdornment>
                    ),
                    sx: {
                      borderRadius: 3,
                      bgcolor: alpha(theme.palette.background.paper, 0.5)
                    },
                  }}
                  size="medium"
                />
              </Grid>

              {/* Marque */}
              <Grid item xs={6} md={2.5}>
                <FormControl fullWidth size="medium" key={`make-select-${i18n.language}`}>
                  <InputLabel id="make-select-label">{t('filters.brand')}</InputLabel>
                  <Select
                    labelId="make-select-label"
                    id="make-select"
                    value={filters.make}
                    label={t('filters.brand')}
                    onChange={(e) => setFilters(prev => ({ ...prev, make: e.target.value }))}
                    sx={{
                      borderRadius: 3,
                      bgcolor: alpha(theme.palette.background.paper, 0.5)
                    }}
                  >
                    <MenuItem value="all">{t('filters.all')}</MenuItem>
                    {['Toyota', 'Honda', 'Ford', 'BMW', 'Mercedes', 'Audi', 'Volkswagen', 'Peugeot', 'Renault'].map(m => (
                      <MenuItem key={m} value={m}>{m}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Prix */}
              <Grid item xs={6} md={2}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={(e) => setPriceAnchorEl(e.currentTarget)}
                  startIcon={<EuroIcon />}
                  endIcon={
                    <Badge
                      badgeContent={
                        filters.priceRange[0] > 0 || filters.priceRange[1] < 1000000 ? '!' : 0
                      }
                      color="primary"
                      variant="dot"
                    />
                  }
                  sx={{
                    height: 56,
                    borderRadius: 3,
                    borderColor: alpha(theme.palette.divider, 0.2),
                    color: 'text.primary',
                    bgcolor: alpha(theme.palette.background.paper, 0.5),
                    justifyContent: 'space-between',
                    textTransform: 'none',
                  }}
                >
                  {t('filters.budget')}
                </Button>
                <Popover
                  open={openPrice}
                  anchorEl={priceAnchorEl}
                  onClose={() => setPriceAnchorEl(null)}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                  PaperProps={{
                    sx: {
                      p: 3,
                      width: 320,
                      borderRadius: 4,
                      mt: 1,
                      boxShadow: theme.shadows[10]
                    }
                  }}
                >
                  <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                    {t('filters.priceRange')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 2 }}>
                    {formatPrice(filters.priceRange[0])} - {formatPrice(filters.priceRange[1])}
                  </Typography>
                  <Slider
                    value={filters.priceRange}
                    onChange={handlePriceChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={1000000}
                    step={1000}
                    sx={{ color: COLORS.primary }}
                  />
                </Popover>
              </Grid>

              {/* Tri */}
              <Grid item xs={6} md={2}>
                <FormControl fullWidth size="medium" key={`sort-select-${i18n.language}`}>
                  <InputLabel id="sort-select-label">{t('filters.sortBy')}</InputLabel>
                  <Select
                    labelId="sort-select-label"
                    id="sort-select"
                    value={filters.sortBy}
                    label={t('filters.sortBy')}
                    onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                    startAdornment={
                      <InputAdornment position="start">
                        <SortIcon fontSize="small" />
                      </InputAdornment>
                    }
                    sx={{
                      borderRadius: 3,
                      bgcolor: alpha(theme.palette.background.paper, 0.5)
                    }}
                  >
                    {[
                      { value: 'price-asc', label: t('filters.sortOptions.priceAsc') },
                      { value: 'price-desc', label: t('filters.sortOptions.priceDesc') },
                      { value: 'year-desc', label: t('filters.sortOptions.yearDesc') },
                      { value: 'year-asc', label: t('filters.sortOptions.yearAsc') },
                      { value: 'mileage-asc', label: t('filters.sortOptions.mileageAsc') },
                    ].map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Reset & Count */}
              <Grid item xs={12} md={3} display="flex" justifyContent="flex-end" gap={1.5}>
                <Button
                  color="error"
                  onClick={clearFilters}
                  sx={{
                    minWidth: 56,
                    height: 56,
                    borderRadius: 3,
                    border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`
                  }}
                >
                  <RestartAltIcon />
                </Button>
                <Chip
                  label={t('filters.vehiclesCount', { count: filteredCars.length })}
                  color="primary"
                  sx={{
                    fontWeight: 700,
                    height: 56,
                    borderRadius: 3,
                    px: 3,
                    fontSize: '1rem',
                    flex: 1,
                  }}
                />
              </Grid>
            </Grid>
          </FilterBar>
        </motion.div>

        {/* Grille de voitures avec CSS Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '24px',
            width: '100%',
            '@media (max-width: 600px)': {
              gridTemplateColumns: '1fr',
              gap: '16px'
            }
          }}
        >
          <AnimatePresence>
            {cars.map((car, index) => {
              const imageUrl = car.photos?.[0] ||
                `https://source.unsplash.com/random/800x600/?${car.make}+${car.model}`;

              return (
                <Box key={car.id}>
                  <Zoom in timeout={300 + (index % 3) * 100}>
                    <CarCard
                      component={motion.div}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Link
                        to={`/cars/${car.id}`}
                        style={{
                          textDecoration: 'none',
                          color: 'inherit',
                          display: 'flex',
                          flexDirection: 'column',
                          height: '100%'
                        }}
                      >
                        {/* Image */}
                        <Box sx={{ position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
                          <CarImage
                            className="car-image"
                            image={imageUrl}
                            title={`${car.make} ${car.model}`}
                          />
                          <PriceBadge className="price-badge">
                            {formatPrice(car.price)}
                          </PriceBadge>
                          <Box
                            sx={{
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              right: 0,
                              height: '65%',
                              background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
                              zIndex: 1,
                            }}
                          />
                        </Box>

                        {/* Contenu */}
                        <CardContent sx={{ flexGrow: 1, p: 2.5, display: 'flex', flexDirection: 'column' }}>
                          {/* Titre */}
                          <Typography
                            variant="h6"
                            fontWeight={800}
                            sx={{
                              lineHeight: 1.3,
                              mb: 2,
                              fontSize: '1.2rem',
                              height: '3.2em',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                            }}
                          >
                            {car.year} {car.make} {car.model}
                          </Typography>

                          <Divider sx={{ mb: 2, borderColor: alpha(theme.palette.divider, 0.1) }} />

                          {/* Specs */}
                          <Grid container spacing={1.5} sx={{ mb: 2.5 }}>
                            <Grid item xs={6}>
                              <SpecBadge sx={{ justifyContent: 'center' }}>
                                <SpeedIcon fontSize="small" sx={{ color: COLORS.primary }} />
                                <Typography variant="caption" fontWeight={600} noWrap>
                                  {car.mileage?.toLocaleString()} km
                                </Typography>
                              </SpecBadge>
                            </Grid>
                            <Grid item xs={6}>
                              <SpecBadge sx={{ justifyContent: 'center' }}>
                                <LocalGasStationIcon fontSize="small" sx={{ color: COLORS.primary }} />
                                <Typography variant="caption" fontWeight={600} noWrap>
                                  {car.fuelType || 'Essence'}
                                </Typography>
                              </SpecBadge>
                            </Grid>
                            <Grid item xs={12}>
                              <SpecBadge sx={{ justifyContent: 'center' }}>
                                <SettingsSuggestIcon fontSize="small" sx={{ color: COLORS.primary }} />
                                <Typography variant="caption" fontWeight={600} noWrap>
                                  {car.transmission || 'Auto'}
                                </Typography>
                              </SpecBadge>
                            </Grid>
                          </Grid>

                          {/* Button */}
                          <Button
                            className="view-btn"
                            variant="outlined"
                            fullWidth
                            endIcon={<ArrowForwardIcon />}
                            sx={{
                              mt: 'auto',
                              borderRadius: 3,
                              textTransform: 'none',
                              fontWeight: 700,
                              py: 1.2,
                              fontSize: '0.95rem',
                              borderWidth: 2,
                              borderColor: alpha(COLORS.primary, 0.2),
                              color: theme.palette.text.primary,
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                borderWidth: 2,
                                borderColor: 'transparent',
                              },
                            }}
                          >
                            {t('car.viewDetails')}
                          </Button>
                        </CardContent>
                      </Link>
                    </CarCard>
                  </Zoom>
                </Box>
              );
            })}
          </AnimatePresence>
        </Box>

        {/* Pagination */}
        {Math.ceil(pagination.total / pagination.pageSize) > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
            <Pagination
              count={Math.ceil(pagination.total / pagination.pageSize)}
              page={pagination.page}
              onChange={handlePageChange}
              size="large"
              color="primary"
              shape="rounded"
              showFirstButton
              showLastButton
              sx={{
                '& .MuiPaginationItem-root': {
                  fontSize: '1rem',
                  fontWeight: 600,
                  borderRadius: 2,
                },
              }}
            />
          </Box>
        )}

        {/* Empty State */}
        {cars.length === 0 && !loading && (
          <Box textAlign="center" py={12}>
            <DirectionsCarIcon sx={{ fontSize: 90, color: 'text.disabled', mb: 3, opacity: 0.4 }} />
            <Typography variant="h5" color="text.secondary" fontWeight={700} gutterBottom>
              Aucun véhicule trouvé
            </Typography>
            <Typography color="text.secondary" mb={4} fontSize="1.1rem">
              Essayez de modifier vos filtres pour voir plus de résultats.
            </Typography>
            <Button
              variant="contained"
              onClick={clearFilters}
              startIcon={<RestartAltIcon />}
              size="large"
            >
              Réinitialiser la recherche
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default HomePage;