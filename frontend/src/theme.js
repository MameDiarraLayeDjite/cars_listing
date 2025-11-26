// Saraya Design System Theme Configuration
// Ultra-modern, professional theme with Saraya brand colors (Orange & Dark Blue)

const getThemeConfig = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
        // Light Mode - Saraya Premium Palette
        primary: {
          main: '#FF6B35',      // Saraya Orange
          light: '#FF8C61',     // Light Orange
          dark: '#E85A2A',      // Dark Orange
          contrastText: '#FFFFFF',
        },
        secondary: {
          main: '#1A2332',      // Saraya Dark Blue
          light: '#2C3E50',     // Medium Blue
          dark: '#0F1419',      // Very Dark Blue
          contrastText: '#FFFFFF',
        },
        background: {
          default: '#F8FAFC',
          paper: '#FFFFFF',
          gradient: 'linear-gradient(135deg, #FFF5F2 0%, #F8FAFC 100%)',
        },
        text: {
          primary: '#1A2332',   // Dark Blue for text
          secondary: '#64748B',
          disabled: '#94A3B8',
        },
        divider: 'rgba(255, 107, 53, 0.12)',
        common: {
          black: '#000000',
          white: '#FFFFFF',
        },
        success: {
          main: '#10B981',
          light: '#34D399',
          dark: '#059669',
        },
        error: {
          main: '#EF4444',
          light: '#F87171',
          dark: '#DC2626',
        },
        warning: {
          main: '#FF9F1C',      // Orange-aligned warning
          light: '#FFB84D',
          dark: '#E88A00',
        },
        info: {
          main: '#3B82F6',
          light: '#60A5FA',
          dark: '#2563EB',
        },
      }
      : {
        // Dark Mode - Saraya Luminous Palette
        primary: {
          main: '#FF8C61',      // Lighter Orange for dark mode
          light: '#FFB08A',     // Very Light Orange
          dark: '#FF6B35',      // Standard Orange
          contrastText: '#FFFFFF',
        },
        secondary: {
          main: '#2C3E50',      // Medium Blue
          light: '#3D5266',     // Light Blue
          dark: '#1A2332',      // Dark Blue
          contrastText: '#FFFFFF',
        },
        background: {
          default: '#0D1B2A',   // Saraya Dark Background
          paper: '#1A2332',     // Saraya Dark Blue
          gradient: 'linear-gradient(135deg, #0D1B2A 0%, #1A2332 100%)',
        },
        text: {
          primary: '#F1F5F9',
          secondary: '#94A3B8',
          disabled: '#64748B',
        },
        divider: 'rgba(255, 140, 97, 0.12)',
        common: {
          black: '#000000',
          white: '#FFFFFF',
        },
        success: {
          main: '#10B981',
          light: '#34D399',
          dark: '#059669',
        },
        error: {
          main: '#F87171',
          light: '#FCA5A5',
          dark: '#EF4444',
        },
        warning: {
          main: '#FFB84D',      // Light Orange warning
          light: '#FFD699',
          dark: '#FF9F1C',
        },
        info: {
          main: '#60A5FA',
          light: '#93C5FD',
          dark: '#3B82F6',
        },
      }),
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontFamily: 'Outfit, Inter, sans-serif',
      fontSize: '3rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: 'Outfit, Inter, sans-serif',
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontFamily: 'Outfit, Inter, sans-serif',
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontFamily: 'Outfit, Inter, sans-serif',
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h5: {
      fontFamily: 'Outfit, Inter, sans-serif',
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontFamily: 'Outfit, Inter, sans-serif',
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    subtitle1: {
      fontSize: '1.125rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    subtitle2: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.01em',
    },
  },
  shape: {
    borderRadius: 16,
  },
  shadows:
    mode === 'light'
      ? [
        'none',
        '0px 2px 4px rgba(15, 23, 42, 0.04), 0px 1px 2px rgba(15, 23, 42, 0.06)',
        '0px 4px 8px rgba(15, 23, 42, 0.04), 0px 2px 4px rgba(15, 23, 42, 0.06)',
        '0px 8px 16px rgba(15, 23, 42, 0.06), 0px 4px 8px rgba(15, 23, 42, 0.08)',
        '0px 12px 24px rgba(15, 23, 42, 0.08), 0px 6px 12px rgba(15, 23, 42, 0.10)',
        '0px 16px 32px rgba(15, 23, 42, 0.10), 0px 8px 16px rgba(15, 23, 42, 0.12)',
        '0px 20px 40px rgba(15, 23, 42, 0.12), 0px 10px 20px rgba(15, 23, 42, 0.14)',
        '0px 24px 48px rgba(15, 23, 42, 0.14), 0px 12px 24px rgba(15, 23, 42, 0.16)',
        '0px 28px 56px rgba(15, 23, 42, 0.16), 0px 14px 28px rgba(15, 23, 42, 0.18)',
        '0px 32px 64px rgba(15, 23, 42, 0.18), 0px 16px 32px rgba(15, 23, 42, 0.20)',
        '0px 36px 72px rgba(15, 23, 42, 0.20), 0px 18px 36px rgba(15, 23, 42, 0.22)',
        '0px 40px 80px rgba(15, 23, 42, 0.22), 0px 20px 40px rgba(15, 23, 42, 0.24)',
        '0px 44px 88px rgba(15, 23, 42, 0.24), 0px 22px 44px rgba(15, 23, 42, 0.26)',
        '0px 48px 96px rgba(15, 23, 42, 0.26), 0px 24px 48px rgba(15, 23, 42, 0.28)',
        '0px 52px 104px rgba(15, 23, 42, 0.28), 0px 26px 52px rgba(15, 23, 42, 0.30)',
        '0px 56px 112px rgba(15, 23, 42, 0.30), 0px 28px 56px rgba(15, 23, 42, 0.32)',
        '0px 60px 120px rgba(15, 23, 42, 0.32), 0px 30px 60px rgba(15, 23, 42, 0.34)',
        '0px 64px 128px rgba(15, 23, 42, 0.34), 0px 32px 64px rgba(15, 23, 42, 0.36)',
        '0px 68px 136px rgba(15, 23, 42, 0.36), 0px 34px 68px rgba(15, 23, 42, 0.38)',
        '0px 72px 144px rgba(15, 23, 42, 0.38), 0px 36px 72px rgba(15, 23, 42, 0.40)',
        '0px 76px 152px rgba(15, 23, 42, 0.40), 0px 38px 76px rgba(15, 23, 42, 0.42)',
        '0px 80px 160px rgba(15, 23, 42, 0.42), 0px 40px 80px rgba(15, 23, 42, 0.44)',
        '0px 84px 168px rgba(15, 23, 42, 0.44), 0px 42px 84px rgba(15, 23, 42, 0.46)',
        '0px 88px 176px rgba(15, 23, 42, 0.46), 0px 44px 88px rgba(15, 23, 42, 0.48)',
        '0px 92px 184px rgba(15, 23, 42, 0.48), 0px 46px 92px rgba(15, 23, 42, 0.50)',
      ]
      : [
        'none',
        '0px 2px 4px rgba(0, 0, 0, 0.2), 0px 1px 2px rgba(0, 0, 0, 0.3)',
        '0px 4px 8px rgba(0, 0, 0, 0.2), 0px 2px 4px rgba(0, 0, 0, 0.3)',
        '0px 8px 16px rgba(0, 0, 0, 0.25), 0px 4px 8px rgba(0, 0, 0, 0.35)',
        '0px 12px 24px rgba(0, 0, 0, 0.3), 0px 6px 12px rgba(0, 0, 0, 0.4)',
        '0px 16px 32px rgba(0, 0, 0, 0.35), 0px 8px 16px rgba(0, 0, 0, 0.45)',
        '0px 20px 40px rgba(0, 0, 0, 0.4), 0px 10px 20px rgba(0, 0, 0, 0.5)',
        '0px 24px 48px rgba(0, 0, 0, 0.45), 0px 12px 24px rgba(0, 0, 0, 0.55)',
        '0px 28px 56px rgba(0, 0, 0, 0.5), 0px 14px 28px rgba(0, 0, 0, 0.6)',
        '0px 32px 64px rgba(0, 0, 0, 0.55), 0px 16px 32px rgba(0, 0, 0, 0.65)',
        '0px 36px 72px rgba(0, 0, 0, 0.6), 0px 18px 36px rgba(0, 0, 0, 0.7)',
        '0px 40px 80px rgba(0, 0, 0, 0.65), 0px 20px 40px rgba(0, 0, 0, 0.75)',
        '0px 44px 88px rgba(0, 0, 0, 0.7), 0px 22px 44px rgba(0, 0, 0, 0.8)',
        '0px 48px 96px rgba(0, 0, 0, 0.75), 0px 24px 48px rgba(0, 0, 0, 0.85)',
        '0px 52px 104px rgba(0, 0, 0, 0.8), 0px 26px 52px rgba(0, 0, 0, 0.9)',
        '0px 56px 112px rgba(0, 0, 0, 0.85), 0px 28px 56px rgba(0, 0, 0, 0.95)',
        '0px 60px 120px rgba(0, 0, 0, 0.9), 0px 30px 60px rgba(0, 0, 0, 1)',
        '0px 64px 128px rgba(0, 0, 0, 0.95), 0px 32px 64px rgba(0, 0, 0, 1)',
        '0px 68px 136px rgba(0, 0, 0, 1), 0px 34px 68px rgba(0, 0, 0, 1)',
        '0px 72px 144px rgba(0, 0, 0, 1), 0px 36px 72px rgba(0, 0, 0, 1)',
        '0px 76px 152px rgba(0, 0, 0, 1), 0px 38px 76px rgba(0, 0, 0, 1)',
        '0px 80px 160px rgba(0, 0, 0, 1), 0px 40px 80px rgba(0, 0, 0, 1)',
        '0px 84px 168px rgba(0, 0, 0, 1), 0px 42px 84px rgba(0, 0, 0, 1)',
        '0px 88px 176px rgba(0, 0, 0, 1), 0px 44px 88px rgba(0, 0, 0, 1)',
        '0px 92px 184px rgba(0, 0, 0, 1), 0px 46px 92px rgba(0, 0, 0, 1)',
      ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollBehavior: 'smooth',
          '&::-webkit-scrollbar': {
            width: '12px',
          },
          '&::-webkit-scrollbar-track': {
            background: mode === 'light' ? '#F1F5F9' : '#1E293B',
          },
          '&::-webkit-scrollbar-thumb': {
            background: mode === 'light' ? '#CBD5E1' : '#475569',
            borderRadius: '6px',
            '&:hover': {
              background: mode === 'light' ? '#94A3B8' : '#64748B',
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 24px',
          fontSize: '0.9375rem',
          fontWeight: 600,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },
        contained: {
          boxShadow:
            mode === 'light'
              ? '0px 4px 12px rgba(255, 107, 53, 0.25)'
              : '0px 4px 12px rgba(255, 140, 97, 0.35)',
          '&:hover': {
            boxShadow:
              mode === 'light'
                ? '0px 8px 20px rgba(255, 107, 53, 0.35)'
                : '0px 8px 20px rgba(255, 140, 97, 0.45)',
          },
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          backdropFilter: 'blur(20px)',
          backgroundColor:
            mode === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(30, 41, 59, 0.8)',
          border: `1px solid ${mode === 'light' ? 'rgba(148, 163, 184, 0.1)' : 'rgba(148, 163, 184, 0.05)'}`,
          boxShadow:
            mode === 'light'
              ? '0px 8px 24px rgba(15, 23, 42, 0.08), 0px 4px 12px rgba(15, 23, 42, 0.10)'
              : '0px 8px 24px rgba(0, 0, 0, 0.3), 0px 4px 12px rgba(0, 0, 0, 0.4)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow:
              mode === 'light'
                ? '0px 16px 40px rgba(15, 23, 42, 0.12), 0px 8px 20px rgba(15, 23, 42, 0.14)'
                : '0px 16px 40px rgba(0, 0, 0, 0.4), 0px 8px 20px rgba(0, 0, 0, 0.5)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backdropFilter: 'blur(20px)',
          backgroundColor:
            mode === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(30, 41, 59, 0.8)',
          border: `1px solid ${mode === 'light' ? 'rgba(148, 163, 184, 0.1)' : 'rgba(148, 163, 184, 0.05)'}`,
        },
        elevation0: {
          backgroundColor:
            mode === 'light' ? 'rgba(248, 250, 252, 0.6)' : 'rgba(15, 23, 42, 0.6)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor:
              mode === 'light' ? 'rgba(248, 250, 252, 0.8)' : 'rgba(15, 23, 42, 0.8)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              backgroundColor:
                mode === 'light' ? 'rgba(241, 245, 249, 1)' : 'rgba(30, 41, 59, 1)',
            },
            '&.Mui-focused': {
              backgroundColor:
                mode === 'light' ? 'rgba(255, 255, 255, 1)' : 'rgba(26, 35, 50, 1)',
              boxShadow:
                mode === 'light'
                  ? '0px 4px 12px rgba(255, 107, 53, 0.15)'
                  : '0px 4px 12px rgba(255, 140, 97, 0.25)',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
          backdropFilter: 'blur(10px)',
        },
        filled: {
          backgroundColor:
            mode === 'light' ? 'rgba(255, 107, 53, 0.1)' : 'rgba(255, 140, 97, 0.2)',
        },
        outlined: {
          borderWidth: '1.5px',
          backgroundColor:
            mode === 'light' ? 'rgba(248, 250, 252, 0.8)' : 'rgba(30, 41, 59, 0.8)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(20px)',
          backgroundColor:
            mode === 'light' ? 'rgba(26, 35, 50, 0.95)' : 'rgba(26, 35, 50, 0.95)',
          boxShadow:
            mode === 'light'
              ? '0px 4px 20px rgba(26, 35, 50, 0.3)'
              : '0px 4px 20px rgba(0, 0, 0, 0.5)',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'scale(1.1)',
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backdropFilter: 'blur(10px)',
        },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor:
            mode === 'light' ? 'rgba(148, 163, 184, 0.1)' : 'rgba(71, 85, 105, 0.2)',
        },
      },
    },
  },
});

export default getThemeConfig;
