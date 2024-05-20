'use client';
import { Lato } from 'next/font/google';

const lato = Lato({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'],
});

import { createTheme } from '@mui/material';
const theme = createTheme({
  typography: {
    fontFamily: lato.style.fontFamily,
  },
});

export default theme;
