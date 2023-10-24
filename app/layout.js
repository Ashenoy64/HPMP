"use client"

import './globals.css'
import { Inter } from 'next/font/google'
import { AuthContextProvider } from '../lib/AuthContext'

const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'Music Player',
//   description: 'DBMS Project',
// }

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-text-primary font-inter no-scrollbar `}>

        <AuthContextProvider>
          {children}
        </AuthContextProvider>

      </body>
    </html>
  )
}
