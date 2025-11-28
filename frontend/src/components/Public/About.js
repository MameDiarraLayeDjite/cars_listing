// src/pages/About.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Box,
  Typography,
  Stack,
  alpha,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Helmet } from 'react-helmet';

const SoftTitle = styled(Typography)(({ theme }) => ({
  fontSize: { xs: '2.8rem', md: '4rem' },
  fontWeight: 800,
  lineHeight: 1.1,
  background: 'linear-gradient(135deg, #FF6B35 0%, #FF9F1C 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textAlign: 'center',
}));

const SoftText = styled(Typography)(({ theme }) => ({
  fontSize: { xs: '1.15rem', md: '1.3rem' },
  lineHeight: 1.8,
  color: theme.palette.text.secondary,
  maxWidth: 720,
  margin: '0 auto',
}));

export default function About() {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title>{t('about.hero.title')} – {t('nav.brandName')}</title>
      </Helmet>

      <Box
        sx={{
          minHeight: '100vh',
          background: theme.palette.mode === 'light'
            ? 'linear-gradient(to bottom, #fff 0%, #fff9f5 100%)'
            : 'background.default',
          py: { xs: 10, md: 16 },
          px: 3,
        }}
      >

        <Container maxWidth="md">
          <Stack spacing={{ xs: 8, md: 12 }} alignItems="center" textAlign="center">

            {/* Titre ultra doux */}
            <Box>
              <Typography
                variant="subtitle1"
                color="primary"
                fontWeight={600}
                letterSpacing={2}
                sx={{ opacity: 0.8, mb: 2 }}
              >
                {t('about.hero.subtitle').toUpperCase()}
              </Typography>
              <SoftTitle>
                {t('about.story.title')}
              </SoftTitle>
            </Box>

            {/* Texte principal – simple et humain */}
            <SoftText>
              {t('about.story.content')}
            </SoftText>

            {/* Valeurs en 3 mots – très aéré */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={6} mt={6}>
              {['quality', 'transparency', 'service'].map((value) => (
                <Box key={value}>
                  <Typography
                    variant="h5"
                    fontWeight={700}
                    sx={{
                      color: '#FF6B35',
                      mb: 1,
                    }}
                  >
                    {t(`about.values.${value}.title`)}
                  </Typography>
                  <Box
                    sx={{
                      width: 60,
                      height: 4,
                      bgcolor: alpha('#FF6B35', 0.3),
                      borderRadius: 2,
                      mx: 'auto',
                    }}
                  />
                </Box>
              ))}
            </Stack>

            {/* Citation finale toute douce */}
            <Box sx={{ mt: 10, pt: 8, borderTop: `1px solid ${alpha(theme.palette.divider, 0.2)}` }}>
              <Typography
                variant="h5"
                fontStyle="italic"
                color="text.secondary"
                sx={{ maxWidth: 680, mx: 'auto', lineHeight: 1.7 }}
              >
                « On ne vend pas des voitures.<br />
                On réalise des rêves sur quatre roues. »
              </Typography>
              <Typography
                variant="body2"
                color="primary"
                fontWeight={600}
                sx={{ mt: 4, opacity: 0.9 }}
              >
                — L'équipe {t('nav.brandName')}
              </Typography>
            </Box>

          </Stack>
        </Container>
      </Box>
    </>
  );
}