import type { Metadata, Viewport } from 'next';
import { Antonio, Bebas_Neue, Playfair_Display, Cormorant_Garamond, Inter, Bodoni_Moda } from 'next/font/google';
import './globals.css';

const posterFont = Antonio({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-poster',
  display: 'swap',
});

const displayFont = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
});

// Montega Editorial Serif for Main Name & Headings
const serifFont = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '700', '800', '900'],
  variable: '--font-serif',
  display: 'swap',
});

// Savage Roses Luxury Didone Editorial Serif
const editorialFont = Bodoni_Moda({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-editorial',
  display: 'swap',
});

// Thingós Elegant Fashion-Magazine Italic Serif for "Hello, I'm"
const thingosFont = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  style: ['italic'],
  variable: '--font-thingos',
  display: 'swap',
});

const sansFont = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MD. DANISH RAZA — Full-Stack Developer',
  description:
    'Full-Stack Developer specializing in high-performance web applications, responsive user interfaces, and robust digital products.',
  keywords: [
    'Md Danish Raza',
    'Full-Stack Developer',
    'Frontend Developer',
    'Next.js',
    'React',
    'TypeScript',
    'UI/UX Designer',
    'Portfolio',
  ],
  authors: [{ name: 'Md. Danish Raza' }],
  creator: 'Md. Danish Raza',
  openGraph: {
    title: 'MD. DANISH RAZA — Full-Stack Developer',
    description: 'Building digital experiences that look sharp and work beautifully.',
    url: 'https://mddanish.dev',
    siteName: 'MD. DANISH RAZA Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MD. DANISH RAZA — Full-Stack Developer',
    description: 'Building digital experiences that look sharp and work beautifully.',
    creator: '@mddanish_dev',
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#050505',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${posterFont.variable} ${displayFont.variable} ${serifFont.variable} ${editorialFont.variable} ${thingosFont.variable} ${sansFont.variable}`}
    >
      <body className="min-h-screen bg-background text-[#f5f5f5] antialiased selection:bg-[#d7192f] selection:text-white">
        {children}
      </body>
    </html>
  );
}
