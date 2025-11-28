import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Grid, Typography, Link, IconButton, Stack, Divider, useTheme, alpha } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Footer = () => {
    const { t } = useTranslation();
    const theme = useTheme();

    return (
        <Box
            component="footer"
            sx={{
                bgcolor: theme.palette.mode === 'light' ? 'white' : 'background.paper',
                pt: 8,
                pb: 4,
                borderTop: `1px solid ${theme.palette.divider}`,
                position: 'relative',
                overflow: 'hidden',
                width: '100%',
                maxWidth: '100%',
                mx: 'auto',
                px: { xs: 3, sm: 4, md: 6, lg: 8, xl: 10 },
            }}
        >
            <Box sx={{
                maxWidth: '100%',
                mx: 'auto',
                px: { xs: 0, sm: 2, md: 3 }
            }}>
                <Grid container spacing={6} justifyContent="center">
                    {/* Brand Column */}
                    <Grid item xs={12} md={4} xl={3}>
                        <Box display="flex" alignItems="center" gap={1} mb={2}>
                            <DirectionsCarIcon color="primary" sx={{ fontSize: 32 }} />
                            <Typography
                                variant="h5"
                                sx={{
                                    fontFamily: 'Outfit, sans-serif',
                                    fontWeight: 800,
                                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                {t('nav.brandName')}
                            </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 300, lineHeight: 1.8 }}>
                            {t('footer.description')}
                        </Typography>
                        <Stack direction="row" spacing={1}>
                            <IconButton size="small" color="primary" sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }}>
                                <FacebookIcon fontSize="small" />
                            </IconButton>
                            <IconButton size="small" color="primary" sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }}>
                                <TwitterIcon fontSize="small" />
                            </IconButton>
                            <IconButton size="small" color="primary" sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }}>
                                <InstagramIcon fontSize="small" />
                            </IconButton>
                            <IconButton size="small" color="primary" sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }}>
                                <LinkedInIcon fontSize="small" />
                            </IconButton>
                        </Stack>
                    </Grid>

                    {/* Quick Links */}
                    <Grid item xs={6} sm={4} md={2} xl={2}>
                        <Typography variant="subtitle1" fontWeight={700} gutterBottom sx={{ mb: 2 }}>
                            {t('footer.navigation')}
                        </Typography>
                        <Stack spacing={1.5}>
                            {[t('nav.home'), t('footer.vehicles'), 'Services', t('nav.about'), t('nav.contact')].map((item) => (
                                <Link
                                    key={item}
                                    href="#"
                                    color="text.secondary"
                                    underline="hover"
                                    sx={{
                                        fontSize: '0.95rem',
                                        transition: 'color 0.2s',
                                        '&:hover': { color: 'primary.main' }
                                    }}
                                >
                                    {item}
                                </Link>
                            ))}
                        </Stack>
                    </Grid>

                    {/* Services */}
                    <Grid item xs={6} sm={4} md={2} xl={2}>
                        <Typography variant="subtitle1" fontWeight={700} gutterBottom sx={{ mb: 2 }}>
                            {t('footer.services')}
                        </Typography>
                        <Stack spacing={1.5}>
                            {[t('footer.buy'), t('footer.sell'), t('footer.tradeIn'), t('footer.financing'), t('footer.warranty')].map((item) => (
                                <Link
                                    key={item}
                                    href="#"
                                    color="text.secondary"
                                    underline="hover"
                                    sx={{
                                        fontSize: '0.95rem',
                                        transition: 'color 0.2s',
                                        '&:hover': { color: 'primary.main' }
                                    }}
                                >
                                    {item}
                                </Link>
                            ))}
                        </Stack>
                    </Grid>

                    {/* Contact Info */}
                    <Grid item xs={12} sm={4} md={4} xl={3}>
                        <Typography variant="subtitle1" fontWeight={700} gutterBottom sx={{ mb: 2 }}>
                            {t('footer.contact')}
                        </Typography>
                        <Stack spacing={2}>
                            <Box display="flex" gap={2}>
                                <LocationOnIcon color="primary" fontSize="small" sx={{ mt: 0.5 }} />
                                <Typography variant="body2" color="text.secondary">
                                    Sicap Liberté 4 Villa N°5181,
                                    Dakar Sénégal
                                </Typography>
                            </Box>
                            <Box display="flex" gap={2}>
                                <PhoneIcon color="primary" fontSize="small" sx={{ mt: 0.5 }} />
                                <Typography variant="body2" color="text.secondary">
                                    +221 77 415 65 65
                                </Typography>
                            </Box>
                            <Box display="flex" gap={2}>
                                <EmailIcon color="primary" fontSize="small" sx={{ mt: 0.5 }} />
                                <Typography variant="body2" color="text.secondary">
                                    info@saraya.tech
                                </Typography>
                            </Box>
                        </Stack>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 4, mx: { xs: 0, sm: 2, md: 3 } }} />

                <Box
                    display="flex"
                    flexDirection={{ xs: 'column', sm: 'row' }}
                    justifyContent="space-between"
                    alignItems="center"
                    gap={2}
                    sx={{ px: { xs: 0, sm: 2, md: 3 } }}
                >
                    <Typography variant="body2" color="text.secondary">
                        {t('footer.copyright', { year: new Date().getFullYear() })}
                    </Typography>
                    <Stack direction="row" spacing={3}>
                        <Link href="#" color="text.secondary" underline="hover" variant="body2">
                            {t('footer.legal')}
                        </Link>
                        <Link href="#" color="text.secondary" underline="hover" variant="body2">
                            {t('footer.privacy')}
                        </Link>
                        <Link href="#" color="text.secondary" underline="hover" variant="body2">
                            {t('footer.terms')}
                        </Link>
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
};

export default Footer;
