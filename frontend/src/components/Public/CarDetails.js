import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  IconButton,
  Skeleton,
  Alert,
  Paper,
  Divider,
  alpha,
  useTheme,
  Tabs,
  Tab,
  Stack,
  Dialog,
  Fade,
  Zoom,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import SpeedIcon from '@mui/icons-material/Speed';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SettingsIcon from '@mui/icons-material/Settings';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PaletteIcon from '@mui/icons-material/Palette';
import ChairIcon from '@mui/icons-material/Chair';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import CloseIcon from '@mui/icons-material/Close';
import api from '../../api/api.js';

// Styled Components
const ImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: 550,
  borderRadius: 24,
  overflow: 'hidden',
  boxShadow: theme.palette.mode === 'light'
    ? '0px 20px 60px rgba(15, 23, 42, 0.15)'
    : '0px 20px 60px rgba(0, 0, 0, 0.5)',
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.mode === 'light' ? '#f8fafc' : '#0f172a',
  cursor: 'zoom-in',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.01)',
  },
  [theme.breakpoints.down('md')]: {
    height: 400,
  },
}));

const MainImage = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 0.5s ease',
}));

const NavButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: alpha(theme.palette.background.paper, 0.95),
  backdropFilter: 'blur(10px)',
  width: 56,
  height: 56,
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  zIndex: 2,
  '&:hover': {
    backgroundColor: theme.palette.background.paper,
    transform: 'translateY(-50%) scale(1.15)',
    boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
    borderColor: theme.palette.primary.main,
  },
}));

const ThumbnailContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1.5),
  overflowX: 'auto',
  padding: theme.spacing(1),
  marginBottom: theme.spacing(4),
  scrollbarWidth: 'thin',
  scrollbarColor: `${theme.palette.primary.main} ${alpha(theme.palette.primary.main, 0.1)}`,
  '&::-webkit-scrollbar': {
    height: 6,
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    borderRadius: 3,
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.primary.main,
    borderRadius: 3,
  },
}));

const ThumbnailImage = styled(Box)(({ theme, active }) => ({
  minWidth: 100,
  height: 80,
  borderRadius: 12,
  overflow: 'hidden',
  cursor: 'pointer',
  border: active
    ? `3px solid ${theme.palette.primary.main}`
    : `2px solid ${alpha(theme.palette.divider, 0.2)}`,
  transition: 'all 0.3s ease',
  position: 'relative',
  boxShadow: active ? `0 0 20px ${alpha(theme.palette.primary.main, 0.4)}` : 'none',
  '&:hover': {
    transform: 'translateY(-4px) scale(1.05)',
    borderColor: theme.palette.primary.main,
    boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
  },
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
}));

const FullscreenButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: 16,
  right: 16,
  backgroundColor: alpha(theme.palette.background.paper, 0.95),
  backdropFilter: 'blur(10px)',
  transition: 'all 0.3s ease',
  zIndex: 2,
  '&:hover': {
    backgroundColor: theme.palette.background.paper,
    transform: 'scale(1.1)',
  },
}));

const InfoCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: 20,
  backdropFilter: 'blur(20px)',
  backgroundColor: theme.palette.mode === 'light'
    ? 'rgba(255, 255, 255, 0.9)'
    : 'rgba(30, 41, 59, 0.9)',
  border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(148, 163, 184, 0.1)' : 'rgba(148, 163, 184, 0.05)'}`,
  boxShadow: theme.palette.mode === 'light'
    ? '0 4px 20px rgba(15, 23, 42, 0.08)'
    : '0 4px 20px rgba(0, 0, 0, 0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.palette.mode === 'light'
      ? '0 12px 40px rgba(15, 23, 42, 0.12)'
      : '0 12px 40px rgba(0, 0, 0, 0.4)',
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '1rem',
  marginRight: theme.spacing(2),
  borderRadius: 12,
  transition: 'all 0.2s',
  '&.Mui-selected': {
    color: theme.palette.primary.main,
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
  },
}));

const FeatureBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(2.5),
  backgroundColor: alpha(theme.palette.primary.main, 0.05),
  borderRadius: 16,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
    transform: 'translateX(4px)',
    borderColor: alpha(theme.palette.primary.main, 0.2),
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const { t } = useTranslation();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [tabValue, setTabValue] = useState(0);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);

  useEffect(() => {
    async function fetchCar() {
      try {
        setLoading(true);
        const response = await api.get(`/cars/${id}`);
        setCar(response.data);
        setCurrentPhotoIndex(0);
      } catch (err) {
        setError(t('car.details.notFound'));
      } finally {
        setLoading(false);
      }
    }
    fetchCar();
  }, [id]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
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
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} lg={7}>
            <Skeleton variant="rectangular" height={550} sx={{ borderRadius: 6, mb: 2 }} />
            <Skeleton variant="rectangular" height={80} sx={{ borderRadius: 3 }} />
          </Grid>
          <Grid item xs={12} lg={5}>
            <Stack spacing={3}>
              <Skeleton variant="rectangular" height={150} sx={{ borderRadius: 4 }} />
              <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 4 }} />
              <Skeleton variant="rectangular" height={250} sx={{ borderRadius: 4 }} />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (error || !car) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Alert severity="error" sx={{ mb: 3, borderRadius: 3 }}>
          {error || t('car.details.notFound')}
        </Alert>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')} 
        >
          {t('common.backToHome')} 
        </Button>
      </Container>
    );
  }

  const fullName = `${car.year} ${car.make} ${car.model} ${car.series || ''}`.trim();
  const photos = car.photos?.length > 0 ? car.photos : ['https://source.unsplash.com/random/1200x800/?car'];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Back Button */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)} 
        sx={{
          mb: 4,
          fontWeight: 600,
          borderRadius: 2,
          px: 3,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateX(-4px)',
          },
        }}
      >
      {t('common.back')} 
      </Button>

      <Grid container spacing={4}>
        {/* Left Side: Image Gallery */}
        <Grid item xs={12} lg={7}>
          <Fade in={true} timeout={800}>
            <Box sx={{ position: 'sticky', top: 20 }}>
              <ImageContainer onClick={() => setFullscreenOpen(true)}>
                <MainImage
                  component="img"
                  src={photos[currentPhotoIndex]}
                  alt={`${fullName} photo ${currentPhotoIndex + 1}`}
                />

                {photos.length > 1 && (
                  <>
                    <NavButton
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentPhotoIndex((idx) => (idx === 0 ? photos.length - 1 : idx - 1));
                      }}
                      aria-label={t('car.details.previousPhoto')}
                      sx={{ left: 20 }}
                    >
                      <ChevronLeftIcon sx={{ fontSize: 32 }} />
                    </NavButton>
                    <NavButton
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentPhotoIndex((idx) => (idx === photos.length - 1 ? 0 : idx + 1));
                      }}
                      aria-label={t('car.details.nextPhoto')}
                      sx={{ right: 20 }}
                    >
                      <ChevronRightIcon sx={{ fontSize: 32 }} />
                    </NavButton>
                  </>
                )}

                {/* Fullscreen Button */}
                <FullscreenButton
                  onClick={(e) => {
                    e.stopPropagation();
                    setFullscreenOpen(true);
                  }}
                  aria-label="Plein écran"
                >
                  <FullscreenIcon />
                </FullscreenButton>

                {/* Photo Counter */}
                <Paper
                  sx={{
                    position: 'absolute',
                    bottom: 20,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    px: 3,
                    py: 1.5,
                    borderRadius: 3,
                    backdropFilter: 'blur(10px)',
                    backgroundColor: alpha(theme.palette.background.paper, 0.95),
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                  }}
                >
                  <Typography variant="body2" fontWeight={700}>
                    {currentPhotoIndex + 1} / {photos.length}
                  </Typography>
                </Paper>
              </ImageContainer>

              {/* Thumbnail Gallery */}
              {photos.length > 1 && (
                <ThumbnailContainer>
                  {photos.map((photo, index) => (
                    <Zoom in={true} timeout={300} key={index} style={{ transitionDelay: `${index * 50}ms` }}>
                      <ThumbnailImage
                        active={index === currentPhotoIndex}
                        onClick={() => setCurrentPhotoIndex(index)}
                      >
                        <img src={photo} alt={`Thumbnail ${index + 1}`} />
                      </ThumbnailImage>
                    </Zoom>
                  ))}
                </ThumbnailContainer>
              )}
            </Box>
          </Fade>
        </Grid>

        {/* Right Side: All Details */}
        <Grid item xs={12} lg={5}>
          <Stack spacing={3}>
            {/* Title & Condition Card */}
            <InfoCard>
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="h4"
                  component="h1"
                  gutterBottom
                  sx={{
                    fontFamily: 'Outfit, sans-serif',
                    fontWeight: 700,
                    background: (theme) =>
                      theme.palette.mode === 'light'
                        ? 'linear-gradient(135deg, #FF6B35 0%, #FF9F1C 100%)'
                        : 'linear-gradient(135deg, #FF8C61 0%, #FFB84D 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    mb: 2,
                  }}
                >
                  {fullName}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip
                    label={car.condition === 'new' ? t('car.condition.new') : t('car.condition.used')}
                    color={car.condition === 'new' ? 'primary' : 'secondary'}
                    sx={{ fontWeight: 600, fontSize: '0.9rem' }}
                  />
                  <Chip
                    icon={<DirectionsCarIcon />}
                    label={car.year}
                    variant="outlined"
                    sx={{ fontWeight: 600, fontSize: '0.9rem' }}
                  />
                </Box>
              </CardContent>
            </InfoCard>

            {/* Price Card - Prominent */}
            <InfoCard>
              <CardContent sx={{ p: 0 }}>
                <Box
                  sx={{
                    background: (theme) =>
                      theme.palette.mode === 'light'
                        ? 'linear-gradient(135deg, #FF6B35 0%, #FF9F1C 100%)'
                        : 'linear-gradient(135deg, #FF8C61 0%, #FFB84D 100%)',
                    borderRadius: '20px',
                    p: 4,
                    textAlign: 'center',
                    color: 'white',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'radial-gradient(circle at top right, rgba(255,255,255,0.2) 0%, transparent 60%)',
                      pointerEvents: 'none',
                    },
                  }}
                >
                  <Typography variant="body1" sx={{ opacity: 0.95, mb: 1.5, fontWeight: 500 }}>
                    {t('car.details.salePrice')}
                  </Typography>
                  <Typography
                    variant="h2"
                    component="div"
                    sx={{
                      fontFamily: 'Outfit, sans-serif',
                      fontWeight: 800,
                      position: 'relative',
                      mb: 3,
                    }}
                  >
                    {formatPrice(car.sale_price || car.price)}
                  </Typography>

                  <Stack spacing={2}>
                    <Button
                      variant="contained"
                      fullWidth
                      size="large"
                      sx={{
                        py: 2,
                        borderRadius: 3,
                        fontWeight: 700,
                        fontSize: '1.1rem',
                        textTransform: 'none',
                        backgroundColor: 'white',
                        color: theme.palette.mode === 'light' ? '#FF6B35' : '#FF8C61',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                        '&:hover': {
                          backgroundColor: 'rgba(255,255,255,0.95)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 12px 28px rgba(0,0,0,0.2)',
                        },
                      }}
                    >
                      {t('car.details.contactSeller')}
                    </Button>

                    <Button
                      variant="outlined"
                      fullWidth
                      size="large"
                      sx={{
                        py: 2,
                        borderRadius: 3,
                        fontWeight: 600,
                        fontSize: '1.05rem',
                        textTransform: 'none',
                        borderWidth: 2.5,
                        borderColor: 'white',
                        color: 'white',
                        '&:hover': {
                          borderWidth: 2.5,
                          borderColor: 'white',
                          backgroundColor: alpha('#fff', 0.1),
                          transform: 'translateY(-2px)',
                        }
                      }}
                    >
                      {t('car.details.requestTest')}
                    </Button>
                  </Stack>
                </Box>

                {car.location_branch && (
                  <Box sx={{ p: 3, pt: 2.5 }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ fontWeight: 600, mb: 1.5 }}>
                      {t('car.details.availableAt')}
                    </Typography>
                    <Box display="flex" alignItems="flex-start" gap={1.5}>
                      <LocationOnIcon color="primary" fontSize="medium" sx={{ mt: 0.3 }} />
                      <Box>
                        <Typography variant="subtitle1" fontWeight={700}>
                          {car.location_branch}
                        </Typography>
                        {car.location_city && (
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                            {car.location_city}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Box>
                )}
              </CardContent>
            </InfoCard>

            {/* Details Tabs Card */}
            <InfoCard>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                  <Tabs value={tabValue} onChange={handleTabChange} aria-label="car details tabs">
                    <StyledTab label={t('car.details.info')} />
                    <StyledTab label={t('car.details.description')} />
                    <StyledTab label={t('car.details.specifications')} />
                  </Tabs>
                </Box>

                {/* Tab 1: Informations (Odometer) */}
                <TabPanel value={tabValue} index={0}>
                  <FeatureBox>
                    <SpeedIcon color="primary" sx={{ fontSize: 36 }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        {t('car.mileage')}
                      </Typography>
                      <Typography variant="h6" fontWeight={700}>
                        {car.mileage?.toLocaleString()} km
                      </Typography>
                    </Box>
                  </FeatureBox>
                </TabPanel>

                {/* Tab 2: Description (Transmission, Fuel, Cylinders) */}
                <TabPanel value={tabValue} index={1}>
                  <Stack spacing={2}>
                    <FeatureBox>
                      <SettingsIcon color="primary" sx={{ fontSize: 36 }} />
                      <Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                          {t('car.transmission.label')}
                        </Typography>
                        <Typography variant="h6" fontWeight={700}>
                          {car.transmission || 'N/C'}
                        </Typography>
                      </Box>
                    </FeatureBox>

                    <FeatureBox>
                      <LocalGasStationIcon color="primary" sx={{ fontSize: 36 }} />
                      <Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                          {t('car.fuel')}
                        </Typography>
                        <Typography variant="h6" fontWeight={700}>
                          {car.fuelType || car.fuel_type || 'N/C'}
                        </Typography>
                      </Box>
                    </FeatureBox>

                    <FeatureBox>
                      <DirectionsCarIcon color="primary" sx={{ fontSize: 36 }} />
                      <Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                          {t('car.cylinders')}
                        </Typography>
                        <Typography variant="h6" fontWeight={700}>
                          {car.cylinders || 'N/C'}
                        </Typography>
                      </Box>
                    </FeatureBox>
                  </Stack>
                </TabPanel>

                {/* Tab 3: Caractéristiques (Everything else) */}
                <TabPanel value={tabValue} index={2}>
                  <Stack spacing={2.5}>
                    {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <PaletteIcon color="primary" sx={{ fontSize: 28 }} />
                      <Box>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                          Couleur extérieure
                        </Typography>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {car.color || 'N/C'}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <ChairIcon color="primary" sx={{ fontSize: 28 }} />
                      <Box>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                          Intérieur
                        </Typography>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {car.interior || 'N/C'}
                        </Typography>
                      </Box>
                    </Box> */}

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <LocationOnIcon color="primary" sx={{ fontSize: 28 }} />
                      <Box>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                          {t('car.location')}
                        </Typography>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {car.location_city || 'N/C'}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <ConfirmationNumberIcon color="primary" sx={{ fontSize: 28 }} />
                      <Box>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                          {t('car.details.stockNumber')}
                        </Typography>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {car.stock_number || 'N/C'}
                        </Typography>
                      </Box>
                    </Box>

                    <Divider sx={{ my: 1.5 }} />

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ minWidth: 60, fontSize: '0.85rem' }}>
                        VIN:
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: 'monospace',
                          bgcolor: 'action.hover',
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 1,
                          fontSize: '0.85rem',
                        }}
                      >
                        {car.vin || 'N/C'}
                      </Typography>
                    </Box>
                  </Stack>
                </TabPanel>
              </CardContent>
            </InfoCard>
          </Stack>
        </Grid>
      </Grid>

      {/* Fullscreen Image Dialog */}
      <Dialog
        fullScreen
        open={fullscreenOpen}
        onClose={() => setFullscreenOpen(false)}
        TransitionComponent={Fade}
        PaperProps={{
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            backdropFilter: 'blur(20px)',
          }
        }}
      >
        <IconButton
          onClick={() => setFullscreenOpen(false)}
          sx={{
            position: 'absolute',
            top: 20,
            right: 20,
            color: 'white',
            backgroundColor: alpha('#fff', 0.1),
            zIndex: 3,
            '&:hover': {
              backgroundColor: alpha('#fff', 0.2),
            },
          }}
        >
          <CloseIcon />
        </IconButton>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            position: 'relative',
            p: 4,
          }}
        >
          <Box
            component="img"
            src={photos[currentPhotoIndex]}
            alt={`${fullName} photo ${currentPhotoIndex + 1}`}
            sx={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
            }}
          />

          {photos.length > 1 && (
            <>
              <IconButton
                onClick={() => setCurrentPhotoIndex((idx) => (idx === 0 ? photos.length - 1 : idx - 1))}
                sx={{
                  position: 'absolute',
                  left: 40,
                  color: 'white',
                  backgroundColor: alpha('#fff', 0.1),
                  width: 64,
                  height: 64,
                  '&:hover': {
                    backgroundColor: alpha('#fff', 0.2),
                  },
                }}
              >
                <ChevronLeftIcon sx={{ fontSize: 40 }} />
              </IconButton>
              <IconButton
                onClick={() => setCurrentPhotoIndex((idx) => (idx === photos.length - 1 ? 0 : idx + 1))}
                sx={{
                  position: 'absolute',
                  right: 40,
                  color: 'white',
                  backgroundColor: alpha('#fff', 0.1),
                  width: 64,
                  height: 64,
                  '&:hover': {
                    backgroundColor: alpha('#fff', 0.2),
                  },
                }}
              >
                <ChevronRightIcon sx={{ fontSize: 40 }} />
              </IconButton>

              {/* Photo Counter in Fullscreen */}
              <Paper
                sx={{
                  position: 'absolute',
                  bottom: 40,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  px: 4,
                  py: 2,
                  borderRadius: 4,
                  backgroundColor: alpha('#fff', 0.1),
                  backdropFilter: 'blur(20px)',
                  color: 'white',
                }}
              >
                <Typography variant="h6" fontWeight={700}>
                  {currentPhotoIndex + 1} / {photos.length}
                </Typography>
              </Paper>
            </>
          )}
        </Box>
      </Dialog>
    </Container>
  );
}

export default CarDetails;
