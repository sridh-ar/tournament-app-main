import './globals.css'

export const metadata = {
  title: 'Tournament',
  description: 'Register to Play games',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
