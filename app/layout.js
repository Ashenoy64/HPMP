"use client"

import './globals.css'
import { Inter } from 'next/font/google'
import { AuthContextProvider } from './context/AuthContext'

const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'Music Player',
//   description: 'DBMS Project',
// }

export default  function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-text-primary mx-2 sm:mx-4 md:mx-10 font-inter no-scrollbar `}>
        
         <AuthContextProvider>
            {children}
          </AuthContextProvider> 
        
      </body>
    </html>
  )
}
