export const dynamic = 'force-dynamic'
export const revalidate = 0

import './globals.css'
import { Manrope } from 'next/font/google'
import Provider from './components/Provider'

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['200', '400', '700'],
})

export const metadata = {
  title: 'The Fusion Club',
  description: 'The Fusion Club, VIT Bhopal',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Provider>
        <body className={`w-screen no-scrollbar ${manrope.className}`}>
          {children}
        </body>
      </Provider>
    </html>
  )
}
