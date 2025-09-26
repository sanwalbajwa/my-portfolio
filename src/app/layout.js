import { Poppins } from 'next/font/google'
import './globals.css'
import Navigation from '../components/Navigation'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700']
})

export const metadata = {
  title: 'Your Name - Portfolio',
  description: 'Personal portfolio and blog',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  )
}