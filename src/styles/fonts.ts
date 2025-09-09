import localFont from 'next/font/local';

// Degular font for headings
export const degular = localFont({
  src: [
    {
      path: '../assets/fonts/degular/DegularText-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/degular/DegularText-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/degular/DegularText-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-degular',
  display: 'swap',
});

// Poppins font for body text
export const poppins = localFont({
  src: [
    {
      path: '../assets/fonts/poppins/Poppins-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/poppins/Poppins-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/poppins/Poppins-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-poppins',
  display: 'swap',
});
