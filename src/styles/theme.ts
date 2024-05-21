'use client';
import { Lato } from 'next/font/google';

const lato = Lato({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'],
});

import { alpha, createTheme } from '@mui/material';

const violetBase = '#9747FF';

const theme = createTheme({
  typography: {
    fontFamily: lato.style.fontFamily,
  },

  palette: {
    secondary: {
      main: violetBase,
    },
  },
});

export default theme;
