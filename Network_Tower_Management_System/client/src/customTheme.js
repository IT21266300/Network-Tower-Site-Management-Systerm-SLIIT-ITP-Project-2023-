export const colorPalette = {
  primary: {
    100: '#d2ecfc',
    200: '#a5d9fa',
    300: '#77c7f7',
    400: '#4ab4f5',
    500: '#1da1f2',
    600: '#1781c2',
    700: '#116191',
    800: '#0c4061',
    900: '#062030',
  },
  secondary: {
    100: '#f9fafb',
    200: '#f3f6f8',
    300: '#edf1f4',
    400: '#e7edf1',
    500: '#e1e8ed',
    600: '#b4babe',
    700: '#878b8e',
    800: '#5a5d5f',
    900: '#2d2e2f',
  },
  black: {
    100: '#d0d1d1',
    200: '#a1a2a3',
    300: '#727476',
    400: '#434548',
    500: '#14171a',
    600: '#101215',
    700: '#0c0e10',
    800: '#08090a',
    900: '#040505',
  },
  indigo: {
    100: '#e0e4e7',
    200: '#c1c9cf',
    300: '#a3adb6',
    400: '#84929e',
    500: '#657786',
    600: '#515f6b',
    700: '#3d4750',
    800: '#283036',
    900: '#14181b',
  },
  red: {
    100: '#fccdcd',
    200: '#fa9c9c',
    300: '#f76a6a',
    400: '#f53939',
    500: '#f20707',
    600: '#c20606',
    700: '#910404',
    800: '#610303',
    900: '#300101',
  },


};

const { createTheme } = require('@mui/material');

const customTheme = createTheme({
  palette: {
    primary: {
      main: colorPalette.primary[500],
    },
  },
  typography: {
    fontFamily: 'Poppins',
  },
});

export default customTheme;
