import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    TextField,
    Button,
    Paper,
    useTheme,
    Snackbar,
    Alert,
    Chip,
    Divider,
    alpha,
    keyframes,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Animations
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(1); opacity: 0.8; }
`;

const Contact = () => {
    const theme = useTheme();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [focusedField, setFocusedField] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        setOpenSnackbar(true);
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
        });
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const contactInfo = [
        {
            icon: <PhoneIcon sx={{ fontSize: 30 }} />,
            title: 'Téléphone',
            content: '+33 1 23 45 67 89',
            color: '#FF6B9D',
        },
        {
            icon: <EmailIcon sx={{ fontSize: 30 }} />,
            title: 'Email',
            content: 'contact@automarket.fr',
            color: '#4ECDC4',
        },
        {
            icon: <LocationOnIcon sx={{ fontSize: 30 }} />,
            title: 'Adresse',
            content: '123 Avenue des Champs-Élysées, 75008 Paris',
            color: '#A594F9',
        },
    ];

    const openingHours = [
        { day: 'Lundi - Vendredi', hours: '09:00 - 19:00', open: true },
        { day: 'Samedi', hours: '10:00 - 18:00', open: true },
        { day: 'Dimanche', hours: 'Fermé', open: false },
    ];

    return (
        <Box sx={{ pb: 8 }}>
            {/* Hero Section with Glassmorphism */}
            <Box
                sx={{
                    position: 'relative',
                    py: 12,
                    mb: 8,
                    overflow: 'hidden',
                    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%)`,
                }}
            >
                {/* Floating decorative elements */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: '10%',
                        right: '10%',
                        width: 100,
                        height: 100,
                        borderRadius: '50%',
                        background: alpha('#fff', 0.1),
                        animation: `${float} 6s ease-in-out infinite`,
                    }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: '20%',
                        left: '5%',
                        width: 150,
                        height: 150,
                        borderRadius: '50%',
                        background: alpha('#fff', 0.08),
                        animation: `${float} 8s ease-in-out infinite`,
                        animationDelay: '1s',
                    }}
                />

                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                    <Box
                        sx={{
                            textAlign: 'center',
                            color: 'white',
                        }}
                    >
                        <EmailIcon
                            sx={{
                                fontSize: 80,
                                mb: 3,
                                opacity: 0.9,
                                animation: `${pulse} 3s ease-in-out infinite`,
                            }}
                        />
                        <Typography
                            variant="h2"
                            component="h1"
                            sx={{
                                fontWeight: 800,
                                mb: 2,
                                fontFamily: 'Outfit',
                                textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                            }}
                        >
                            Contactez-nous
                        </Typography>
                        <Typography
                            variant="h5"
                            sx={{
                                opacity: 0.95,
                                maxWidth: 700,
                                mx: 'auto',
                                lineHeight: 1.6,
                            }}
                        >
                            Une question ? Un projet ? Notre équipe est là pour vous accompagner.
                        </Typography>
                        <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Chip
                                icon={<CheckCircleIcon />}
                                label="Réponse sous 24h"
                                sx={{
                                    bgcolor: alpha('#fff', 0.2),
                                    color: 'white',
                                    backdropFilter: 'blur(10px)',
                                    fontWeight: 600,
                                    px: 1,
                                }}
                            />
                            <Chip
                                icon={<CheckCircleIcon />}
                                label="Support dédié"
                                sx={{
                                    bgcolor: alpha('#fff', 0.2),
                                    color: 'white',
                                    backdropFilter: 'blur(10px)',
                                    fontWeight: 600,
                                    px: 1,
                                }}
                            />
                        </Box>
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="lg">
                <Grid container spacing={6}>
                    {/* Contact Form */}
                    <Grid item xs={12} md={7}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 5,
                                borderRadius: 4,
                                background: theme.palette.mode === 'dark'
                                    ? alpha(theme.palette.background.paper, 0.6)
                                    : alpha('#fff', 0.8),
                                backdropFilter: 'blur(20px)',
                                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                                boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.1)}`,
                                transition: 'transform 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: `0 12px 48px ${alpha(theme.palette.primary.main, 0.15)}`,
                                },
                            }}
                        >
                            <Typography
                                variant="h4"
                                gutterBottom
                                sx={{
                                    fontWeight: 700,
                                    mb: 1,
                                    fontFamily: 'Outfit',
                                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                Envoyez-nous un message
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                                Remplissez le formulaire ci-dessous et notre équipe vous répondra dans les plus brefs délais.
                            </Typography>
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Nom complet"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField('name')}
                                            onBlur={() => setFocusedField(null)}
                                            required
                                            variant="outlined"
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 2,
                                                    transition: 'all 0.3s ease',
                                                    '&.Mui-focused': {
                                                        transform: 'translateY(-2px)',
                                                        boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.2)}`,
                                                    },
                                                },
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField('email')}
                                            onBlur={() => setFocusedField(null)}
                                            required
                                            variant="outlined"
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 2,
                                                    transition: 'all 0.3s ease',
                                                    '&.Mui-focused': {
                                                        transform: 'translateY(-2px)',
                                                        boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.2)}`,
                                                    },
                                                },
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Sujet"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField('subject')}
                                            onBlur={() => setFocusedField(null)}
                                            required
                                            variant="outlined"
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 2,
                                                    transition: 'all 0.3s ease',
                                                    '&.Mui-focused': {
                                                        transform: 'translateY(-2px)',
                                                        boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.2)}`,
                                                    },
                                                },
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Message"
                                            name="message"
                                            multiline
                                            rows={5}
                                            value={formData.message}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField('message')}
                                            onBlur={() => setFocusedField(null)}
                                            required
                                            variant="outlined"
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 2,
                                                    transition: 'all 0.3s ease',
                                                    '&.Mui-focused': {
                                                        transform: 'translateY(-2px)',
                                                        boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.2)}`,
                                                    },
                                                },
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            size="large"
                                            endIcon={<SendIcon />}
                                            fullWidth
                                            sx={{
                                                px: 4,
                                                py: 1.8,
                                                borderRadius: 2,
                                                fontWeight: 600,
                                                fontSize: '1.1rem',
                                                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    transform: 'translateY(-3px)',
                                                    boxShadow: `0 8px 30px ${alpha(theme.palette.primary.main, 0.4)}`,
                                                },
                                            }}
                                        >
                                            Envoyer le message
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Paper>
                    </Grid>

                    {/* Contact Info & Hours */}
                    <Grid item xs={12} md={5}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            {/* Contact Cards */}
                            {contactInfo.map((info, index) => (
                                <Paper
                                    key={index}
                                    elevation={0}
                                    sx={{
                                        p: 3,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 3,
                                        borderRadius: 3,
                                        background: theme.palette.mode === 'dark'
                                            ? alpha(theme.palette.background.paper, 0.6)
                                            : alpha('#fff', 0.8),
                                        backdropFilter: 'blur(20px)',
                                        border: `1px solid ${alpha(info.color, 0.2)}`,
                                        transition: 'all 0.3s ease',
                                        cursor: 'pointer',
                                        '&:hover': {
                                            transform: 'translateX(10px)',
                                            borderColor: info.color,
                                            boxShadow: `0 8px 24px ${alpha(info.color, 0.25)}`,
                                            '& .icon-box': {
                                                transform: 'rotate(360deg) scale(1.1)',
                                            },
                                        },
                                    }}
                                >
                                    <Box
                                        className="icon-box"
                                        sx={{
                                            p: 2,
                                            borderRadius: '50%',
                                            background: `linear-gradient(135deg, ${alpha(info.color, 0.2)}, ${alpha(info.color, 0.1)})`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: info.color,
                                            transition: 'transform 0.5s ease',
                                        }}
                                    >
                                        {info.icon}
                                    </Box>
                                    <Box>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                            sx={{
                                                textTransform: 'uppercase',
                                                letterSpacing: 1.5,
                                                fontWeight: 600,
                                            }}
                                        >
                                            {info.title}
                                        </Typography>
                                        <Typography variant="body1" sx={{ fontWeight: 600, mt: 0.5 }}>
                                            {info.content}
                                        </Typography>
                                    </Box>
                                </Paper>
                            ))}

                            {/* Opening Hours */}
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 4,
                                    borderRadius: 3,
                                    background: theme.palette.mode === 'dark'
                                        ? alpha(theme.palette.background.paper, 0.6)
                                        : alpha('#fff', 0.8),
                                    backdropFilter: 'blur(20px)',
                                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                                    mt: 2,
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                                    <AccessTimeIcon sx={{ color: 'primary.main', fontSize: 30 }} />
                                    <Typography variant="h6" sx={{ fontWeight: 700, fontFamily: 'Outfit' }}>
                                        Heures d'ouverture
                                    </Typography>
                                </Box>
                                <Divider sx={{ mb: 3 }} />
                                {openingHours.map((schedule, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            py: 1.5,
                                            borderBottom: index < openingHours.length - 1 ? `1px solid ${theme.palette.divider}` : 'none',
                                        }}
                                    >
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                            {schedule.day}
                                        </Typography>
                                        <Chip
                                            label={schedule.hours}
                                            size="small"
                                            sx={{
                                                bgcolor: schedule.open
                                                    ? alpha(theme.palette.success.main, 0.1)
                                                    : alpha(theme.palette.error.main, 0.1),
                                                color: schedule.open
                                                    ? theme.palette.success.main
                                                    : theme.palette.error.main,
                                                fontWeight: 600,
                                            }}
                                        />
                                    </Box>
                                ))}
                            </Paper>

                            {/* Map */}
                            <Paper
                                elevation={0}
                                sx={{
                                    height: 280,
                                    borderRadius: 3,
                                    overflow: 'hidden',
                                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                                    boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.1)}`,
                                }}
                            >
                                <iframe
                                    title="map"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d2.292292615509614!3d48.87379177928921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fc4f8f8f8f7%3A0x9898989898989898!2sChamps-%C3%89lys%C3%A9es!5e0!3m2!1sen!2sfr!4v1623333333333!5m2!1sen!2sfr"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                />
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
            </Container>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="success"
                    sx={{
                        width: '100%',
                        borderRadius: 2,
                        fontWeight: 600,
                    }}
                >
                    Votre message a été envoyé avec succès ! 🎉
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Contact;
