import './globals.css'
import { Inter } from 'next/font/google'
import { CounterProvider } from './component/Cart_Context/counterContext'
import Footer from './component/Footer/page'
import Navbar from './component/Navbar/page'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Get First',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
  
    <html lang="en">
      <CounterProvider>
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
      </CounterProvider>
    </html>
   
  )
}
