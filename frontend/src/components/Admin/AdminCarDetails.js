import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
    Stack,
    alpha,
    useTheme
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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DashboardIcon from '@mui/icons-material/Dashboard';
import api from '../../api/api.js';
import ConfirmationModal from '../Common/ConfirmationModal';

// Styled Components
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

const ImageContainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: '100%',
    height: 500,
    borderRadius: 24,
    overflow: 'hidden',
    boxShadow: theme.palette.mode === 'light'
        ? '0px 20px 60px rgba(15, 23, 42, 0.15)'
        : '0px 20px 60px rgba(0, 0, 0, 0.5)',
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('md')]: {
        height: 350,
    },
}));

const NavButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: alpha(theme.palette.background.paper, 0.9),
    backdropFilter: 'blur(10px)',
    width: 48,
    height: 48,
    transition: 'all 0.3s ease',
    '&:hover': {
        backgroundColor: theme.palette.background.paper,
        transform: 'translateY(-50%) scale(1.1)',
    },
}));

function AdminCarDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const theme = useTheme();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    useEffect(() => {
        async function fetchCar() {
            try {
                setLoading(true);
                const response = await api.get(`/cars/${id}`);
                setCar(response.data);
                setCurrentPhotoIndex(0);
            } catch (err) {
                setError('Voiture introuvable.');
            } finally {
                setLoading(false);
            }
        }
        fetchCar();
    }, [id]);

    const prevPhoto = () => {
        setCurrentPhotoIndex((idx) => (idx === 0 ? photos.length - 1 : idx - 1));
    };

    const nextPhoto = () => {
        setCurrentPhotoIndex((idx) => (idx === photos.length - 1 ? 0 : idx + 1));
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR',
            maximumFractionDigits: 0
        }).format(price);
    };

    const handleDeleteClick = () => {
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        setDeleteModalOpen(false);
        try {
            await api.delete(`/cars/${id}`);
            navigate('/admin/dashboard');
        } catch {
            alert('Erreur lors de la suppression.');
        }
    };

    if (loading) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Skeleton variant="rectangular" height={60} sx={{ borderRadius: 4, mb: 3 }} />
                <Skeleton variant="rectangular" height={500} sx={{ borderRadius: 6, mb: 4 }} />
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                        <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 4 }} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 4 }} />
                    </Grid>
                </Grid>
            </Container>
        );
    }

    if (error || !car) {
        return (
            <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
                <Alert severity="error" sx={{ mb: 3, borderRadius: 3 }}>
                    {error || 'Voiture introuvable.'}
                </Alert>
                <Button
                    variant="contained"
                    startIcon={<DashboardIcon />}
                    onClick={() => navigate('/admin/dashboard')}
                >
                    Retour au tableau de bord
                </Button>
            </Container>
        );
    }

    const fullName = `${car.year} ${car.make} ${car.model} ${car.series || ''}`.trim();
    const photos = car.photos?.length > 0 ? car.photos : ['https://source.unsplash.com/random/1200x800/?car'];

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" flexWrap="wrap">
                    <Box>
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
                            Détails du véhicule
                        </Typography>
                        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500 }}>
                            {fullName}
                        </Typography>
                    </Box>
                    <Button
                        startIcon={<ArrowBackIcon />}
                        onClick={() => navigate('/admin/dashboard')}
                        sx={{
                            fontWeight: 600,
                            borderRadius: 3,
                            px: 3,
                            py: 1.5,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateX(-4px)',
                            },
                        }}
                    >
                        Retour au tableau de bord
                    </Button>
                </Stack>
            </Box>

            {/* Image Gallery */}
            <ImageContainer>
                <Box
                    component="img"
                    src={photos[currentPhotoIndex]}
                    alt={`${fullName} photo ${currentPhotoIndex + 1}`}
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />

                {photos.length > 1 && (
                    <>
                        <NavButton
                            onClick={prevPhoto}
                            aria-label="Photo précédente"
                            sx={{ left: 16 }}
                        >
                            <ChevronLeftIcon />
                        </NavButton>
                        <NavButton
                            onClick={nextPhoto}
                            aria-label="Photo suivante"
                            sx={{ right: 16 }}
                        >
                            <ChevronRightIcon />
                        </NavButton>
                    </>
                )}

                {/* Photo Counter */}
                <Paper
                    sx={{
                        position: 'absolute',
                        bottom: 16,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                        backdropFilter: 'blur(10px)',
                        backgroundColor: alpha(theme.palette.background.paper, 0.8),
                    }}
                >
                    <Typography variant="body2" fontWeight={600}>
                        {currentPhotoIndex + 1} / {photos.length}
                    </Typography>
                </Paper>
            </ImageContainer>

            <Grid container spacing={4}>
                {/* Main Info */}
                <Grid item xs={12} md={8}>
                    <DashboardCard sx={{ p: 4 }}>
                        {/* Title */}
                        <Box sx={{ mb: 3 }}>
                            <Typography
                                variant="h4"
                                component="h2"
                                gutterBottom
                                sx={{
                                    fontFamily: 'Outfit, sans-serif',
                                    fontWeight: 700,
                                    background: theme.palette.mode === 'light'
                                        ? 'linear-gradient(135deg, #FF6B35 0%, #FF9F1C 100%)'
                                        : 'linear-gradient(135deg, #FF8C61 0%, #FFB84D 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                }}
                            >
                                {fullName}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                <Chip
                                    label={car.condition === 'new' ? 'Neuf' : 'Occasion'}
                                    color={car.condition === 'new' ? 'primary' : 'secondary'}
                                    sx={{ fontWeight: 600 }}
                                />
                                <Chip
                                    icon={<DirectionsCarIcon />}
                                    label={car.year}
                                    variant="outlined"
                                    sx={{ fontWeight: 600 }}
                                />
                                <Chip
                                    label={`Stock #${car.stock_number}`}
                                    variant="outlined"
                                    sx={{ fontWeight: 600 }}
                                />
                            </Box>
                        </Box>

                        <Divider sx={{ my: 3 }} />

                        {/* Specifications Grid */}
                        <Grid container spacing={3}>
                            <Grid item xs={6} sm={4}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <SpeedIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                        Kilométrage
                                    </Typography>
                                    <Typography variant="h6" fontWeight={700}>
                                        {car.mileage?.toLocaleString()} km
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={6} sm={4}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <LocalGasStationIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                        Carburant
                                    </Typography>
                                    <Typography variant="h6" fontWeight={700}>
                                        {car.fuelType || car.fuel_type || 'N/C'}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={6} sm={4}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <SettingsIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                        Transmission
                                    </Typography>
                                    <Typography variant="h6" fontWeight={700}>
                                        {car.transmission || 'N/C'}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={6} sm={4}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <LocationOnIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                        Localisation
                                    </Typography>
                                    <Typography variant="h6" fontWeight={700}>
                                        {car.location_city || 'N/C'}
                                    </Typography>
                                    {car.location_branch && (
                                        <Typography variant="body2" color="text.secondary">
                                            {car.location_branch}
                                        </Typography>
                                    )}
                                </Box>
                            </Grid>
                            <Grid item xs={6} sm={4}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <DirectionsCarIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                        Cylindres
                                    </Typography>
                                    <Typography variant="h6" fontWeight={700}>
                                        {car.cylinders || 'N/C'}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={6} sm={4}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <DirectionsCarIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                        Marque
                                    </Typography>
                                    <Typography variant="h6" fontWeight={700}>
                                        {car.make}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>

                        {car.vin && (
                            <>
                                <Divider sx={{ my: 3 }} />
                                <Box>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                        Numéro VIN
                                    </Typography>
                                    <Typography variant="body1" fontWeight={600} sx={{ fontFamily: 'monospace' }}>
                                        {car.vin}
                                    </Typography>
                                </Box>
                            </>
                        )}
                    </DashboardCard>
                </Grid>

                {/* Price & Admin Actions */}
                <Grid item xs={12} md={4}>
                    <DashboardCard sx={{ p: 4 }}>
                        <Box
                            sx={{
                                background: theme.palette.mode === 'light'
                                    ? 'linear-gradient(135deg, #FF6B35 0%, #FF9F1C 100%)'
                                    : 'linear-gradient(135deg, #FF8C61 0%, #FFB84D 100%)',
                                borderRadius: 3,
                                p: 3,
                                mb: 3,
                                textAlign: 'center',
                                color: 'white',
                            }}
                        >
                            <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                                Prix de vente
                            </Typography>
                            <Typography
                                variant="h3"
                                component="div"
                                sx={{
                                    fontFamily: 'Outfit, sans-serif',
                                    fontWeight: 800,
                                }}
                            >
                                {formatPrice(car.sale_price || car.price)}
                            </Typography>
                        </Box>

                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
                            Actions administrateur
                        </Typography>

                        <Stack spacing={2}>
                            <Button
                                variant="contained"
                                fullWidth
                                size="large"
                                startIcon={<EditIcon />}
                                onClick={() => navigate(`/admin/edit/${car.id}`)}
                                sx={{
                                    py: 1.5,
                                    borderRadius: 3,
                                    fontWeight: 700,
                                    textTransform: 'none',
                                    background: theme.palette.mode === 'light'
                                        ? 'linear-gradient(135deg, #FF6B35 0%, #FF9F1C 100%)'
                                        : 'linear-gradient(135deg, #FF8C61 0%, #FFB84D 100%)',
                                }}
                            >
                                Modifier ce véhicule
                            </Button>

                            <Button
                                variant="outlined"
                                fullWidth
                                size="large"
                                startIcon={<DeleteIcon />}
                                onClick={handleDeleteClick}
                                color="error"
                                sx={{
                                    py: 1.5,
                                    borderRadius: 3,
                                    fontWeight: 600,
                                    textTransform: 'none',
                                }}
                            >
                                Supprimer ce véhicule
                            </Button>

                            <Divider sx={{ my: 2 }} />

                            <Button
                                variant="outlined"
                                fullWidth
                                size="large"
                                startIcon={<DashboardIcon />}
                                onClick={() => navigate('/admin/dashboard')}
                                sx={{
                                    py: 1.5,
                                    borderRadius: 3,
                                    fontWeight: 600,
                                    textTransform: 'none',
                                }}
                            >
                                Retour au tableau de bord
                            </Button>
                        </Stack>
                    </DashboardCard>
                </Grid>
            </Grid>
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

export default AdminCarDetails;
