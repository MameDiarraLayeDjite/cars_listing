// src/pages/Contact.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Grid,
  Paper,
  alpha,
  useTheme,
  Chip,
  InputAdornment,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Helmet } from 'react-helmet';

const GradientTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  fontSize: '3rem',
  background: 'linear-gradient(135deg, #FF6B35 0%, #FF9F1C 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  [theme.breakpoints.down('sm')]: { fontSize: '2.5rem' },
}));

const GlassPaper = styled(Paper)(({ theme }) => ({
  background: alpha(theme.palette.background.paper, 0.8),
  backdropFilter: 'blur(24px)',
  borderRadius: 28,
  padding: theme.spacing(6),
  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
}));

const ContactBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 20,
  padding: theme.spacing(3),
  borderRadius: 20,
  background: alpha('#FF6B35', 0.06),
  border: `1px dashed ${alpha('#FF6B35', 0.3)}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    background: alpha('#FF6B35', 0.1),
    borderColor: '#FF6B35',
  },
}));

export default function Contact() {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title>{t('contact.hero.title')} - {t('nav.brandName')}</title>
      </Helmet>

      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Stack spacing={3} textAlign="center" mb={8}>
            <Chip label="On vous écoute" color="primary" sx={{ alignSelf: 'center' }} />
            <GradientTitle variant="h1">
              {t('contact.hero.title')}
            </GradientTitle>
            <Typography variant="h6" color="text.secondary" maxWidth={700} mx="auto">
              {t('contact.hero.subtitle')}
            </Typography>
          </Stack>

          <Grid container spacing={6}>
            {/* Formulaire */}
            <Grid item xs={12} lg={7}>
              <GlassPaper elevation={0}>
                <Typography variant="h4" fontWeight={700} mb={4}>
                  {t('contact.form.title')}
                </Typography>

                <Stack spacing={4}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label={t('contact.form.name')} variant="outlined" required />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label={t('contact.form.name')} variant="outlined" required />
                    </Grid>
                  </Grid>

                  <TextField fullWidth label={t('contact.form.email')} type="email" required />
                  <TextField fullWidth label={t('contact.form.phone')} />

                  <TextField
                    fullWidth
                    label={t('contact.form.message')}
                    multiline
                    rows={5}
                    placeholder="Je recherche une Porsche 911 GT3, budget autour de 180 000 €..."
                  />

                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      py: 2,
                      borderRadius: 4,
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      background: 'linear-gradient(135deg, #FF6B35, #FF9F1C)',
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        boxShadow: '0 15px 35px rgba(255, 107, 53, 0.4)',
                      },
                    }}
                  >
                    {t('contact.form.send')}
                  </Button>
                </Stack>
              </GlassPaper>
            </Grid>

            {/* Coordonnées */}
            <Grid item xs={12} lg={5}>
              <Stack spacing={4}>
                <GlassPaper elevation={0}>
                  <Typography variant="h5" fontWeight={700} mb={4}>
                    {t('contact.info.title')}
                  </Typography>

                  <Stack spacing={4}>
                    <ContactBox>
                      <PhoneIcon color="primary" sx={{ fontSize: 32 }} />
                      <Box>
                        <Typography fontWeight={600}>{t('contact.form.phone')}</Typography>
                        <Typography color="text.secondary">{t('footer.phone')}</Typography>
                      </Box>
                    </ContactBox>

                    <ContactBox>
                      <EmailIcon color="primary" sx={{ fontSize: 32 }} />
                      <Box>
                        <Typography fontWeight={600}>{t('contact.form.email')}</Typography>
                        <Typography color="text.secondary">{t('footer.email')}</Typography>
                      </Box>
                    </ContactBox>

                    <ContactBox>
                      <LocationOnIcon color="primary" sx={{ fontSize: 32 }} />
                      <Box>
                        <Typography fontWeight={600}>{t('contact.hero.address')}</Typography>
                        <Typography color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
                          {t('footer.address')}
                        </Typography>
                      </Box>
                    </ContactBox>

                    <ContactBox>
                      <AccessTimeIcon color="primary" sx={{ fontSize: 32 }} />
                      <Box>
                        <Typography fontWeight={600}>{t('contact.info.hours')}</Typography>
                        <Typography color="text.secondary">
                          {t('contact.info.weekdays')}<br />
                          {t('contact.info.saturday')}<br />
                          {t('contact.info.sunday')}
                        </Typography>
                      </Box>
                    </ContactBox>
                  </Stack>
                </GlassPaper>

              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}