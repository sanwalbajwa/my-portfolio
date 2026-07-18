import { Inter, Manrope, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import ConditionalNavigation from '../components/ConditionalNavigation'
import Footer from '../components/Footer'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
})

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['600', '700'],
  display: 'swap',
  variable: '--font-display',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
})

export const metadata = {
  metadataBase: new URL('https://sanwalbajwa.com'),
  
  title: {
    default: 'Muhammad Yar Sanwal | Software Engineer & Full Stack Developer',
    template: '%s | Sanwal Bajwa'
  },
  
  description: 'Muhammad Yar Sanwal, professionally known as Sanwal Bajwa. Software Engineer with 2+ years of experience in Fuull Stack Development & CMS.',
  
  keywords: [
    'Muhammad Yar Sanwal',
    'Sanwal Bajwa',
    'Full Stack Developer',
    'WordPress Developer',
    'Next.js Developer',
    'React Developer',
    'Web Development',
    'JavaScript',
    'PHP',
    'Sanwal Bajwa',
    'Portfolio',
    'Blog',
    'Tech Blog'
  ],
  
  authors: [{ name: 'Sanwal Bajwa', url: 'https://sanwalbajwa.com' }],
  creator: 'Sanwal Bajwa',
  publisher: 'Sanwal Bajwa',
  
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sanwalbajwa.com',
    siteName: 'Sanwal Bajwa',
    title: 'Sanwal Bajwa | Full Stack Developer & WordPress Expert',
    description: 'Full Stack Developer with 2+ years of experience in WordPress, Next.js, React, and modern web technologies.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Sanwal Bajwa - Full Stack Developer',
        type: 'image/jpeg',
      }
    ],
  },

  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'Sanwal Bajwa | Full Stack Developer',
    description: 'Full Stack Developer specializing in WordPress, Next.js, and modern web technologies.',
    creator: '@sanwalbajwa',
    images: ['/og-image.jpg'],
  }, 

  // Verification (Add these from Google Search Console, Bing, etc.)
  verification: {
    google: 'WJ_S1a6lVlvcr2LVwveCUgnhsr5RhnQlQ7mSeVQUcUY',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },

  // Icons
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Alternate languages (if you have multi-language support)
  // Note: Individual pages should set their own canonical URLs
  // alternates: {
  //   canonical: 'https://sanwalbajwa.com',
  // },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* Google Analytics - Replace with your GA4 ID */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ConditionalNavigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
