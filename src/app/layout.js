import { Poppins } from 'next/font/google'
import './globals.css'
import ConditionalNavigation from '../components/ConditionalNavigation'
import Footer from '../components/Footer'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
})

export const metadata = {
  metadataBase: new URL('https://sanwalbajwa.com/'), // Replace with your actual domain
  
  title: {
    default: 'Sanwal Bajwa | Full Stack Developer',
    template: '%s | Sanwal Bajwa'
  },
  
  description: 'Muhammad Yar Sanwal, professionally known as Sanwal Bajwa. Full Stack Developer with 2+ years of experience in WordPress, Next.js, React, and modern web technologies. Building scalable, user-friendly applications.',
  
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
  
  authors: [{ name: 'Sanwal Bajwa', url: 'https://sanwalbajwa.com/' }],
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
    url: 'https://sanwalbajwa.com/',
    siteName: 'Sanwal Bajwa',
    title: 'Sanwal Bajwa | Full Stack Developer & WordPress Expert',
    description: 'Full Stack Developer with 2+ years of experience in WordPress, Next.js, React, and modern web technologies.',
    images: [
      {
        url: 'https://sanwalbajwa.com/og-image.jpg', // Add your OG image to public folder
        width: 1200,
        height: 630,
        alt: 'Sanwal Bajwa - Full Stack Developer',
      }
    ],
  },

  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'Sanwal Bajwa | Full Stack Developer',
    description: 'Full Stack Developer specializing in WordPress, Next.js, and modern web technologies.',
    creator: '@yourtwitterhandle', // Replace with your Twitter handle
    images: ['https://sanwalbajwa.com/og-image.jpg'],
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
  // alternates: {
  //   canonical: 'https://yourdomain.com',
  //   languages: {
  //     'en-US': 'https://yourdomain.com',
  //   },
  // },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
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
      <body className={poppins.className}>
        <ConditionalNavigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}