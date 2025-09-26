import { Poppins } from 'next/font/google'
import './globals.css'
import ConditionalNavigation from '../components/ConditionalNavigation'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700']
})

export const metadata = {
  title: 'Sanwal Bajwa | Full Stack Developer',
  description: 'Personal portfolio and blog',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ConditionalNavigation />
        <main>{children}</main>
      </body>
    </html>
  )
}