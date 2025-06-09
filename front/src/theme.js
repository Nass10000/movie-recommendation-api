import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#e50914', // Rojo Netflix
      light: '#ff5436',
      dark: '#a80000',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ffb71d', // Dorado para estrellas/ratings
      light: '#ffea4f',
      dark: '#c78700',
      contrastText: '#000000',
    },
    background: {
      default: '#141414', // Fondo oscuro tipo Netflix
      paper: '#1f1f1f',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b3b3b3',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none', // Sin mayúsculas en botones
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          padding: '8px 16px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 2px 4px rgba(0,0,0,0.2)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0px 4px 12px rgba(0,0,0,0.15)',
        },
      },
    },
  },
});

export default theme;