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
  animation: 'fadeInUp 0.8s ease-out',
  '@keyframes fadeInUp': {
    from: {
      opacity: 0,
      transform: 'translateY(30px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
}));

const SoftText = styled(Typography)(({ theme }) => ({
  fontSize: { xs: '1.15rem', md: '1.3rem' },
  lineHeight: 1.8,
  color: theme.palette.text.secondary,
  maxWidth: 720,
  margin: '0 auto',
  animation: 'fadeIn 1s ease-out 0.3s both',
  '@keyframes fadeIn': {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
}));

const ValueCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4, 3),
  borderRadius: 24,
  background: theme.palette.mode === 'light'
    ? 'linear-gradient(145deg, #ffffff 0%, #fff5f0 100%)'
    : alpha(theme.palette.background.paper, 0.4),
  backdropFilter: 'blur(10px)',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #FF6B35 0%, #FF9F1C 100%)',
    transform: 'translateX(-100%)',
    transition: 'transform 0.4s ease',
  },
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: `0 20px 40px ${alpha('#FF6B35', 0.15)}`,
    '&::before': {
      transform: 'translateX(0)',
    },
  },
}));

const QuoteBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(6, 4),
  borderRadius: 32,
  background: theme.palette.mode === 'light'
    ? `linear-gradient(135deg, ${alpha('#FF6B35', 0.03)} 0%, ${alpha('#FF9F1C', 0.05)} 100%)`
    : alpha(theme.palette.background.paper, 0.2),
  backdropFilter: 'blur(20px)',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
  '&::before': {
    content: '"❝"',
    position: 'absolute',
    top: 20,
    left: 30,
    fontSize: '4rem',
    color: alpha('#FF6B35', 0.2),
    fontFamily: 'Georgia, serif',
  },
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
            ? 'linear-gradient(to bottom, #fff 0%, #fff9f5 50%, #fff5f0 100%)'
            : 'background.default',
          py: { xs: 10, md: 16 },
          px: 3,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '20%',
            right: '-10%',
            width: '40%',
            height: '40%',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${alpha('#FF9F1C', 0.08)} 0%, transparent 70%)`,
            filter: 'blur(80px)',
            pointerEvents: 'none',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '10%',
            left: '-5%',
            width: '35%',
            height: '35%',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${alpha('#FF6B35', 0.06)} 0%, transparent 70%)`,
            filter: 'blur(80px)',
            pointerEvents: 'none',
          },
        }}
      >
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Stack spacing={{ xs: 8, md: 12 }} alignItems="center" textAlign="center">

            {/* Titre ultra doux */}
            <Box>
              <Typography
                variant="subtitle1"
                color="primary"
                fontWeight={600}
                letterSpacing={2}
                sx={{
                  opacity: 0.8,
                  mb: 2,
                  animation: 'fadeIn 0.6s ease-out',
                }}
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

            {/* Valeurs en 3 cartes – design moderne */}
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={3}
              sx={{
                mt: 6,
                width: '100%',
                animation: 'fadeInUp 1s ease-out 0.5s both',
              }}
            >
              {['quality', 'transparency', 'service'].map((value, index) => (
                <ValueCard
                  key={value}
                  sx={{
                    flex: 1,
                    animationDelay: `${0.6 + index * 0.1}s`,
                  }}
                >
                  <Typography
                    variant="h5"
                    fontWeight={700}
                    sx={{
                      background: 'linear-gradient(135deg, #FF6B35 0%, #FF9F1C 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      mb: 1.5,
                    }}
                  >
                    {t(`about.values.${value}.title`)}
                  </Typography>
                  <Box
                    sx={{
                      width: 60,
                      height: 4,
                      background: 'linear-gradient(90deg, #FF6B35 0%, #FF9F1C 100%)',
                      borderRadius: 2,
                      mx: 'auto',
                      boxShadow: `0 4px 12px ${alpha('#FF6B35', 0.3)}`,
                    }}
                  />
                </ValueCard>
              ))}
            </Stack>

            {/* Citation finale élégante */}
            <Box
              sx={{
                mt: 10,
                pt: 8,
                width: '100%',
                animation: 'fadeIn 1.2s ease-out 0.8s both',
              }}
            >
              <QuoteBox>
                <Typography
                  variant="h5"
                  fontStyle="italic"
                  sx={{
                    background: `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${theme.palette.text.secondary} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    maxWidth: 680,
                    mx: 'auto',
                    lineHeight: 1.7,
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  « On ne vend pas des voitures.<br />
                  On réalise des rêves sur quatre roues. »
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  sx={{
                    mt: 4,
                    background: 'linear-gradient(135deg, #FF6B35 0%, #FF9F1C 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  — L'équipe {t('nav.brandName')}
                </Typography>
              </QuoteBox>
            </Box>

          </Stack>
        </Container>
      </Box>
    </>
  );
}