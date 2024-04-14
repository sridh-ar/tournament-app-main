import './globals.css'
import {Hedvig_Letters_Sans} from 'next/font/google'

export const metadata = {
  title: 'Tournament',
  description: 'Register to Play games',
}
const lato = Hedvig_Letters_Sans({ subsets: ["latin"],weight:"400" ,display: 'swap', adjustFontFallback: false})
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={lato.className} >
      <body>{children}</body>
    </html>
  )
}
